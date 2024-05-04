"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";

import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AiOutlineDelete } from "react-icons/ai";
import { Editor } from "primereact/editor";

import Title from "../Title";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "@/components/ui/switch";
import { debounce } from "lodash";
import { H4 } from "../ui/typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFetchSubCategories } from "@/hooks/useFetchSubCategories";
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
import { Delete, Plus, Trash } from "lucide-react";
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      descriptions: [{ key: "", value: "" }],
      items: [{ name: "", values: [] }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "custom_description",
  });

  const {
    fields: customPropertiesFields,
    append: appendCustomProperty,
    remove: removeCustomProperty,
  } = useFieldArray({ control, name: "items" });
  const [inputVal, setInputVal] = useState({});

  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSetText = debounce(setText, 1000);
  // console.log(watch());
  const [tags, setTags] = useState([]);
  const [quantityTypes, setQuantityTypes] = useState([]);
  const editorRef = useRef(null);

  const { data: subCategories, isLoading: isSubCatLoading } =
    useFetchSubCategories();
  const { data: products, isLoading: isProductsLoading } = useFetchProducts();

  const productStatus = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
  ];

  const formattedSubCategories = subCategories?.map(
    ({ id: value, name: label }) => ({
      value,
      label,
    })
  );

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
      description: text,
      custom_description: data?.custom_description,
      custom_properties: data.items,
      tags: tags,
      quantity_types: quantityTypes,
      sku: data?.sku,
      sub_category_id: data?.sub_category_id.value,
      status: data?.status?.value,
      is_featured: data?.is_featured,
      related_products: data?.related_products?.map((so) => so.value),
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
          setValue(
            "sub_category_id",
            formattedSubCategories?.find(
              (so) => so.value === data?.sub_category_id
            )
          );
        data && setValue("status", data?.status);
        data &&
          data.custom_description &&
          setValue("custom_description", data.custom_description);
        data &&
          data.custom_properties &&
          setValue("items", data.custom_properties);
        data && setTags(data?.tags);
        data &&
          setQuantityTypes(
            typeof data?.quantity_types === "object"
              ? data?.quantity_types
              : JSON.parse(data?.quantity_types)
          );
        if (!editorRef.current) {
          data && setText(data?.description);
          editorRef.current = true;
        }
        // data && setValue("description", data?.description);
        data && setValue("is_featured", data?.is_featured);
        data && setValue("sku", data?.sku);
        data && setValue("meta_title", data?.meta_title);
        data && setValue("meta_description", data?.meta_description);
        data && setValue("meta_keywords", data?.meta_keywords);
        data?.related_products &&
          setValue(
            "related_products",
            formattedProducts?.filter((so) =>
              data?.related_products?.includes(so.value)
            )
          );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId && (type === "edit" || type === "view")) {
      fetchData();
    }
  }, [
    productId,
    type,
    formattedProducts?.length,
    formattedSubCategories?.length,
  ]);

  const addTag = () => {
    if (getValues("tag") === "") {
      return toast.warning("Please enter tag name");
    }

    const updatedTags = new Set([...tags, getValues("tag")]);

    updatedTags.add(getValues("tag").trim());
    setTags([...Array.from(updatedTags)]);
    setValue("tag", "");
  };

  const addQuantityType = () => {
    if (getValues("quantity_type") === "") {
      return toast.warning("Please enter quantity type");
    }

    const updatedTypes = new Set([
      ...quantityTypes,
      getValues("quantity_type"),
    ]);

    updatedTypes.add(getValues("quantity_type").trim());
    setQuantityTypes([...Array.from(updatedTypes)]);
    setValue("quantity_type", "");
  };

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

  if (isLoading) return <Spinner />;

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

                {/* sub category */}
                <div>
                  <Label htmlFor="sub_category_id">Sub catgeory</Label>
                  <Controller
                    control={control}
                    name="sub_category_id"
                    maxMenuHeight={230}
                    rules={{ required: "Please select sub category" }}
                    render={({ field: { onChange, value } }) => (
                      <ReactSelect
                        options={formattedSubCategories}
                        onChange={onChange}
                        defaultValue={value}
                      />
                    )}
                  />

                  {errors.sub_category_id && (
                    <span className="text-red-600">
                      {errors.sub_category_id.message}
                    </span>
                  )}
                </div>

                {/* product status */}
                <div>
                  <Label htmlFor="status">Product Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    maxMenuHeight={230}
                    rules={{ required: "Please select status" }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={value}
                        onValueChange={onChange}
                        className="w-full"
                        disabled={type === "view" || type === "delete"}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {productStatus?.map(({ value, label }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.status && (
                    <span className="text-red-600">
                      {errors.status.message}
                    </span>
                  )}
                </div>

                {/* sku */}
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    type="text"
                    disabled={type === "view" || type === "delete"}
                    placeholder="SKU"
                    {...register("sku", {
                      required: "SKU is required",
                    })}
                  />
                  {errors.sku && (
                    <span className="text-red-600">{errors.sku.message}</span>
                  )}
                </div>

                {/* quantity types */}
                <div className="col-span-3">
                  <Label htmlFor="quantity">Quantity types</Label>
                  <div className="grid grid-cols-12 gap-2 border p-0.5 rounded">
                    <div className="flex flex-wrap items-center col-span-10 gap-2 px-1">
                      {quantityTypes?.map((type, key) => (
                        <span
                          key={key}
                          className="bg-primary rounded-lg p-1 px-2 text-white cursor-pointer"
                          onClick={() => {
                            if (type === "view") return;
                            const types = quantityTypes?.filter(
                              (item) => item !== type
                            );
                            setQuantityTypes(types);
                          }}
                        >
                          {type === "view" ? type : `${type} x`}
                        </span>
                      ))}

                      {type !== "view" && (
                        <Input
                          {...register("quantity_type")}
                          type="text"
                          disabled={type === "view" || type === "delete"}
                          placeholder="Enter quantity type"
                          className="w-auto"
                        />
                      )}
                    </div>

                    {type !== "view" && (
                      <div className="col-span-2">
                        <Button
                          type="button"
                          className="w-full"
                          disabled={type === "view"}
                          onClick={addQuantityType}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* tags */}
                <div className="col-span-3">
                  <Label htmlFor="quantity">Tags</Label>
                  <div className="grid grid-cols-12 gap-2 border p-0.5 rounded">
                    <div className="flex flex-wrap items-center col-span-10 gap-2 px-1">
                      {tags?.map((tag, key) => (
                        <span
                          key={key}
                          className="bg-primary rounded-lg p-1 px-2 text-white cursor-pointer"
                          onClick={() => {
                            if (type === "view") return;
                            const updatedTags = tags?.filter(
                              (item) => item !== tag
                            );
                            setTags(updatedTags);
                          }}
                        >
                          {type === "view" ? tag : `${tag} x`}
                        </span>
                      ))}

                      {type !== "view" && (
                        <Input
                          {...register("tag")}
                          type="text"
                          disabled={type === "view" || type === "delete"}
                          placeholder="Enter tag name"
                          className="w-auto"
                        />
                      )}
                    </div>

                    {type !== "view" && (
                      <div className="col-span-2">
                        <Button
                          type="button"
                          className="w-full"
                          disabled={type === "view"}
                          onClick={addTag}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

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
                          <TableCell className="flex items-center justify-start">
                            <div className="flex items-center justify-start gap-2">
                              {item.values?.map((val) => (
                                <span
                                  key={val}
                                  className="bg-primary text-white px-2 py-1 rounded-md cursor-pointer"
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
                  {/* {fields.map((item,ind) => (
              <div key={item.id}>
                <div>
                  <Label>Name</Label>
                </div>
              </div>
            ))} */}
                </div>

                {/* related products */}
                <div className="col-span-3">
                  <Label htmlFor="related_products">Related products</Label>
                  <Controller
                    control={control}
                    name="related_products"
                    maxMenuHeight={230}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        isMulti
                        options={formattedProducts}
                        placeholder="Select related products"
                        isDisabled={type === "view"}
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

                  {errors.related_products && (
                    <span className="text-red-600">
                      {errors.related_products.message}
                    </span>
                  )}
                </div>

                {/* description */}
                <div className="col-span-3">
                  <Label htmlFor="description">Description</Label>
                  <Editor
                    focus={editorRef.current}
                    readOnly={type === "view"}
                    name="blog"
                    value={text}
                    onTextChange={(e) => debouncedSetText(e.htmlValue)}
                    style={{ height: "320px" }}
                  />
                </div>
              </div>
            </div>

            {/* custom description */}
            <div className="space-y-4">
              <H4>Custom descriptions</H4>

              <div>
                {fields.map((field, key) => (
                  <div
                    key={key}
                    className="flex items-end justify-center gap-2"
                  >
                    <div className="flex-1">
                      <Label>Name</Label>
                      <Input
                        {...register(`custom_description.${key}.key`, {
                          required: "required",
                        })}
                        placeholder="Custom key"
                        disabled={type === "view"}
                      />
                      {errors.custom_description && (
                        <span className="text-red-600">
                          {errors.custom_description?.[key]?.key?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <Label>Value</Label>
                      <Input
                        {...register(`custom_description.${key}.value`, {
                          required: "required",
                        })}
                        placeholder="Custom value"
                        disabled={type === "view"}
                      />
                      {errors.custom_description && (
                        <span className="text-red-600">
                          {errors.custom_description?.[key]?.value?.message}
                        </span>
                      )}
                    </div>
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
              <H4>Product SEO</H4>
              <div className="grid grid-cols-1 gap-2">
                {/* meta title */}
                <div>
                  <Label htmlFor={"meta_title"}>Meta title</Label>
                  <Input
                    type="text"
                    placeholder="Enter title tag"
                    {...register("meta_title", {
                      required: "Please enter title tag.",
                    })}
                    disabled={type === "view"}
                  />
                  {errors.meta_title && (
                    <span className="text-red-600">
                      {errors.meta_title.message}
                    </span>
                  )}
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
                  {errors.meta_description && (
                    <span className="text-red-600">
                      {errors.meta_description.message}
                    </span>
                  )}
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
                  {errors.meta_keywords && (
                    <span className="text-red-600">
                      {errors.meta_keywords.message}
                    </span>
                  )}
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
              {errors.is_featured && (
                <span className="text-red-600">
                  {errors.is_featured.message}
                </span>
              )}
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
