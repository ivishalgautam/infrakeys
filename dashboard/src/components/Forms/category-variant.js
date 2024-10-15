"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Title from "../Title";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { AiOutlineDelete } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import { H4 } from "../ui/typography";
import Spinner from "../Spinner";

export function CategoryVariantForm({
  type,
  handleCreate,
  handleUpdate,
  handleDelete,
  categoryVariantId,
  categoryId,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { faq: [{ question: "", answer: "" }] } });
  const [isLoading, setIsLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faq",
  });

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      faq: data.faq,
      meta_title: data?.meta_title,
      meta_description: data?.meta_description,
      meta_keywords: data?.meta_keywords,
      category_id: categoryId,
      is_variant: true,
    };

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    } else if (type === "delete") {
      handleDelete(categoryVariantId);
    }
    reset();
  };

  // update variant
  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.categories.getAll}/getById/${categoryVariantId}`
        );
        console.log({ data });
        data && setValue("name", data?.name);
        remove();
        data &&
          data?.faq &&
          data?.faq?.map(({ question, answer }) => {
            append({ question, answer });
          });
        data && setValue("meta_title", data?.meta_title);
        data && setValue("meta_description", data?.meta_description);
        data && setValue("meta_keywords", data?.meta_keywords);
        data && setValue("city_slug", data?.city_slug);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (
      categoryVariantId &&
      (type === "edit" || type === "view" || type === "delete")
    ) {
      fetchData();
    }
  }, [categoryVariantId, type]);

  //   fetch by catageory id
  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.categories.getAll}/getById/${categoryId}`
        );
        console.log({ data });
        data && setValue("name", data?.name);
        remove();
        data &&
          data?.faq &&
          data?.faq?.map(({ question, answer }) => {
            append({ question, answer });
          });
        data && setValue("meta_title", data?.meta_title);
        data && setValue("meta_description", data?.meta_description);
        data && setValue("meta_keywords", data?.meta_keywords);
        data && setValue("city_slug", data?.city_slug);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (categoryId) {
      fetchData();
    }
  }, [categoryId, type, append, remove, setValue]);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-y-4 p-2">
        <Title
          text={
            type === "create"
              ? "Create category variant"
              : type === "view"
                ? "Category variant details"
                : type === "edit"
                  ? "Edit category variant"
                  : "Are you sure you want to delete"
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              disabled={type === "view" || type === "delete"}
              // className="w-full px-4 py-3 h-[44px] border outline-none rounded-md bg-[#F7F7FC] font-mulish text-xl font-semibold"
              placeholder="Category variant Name"
              {...register("name", {
                required: "required*",
              })}
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
        </div>

        {/* faq */}
        <div className="col-span-3 bg-white space-y-2">
          <Title text={"FAQ"} />

          <div className="space-y-4">
            {fields.map((field, key) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <H4> Question: {key + 1}</H4>
                  {type !== "view" && (
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={() => remove(key)}
                    >
                      <AiOutlineDelete size={20} />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>Question</Label>
                  <Input
                    {...register(`faq.${key}.question`, {
                      required: "required",
                    })}
                    placeholder="Question"
                    disabled={type === "view"}
                  />
                  {errors.faq && (
                    <span className="text-red-600">
                      {errors.faq?.[key]?.question?.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label>Answer</Label>
                  <Textarea
                    {...register(`faq.${key}.answer`, {
                      required: "required",
                    })}
                    placeholder="Answer"
                    disabled={type === "view"}
                  />
                  {errors.faq && (
                    <span className="text-red-600">
                      {errors.faq?.[key]?.answer?.message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {type !== "view" && (
            <Button type="button" onClick={() => append()}>
              Add
            </Button>
          )}
        </div>

        {/* product seo */}
        <div className="space-y-4">
          <H4>Category SEO</H4>
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
  );
}
