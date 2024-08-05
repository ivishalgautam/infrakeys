"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Title from "../Title";
import http from "@/utils/http";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { isObject } from "@/utils/object";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { Label } from "../ui/label";
import { endpoints } from "../../utils/endpoints";
import { Textarea } from "../ui/textarea";
import { H4 } from "../ui/typography";
import { Switch } from "../ui/switch";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFetchSubCatTypes } from "@/hooks/usefetchSubCatTypes";
import ReactSelect from "react-select";
import Spinner from "../Spinner";

export function SubCategoryForm({
  type,
  handleCreate,
  handleUpdate,
  handleDelete,
  subCategoryId,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const [token] = useLocalStorage("token");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchCategories();
  const { data: subCatTypes } = useFetchSubCatTypes();

  const formattedCategories = useMemo(
    () =>
      categories?.map(({ id: value, name: label }) => ({
        value,
        label,
      })),
    [isCategoryLoading, subCategoryId]
  );

  const onSubmit = (data) => {
    const payload = {
      name: data?.name,
      category_ids: data?.categories.map(({ value }) => value),
      image: image,
      is_featured: data?.is_featured,
      meta_title: data?.meta_title,
      meta_description: data?.meta_description,
      meta_keywords: data?.meta_keywords,
      type: data?.type,
    };

    console.log(payload);

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    } else if (type === "delete") {
      handleDelete(subCategoryId);
    }
  };

  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.sub_categories.getAll}/getById/${subCategoryId}`
        );

        data && setValue("name", data?.name);
        data &&
          setValue(
            "categories",
            formattedCategories.filter((so) =>
              data?.category_ids.includes(so.value)
            )
          );
        data && setImage(data.image);
        data && setValue("is_featured", data?.is_featured);
        data && setValue("meta_title", data?.meta_title);
        data && setValue("meta_description", data?.meta_description);
        data && setValue("meta_keywords", data?.meta_keywords);
        data && setValue("type", data?.type);
      } catch (error) {
        console.error(error);
        toast.error(error.message ?? "Unable to fetch details!");
      } finally {
        setIsLoading(false);
      }
    };
    if (
      formattedCategories?.length &&
      subCategoryId &&
      (type === "edit" || type === "view" || type === "delete")
    ) {
      fetchData();
    }
  }, [subCategoryId, type, formattedCategories?.length]);

  const handleFileChange = async (event) => {
    try {
      const selectedFiles = event.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFiles);
      // console.log("formData=>", formData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.files.upload}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImage(response.data.path[0]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
    }
  };

  const deleteFile = async (filePath) => {
    try {
      const resp = await http().delete(
        `${endpoints.files.getFiles}?file_path=${filePath}`
      );
      toast.success(resp?.message);

      setImage("");
    } catch (error) {
      console.log(error);
      if (isObject(error)) {
        return toast.error(error?.message);
      } else {
        toast.error("error deleting image");
      }
    }
  };

  if (isLoading) return <Spinner />;

  // console.log(watch("items"));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white">
        <div className="space-y-8 p-2">
          <Title
            text={
              type === "create"
                ? "Create sub category"
                : type === "view"
                  ? "Sub category details"
                  : type === "edit"
                    ? "Sub category update"
                    : "Are you sure you want to delete"
            }
          />

          <div className="grid grid-cols-3 gap-4">
            {/* name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", { required: "required" })}
                type="text"
                id="name"
                placeholder="Name"
                disabled={type === "view" || type === "delete"}
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>

            {/* category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                control={control}
                name="categories"
                maxMenuHeight={230}
                rules={{ required: "Please select category" }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ReactSelect
                      options={formattedCategories}
                      defaultValue={value}
                      onChange={onChange}
                      isMulti
                    />
                  );
                }}
              />
              {errors.categories && (
                <span className="text-red-600">
                  {errors.categories.message}
                </span>
              )}
            </div>

            {/* type */}
            <div>
              <Label htmlFor="type">Type</Label>
              <Controller
                control={control}
                name="type"
                maxMenuHeight={230}
                rules={{ required: "Please select type" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onValueChange={onChange}
                    className="w-full"
                    disabled={type === "view" || type === "delete"}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        {subCatTypes?.map(({ id: value, name: label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.type && (
                <span className="text-red-600">{errors.type.message}</span>
              )}
            </div>
          </div>

          {/* image */}
          {image ? (
            <div className="relative inline-block">
              {(type === "edit" || type === "create") && (
                <button
                  type="button"
                  className="absolute -right-2 -top-2 z-10 rounded-md bg-red-500 p-1 text-white"
                  onClick={() => deleteFile(image)}
                >
                  <AiOutlineDelete />
                </button>
              )}
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`}
                width={100}
                height={100}
                className="rounded-lg"
                alt="sub category image"
                // onClick={() => {
                //   setOpenDocViewer(true);
                //   setDocs(
                //     `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`
                //   );
                // }}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                {...register("image", {
                  required: "Please select image",
                })}
                type="file"
                id="image"
                multiple
                onChange={handleFileChange}
                disabled={type === "view" || type === "delete"}
              />
              {errors.image && (
                <span className="text-red-600">{errors.image.message}</span>
              )}
            </div>
          )}

          {/* product seo */}
          <div className="space-y-4">
            <H4>Product SEO</H4>
            <div className="grid grid-cols-1 gap-2">
              {/* meta title */}
              <div>
                <Label htmlFor={"meta_title"}>Meta title</Label>
                <Input
                  type="text"
                  placeholder="Enter title tag"
                  {...register("meta_title")}
                  disabled={type === "view" || type === "delete"}
                />
              </div>

              {/* meta descrition */}
              <div>
                <Label htmlFor={"meta_description"}>Meta description</Label>
                <Textarea
                  placeholder="Enter meta description tag"
                  {...register("meta_description")}
                  disabled={type === "view" || type === "delete"}
                />
              </div>

              {/* meta keywords */}
              <div>
                <Label htmlFor={"meta_keywords"}>Meta keywords</Label>
                <Textarea
                  placeholder="Enter meta keywords"
                  {...register("meta_keywords")}
                  disabled={type === "view" || type === "delete"}
                />
              </div>
            </div>
          </div>

          {/* is featured */}
          <div className="flex justify-center gap-1 flex-col mt-4">
            <Label htmlFor="is_featured">Is featured?</Label>
            <Controller
              control={control}
              name="is_featured"
              render={({ field: { onChange, value } }) => (
                <Switch
                  onCheckedChange={onChange}
                  checked={value}
                  disabled={type === "view" || type === "delete"}
                />
              )}
            />
          </div>

          <div className="text-right">
            {type !== "view" && (
              <Button variant={type === "delete" ? "destructive" : "default"}>
                {type === "create"
                  ? "Create"
                  : type === "edit"
                    ? "Update"
                    : "Delete"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
