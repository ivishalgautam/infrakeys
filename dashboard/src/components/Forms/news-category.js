"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Title from "../Title";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import { H4 } from "../ui/typography";
import Spinner from "../Spinner";

export function NewsCategoryForm({
  type,
  handleCreate,
  handleUpdate,
  handleDelete,
  categoryId,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      is_featured: data.is_featured,
      meta_title: data?.meta_title,
      meta_description: data?.meta_description,
      meta_keywords: data?.meta_keywords,
    };

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    } else if (type === "delete") {
      handleDelete(categoryId);
    }
    reset();
  };
  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.newsCategories.getAll}/getById/${categoryId}`
        );
        data && setValue("name", data?.name);
        data && setValue("is_featured", data?.is_featured);
        data && setValue("meta_title", data?.meta_title);
        data && setValue("meta_description", data?.meta_description);
        data && setValue("meta_keywords", data?.meta_keywords);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (
      categoryId &&
      (type === "edit" || type === "view" || type === "delete")
    ) {
      fetchData();
    }
  }, [categoryId, type, setValue]);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-y-4 p-2">
        <Title
          text={
            type === "create"
              ? "Create category"
              : type === "view"
                ? "Category details"
                : type === "edit"
                  ? "Edit category"
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
              placeholder="Category Name"
              {...register("name", {
                required: "Category is required",
              })}
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
        </div>

        {/* product seo */}
        <div className="space-y-4">
          <H4>SEO</H4>
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
        <div className="flex justify-center gap-1 flex-col mt-4 col-span-3">
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
  );
}
