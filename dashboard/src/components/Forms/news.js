"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import http from "@/utils/http";
import useFileUpload from "@/hooks/useFileUpload";
import { endpoints } from "@/utils/endpoints";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import Title from "../Title";
import { Button } from "../ui/button";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { Switch } from "../ui/switch";
import { useFetchNewsCategories } from "@/hooks/useFetchNewsCategories";

export default function NewsForm({ type, newsId, handleCreate, handleUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      image: "",
      short_description: "",
      content: "",
      is_active: false,
      poster_name: "",
      poster_url: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const editorRef = useRef(null);
  const [image, setImage, upload, deleteFile] = useFileUpload();
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isFetching,
  } = useFetchNewsCategories();

  const formattedCategories = useMemo(
    () =>
      categories?.map(({ id: value, name: label }) => ({
        value,
        label: label.toUpperCase(),
      })),
    [categories]
  );
  console.log({ formattedCategories });
  const handleFileChange = async (event) => {
    upload(event);
  };

  const onSubmit = (data) => {
    const payload = {
      image: image[0],
      category: data?.category.value,
      title: data.title,
      slug: data.slug,
      image: image[0],
      short_description: data.short_description,
      content: text,
      is_active: data.is_active,

      poster_name: data.poster_name,
      poster_url: data.poster_url,

      meta_title: data.meta_title,
      meta_description: data.meta_description,
      meta_keywords: data.meta_keywords,
    };

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    }
  };

  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await http().get(`${endpoints.news.getAll}/${newsId}`);
        console.log({ data });
        data &&
          formattedCategories?.length &&
          setValue(
            "category",
            formattedCategories.find((item) => (data.category = item.value))
          );
        data && setValue("title", data?.title);
        data && setValue("short_description", data?.short_description);
        data && setText(data?.content);
        data && setImage([data?.image]);

        data && setValue("poster_name", data.poster_name);
        data && setValue("poster_url", data.poster_url);

        data && setValue("meta_title", data.meta_title);
        data && setValue("meta_description", data.meta_description);
        data && setValue("meta_keywords", data.meta_keywords);
        data && setValue("slug", data.slug);
        data && setValue("is_active", data.is_active);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (newsId && type === "edit") {
      fetchData();
    }
  }, [
    newsId,
    type,
    formattedCategories?.length,
    formattedCategories,
    setImage,
    setValue,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const element = document.querySelector(".tox-notifications-container");
      if (element) {
        element.classList.add("tox-notifications-container-display-block");
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white">
      <Title text={type.toUpperCase()} />
      <div className="space-y-10 mt-6">
        {/* categories */}
        <div className="space-y-2">
          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              control={control}
              name="category"
              rules={{ required: "required." }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={formattedCategories}
                  placeholder={"Select categories"}
                  className="w-full h-[42px] outline-none rounded-md bg-[#F7F7FC] font-mulish text-sm"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={
                    typeof document !== "undefined" && document.body
                  }
                  menuPosition="absolute"
                />
              )}
            />
            {errors.category && (
              <span className="text-red-600">{errors.category.message}</span>
            )}
          </div>

          {/* title */}
          <div className="col-span-3">
            <Label htmlFor="title">Title</Label>
            <Input
              {...register("title", {
                required: "required",
              })}
              type="text"
              id="title"
              placeholder="Title"
            />
            {errors.title && (
              <span className="text-red-600">{errors.title.message}</span>
            )}
          </div>

          {/* short desc */}
          <div className="col-span-3">
            <Label htmlFor="short_description">Short description</Label>
            <Textarea
              {...register("short_description", {
                required: "required",
              })}
              type="text"
              id="short_description"
              placeholder="Short description"
            />
            {errors.short_description && (
              <span className="text-red-600">
                {errors.short_description.message}
              </span>
            )}
          </div>

          {/* content */}
          <div className="col-span-3">
            <Label htmlFor="content">Content</Label>
            {/* <Editor
              focus={editorRef.current}
              readOnly={type === "view"}
              name="blog"
              value={text}
              onTextChange={(e) => debouncedSetText(e.htmlValue)}
              style={{ height: "320px" }}
            /> */}
            <Editor
              apiKey="26eohrlp913qxavz9xyrl5wszw74jii703o230piigrz0ync"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
              }}
              initialValue=""
              onEditorChange={(content) => setText(content)}
              value={text}
            />
          </div>

          <div className="mt-6">
            <div>
              <Label htmlFor="picture">Picture</Label>
            </div>
            {image?.length ? (
              <div className="relative inline-block mt-3">
                {type === "create" ||
                  (type === "edit" && (
                    <Button
                      size="icon"
                      type="button"
                      className="absolute -right-2 -top-2 z-10 rounded-md bg-red-500 p-1 text-white"
                      onClick={() => deleteFile(image[0])}
                    >
                      <AiOutlineDelete size={20} />
                    </Button>
                  ))}
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image[0]}`}
                  width={300}
                  height={300}
                  className="rounded-lg"
                  alt="category image"
                />
              </div>
            ) : (
              <div>
                <Input
                  {...register("picture", {
                    required: "Please select image",
                  })}
                  type="file"
                  id="picture"
                  multiple
                  onChange={handleFileChange}
                />
                {errors.picture && (
                  <span className="text-red-600">{errors.picture.message}</span>
                )}
              </div>
            )}
          </div>

          {/* credit */}
          <div className="space-y-4 mt-6">
            <Title text={"Credits"} />
            <div className="">
              <div>
                <Label for="poster_name">Original Poster Name</Label>
                <Input
                  type="text"
                  id="poster_name"
                  {...register("poster_name", { required: "required." })}
                  placeholder="e.g. Jane Doe"
                />
                {errors.poster_name && (
                  <span className="text-red-600">
                    {errors.poster_name.message}
                  </span>
                )}
              </div>
              <div>
                <Label for="">Original Poster URL</Label>
                <Input
                  type="url"
                  id="poster_url"
                  {...register("poster_url", { required: "required." })}
                  placeholder="https://example.com"
                />
                {errors.poster_url && (
                  <span className="text-red-600">
                    {errors.poster_url.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Title text={"Seo"} />
          <div className="space-y-2">
            {/* meta title */}
            <div>
              <Label htmlFor="meta_title">Meta title</Label>
              <Input
                type="text"
                {...register("meta_title")}
                placeholder="Meta title"
              />
            </div>

            {/* meta description */}
            <div>
              <Label htmlFor="meta_description">Meta description</Label>
              <Textarea
                {...register("meta_description")}
                placeholder="Meta description"
              />
            </div>

            {/* meta keywords */}
            <div>
              <Label htmlFor="meta_keywords">Meta keywords</Label>
              <Textarea
                {...register("meta_keywords")}
                placeholder="Meta keywords"
              />
            </div>

            {/* slug */}
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input type="text" {...register("slug")} placeholder="Slug" />
            </div>
          </div>
        </div>

        {/* is featured */}
        <div className="flex justify-center gap-1 flex-col mt-4 col-span-3">
          <Label htmlFor="is_active">
            {watch("is_active") === true ? "Published" : "Unpublished"}
          </Label>
          <Controller
            control={control}
            name="is_active"
            render={({ field: { onChange, value } }) => (
              <Switch
                onCheckedChange={onChange}
                checked={value}
                disabled={type === "view" || type === "delete"}
              />
            )}
          />
        </div>

        <div>
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
}
