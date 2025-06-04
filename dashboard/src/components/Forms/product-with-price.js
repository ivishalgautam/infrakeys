"use client";
import React, { useEffect, useState } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";

import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import Title from "../Title";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { H4 } from "../ui/typography";
import { Textarea } from "../ui/textarea";
import Spinner from "../Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Plus, Trash } from "lucide-react";
import ReactSelect from "react-select";

export function ProductForm({
  type,
  handleCreate,
  handleUpdate,
  handleDelete,
  productId,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descriptions: [{ key: "", value: "" }],
      items: [{ name: "", values: [] }],
    },
  });

  const copyProduct = watch("copy_product");

  const {
    fields: customPropertiesFields,
    append: appendCustomProperty,
    remove: removeCustomProperty,
  } = useFieldArray({ control, name: "items" });
  const [inputVal, setInputVal] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const { data: products, isLoading: isProductsLoading } = useFetchProducts();

  const formattedProducts = products?.map(({ id: value, title: label }) => ({
    value,
    label,
  }));

  const onSubmit = (data) => {
    if (type === "delete") {
      return handleDelete({ id: productId });
    }

    const payload = {
      title: data.name,
      custom_properties: data.items,
      meta_title: data?.meta_title,
      meta_description: data?.meta_description,
      meta_keywords: data?.meta_keywords,
    };

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    }

    reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.products.getAll}/getById/${productId}`
        );
        data && setValue("name", data?.title);
        data &&
          data.custom_properties &&
          setValue("items", data.custom_properties);
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
      productId &&
      !isProductsLoading &&
      (type === "edit" || type === "view")
    ) {
      fetchData();
    }
  }, [productId, type, isProductsLoading, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await http().get(
          `${endpoints.products.getAll}/getById/${copyProduct.value}`
        );
        data &&
          data.custom_properties &&
          setValue("items", data.custom_properties);
        data && setValue("meta_title", data?.meta_title);
        data && setValue("meta_description", data?.meta_description);
        data && setValue("meta_keywords", data?.meta_keywords);
      } catch (error) {
        console.error(error);
      }
    };

    if (copyProduct) {
      fetchData();
    }
  }, [copyProduct, setValue]);

  const setFieldValues = (value, ind) => {
    if (!inputVal[`inputVal.${ind}`]) return toast.warning("Enter value");

    const updatedFields = getValues("items").map((field, key) => {
      if (key === ind) {
        return {
          name: field.name.trim(),
          values: field.values.includes(value)
            ? field.values
            : [...field.values, String(value).trim()],
        };
      }
      return field;
    });
    // setValue(`items.${ind}.values`, [...fields[ind].values, value]);
    removeCustomProperty();
    appendCustomProperty(updatedFields);
    setInputVal((prev) => ({ ...prev, [`inputVal.${ind}`]: "" }));
  };

  const removeFieldValues = (value, ind) => {
    const updatedFields = customPropertiesFields.map((field, key) => {
      if (key === ind) {
        return {
          ...field,
          values: field.values.filter((i) => i !== value),
        };
      }
      return field;
    });
    // setValue(`items.${ind}.values`, [...fields[ind].values, value]);
    removeCustomProperty();
    appendCustomProperty(updatedFields);
    setInputVal((prev) => ({ ...prev, [`inputVal.${ind}`]: "" }));
  };

  if (isLoading || isProductsLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {type !== "delete" ? (
          <div className="space-y-6">
            {/* title */}
            <div className="">
              <Title
                text={
                  type === "create"
                    ? "Create product"
                    : type === "view"
                      ? "Product details"
                      : type === "edit"
                        ? "Edit product"
                        : "Are you sure you want to delete"
                }
              />
            </div>

            {type === "create" && (
              <div>
                <Label>Copy from</Label>
                <Controller
                  control={control}
                  name="copy_product"
                  render={({ field: { value, onChange } }) => (
                    <ReactSelect
                      options={formattedProducts}
                      onChange={onChange}
                      defaultValue={value}
                    />
                  )}
                />
              </div>
            )}

            {/* product info */}
            <div className="space-y-4">
              <H4>Product Information</H4>
              <div className="grid grid-cols-3 gap-2">
                {/* product name */}
                <div>
                  <Label htmlFor="name">Product name</Label>
                  <Input
                    type="text"
                    disabled={type === "view" || type === "delete"}
                    placeholder="Product Name"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )}
                </div>

                {/* product name */}
                {!copyProduct ? (
                  <div>
                    <Label htmlFor="price">Product price</Label>
                    <Input
                      type="text"
                      disabled={type === "view" || type === "delete"}
                      placeholder="Product price"
                      {...register("price", {
                        required: "Product price is required",
                      })}
                    />
                    {errors.price && (
                      <span className="text-red-600">
                        {errors.price.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="name">Percentage</Label>
                    <Input
                      type="number"
                      disabled={type === "view" || type === "delete"}
                      placeholder="Percentage"
                      {...register("percentage", {
                        required: "required",
                      })}
                    />
                    {errors.percentage && (
                      <span className="text-red-600">
                        {errors.percentage.message}
                      </span>
                    )}
                  </div>
                )}

                {/* custom properties */}
                <div className="col-span-3 mt-4">
                  <H4>Custom properties</H4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Values</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customPropertiesFields.map((item, ind) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input
                              {...register(`items.${ind}.name`)}
                              placeholder="Name"
                            />
                          </TableCell>
                          <TableCell className="flex items-center flex-wrap justify-start">
                            <div className="flex items-center justify-start gap-2 flex-wrap">
                              {item.values?.map((val) => (
                                <span
                                  key={val}
                                  className="bg-primary text-white px-2 py-1 rounded-md cursor-pointer text-xs"
                                  onClick={() => removeFieldValues(val, ind)}
                                >
                                  {val} x
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-start">
                              <Input
                                onChange={(e) =>
                                  setInputVal((prev) => ({
                                    ...prev,
                                    [`inputVal.${ind}`]: e.target.value,
                                  }))
                                }
                                placeholder="Enter value..."
                                value={inputVal[`inputVal.${ind}`] ?? ""}
                                className="border-none bg-transparent"
                              />
                              <Button
                                type="button"
                                onClick={() =>
                                  setFieldValues(
                                    inputVal[`inputVal.${ind}`],
                                    ind
                                  )
                                }
                                size="icon"
                              >
                                <Plus size={20} />
                              </Button>
                            </div>
                            <Button
                              variant="destructive"
                              onClick={() => removeCustomProperty(ind)}
                              size="icon"
                              className="ml-2"
                            >
                              <Trash size={20} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} className="text-right">
                          <Button
                            type="button"
                            onClick={() =>
                              appendCustomProperty({ name: "", values: [] })
                            }
                          >
                            Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            </div>

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
                    disabled={type === "view"}
                  />
                </div>

                {/* meta descrition */}
                <div>
                  <Label htmlFor={"meta_description"}>Meta description</Label>
                  <Input
                    type="text"
                    placeholder="Enter meta description tag"
                    {...register("meta_description")}
                    disabled={type === "view"}
                  />
                </div>

                {/* meta keyword */}
                <div>
                  <Label htmlFor={"meta_keywords"}>Meta keywords</Label>
                  <Textarea
                    type="text"
                    placeholder="Enter meta keywords"
                    {...register("meta_keywords")}
                    disabled={type === "view"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Are you sure you want to delete!</p>
        )}

        {/* submit */}
        <div className="text-right">
          {type !== "view" && (
            <Button variant={type === "delete" ? "destructive" : "primary"}>
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
