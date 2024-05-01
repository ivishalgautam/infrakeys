"use client";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { H5, Small } from "@/components/ui/typography";
import { MdDelete } from "react-icons/md";
import { Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { MainContext } from "@/store/context";
import Spinner from "@/components/Spinner";
import ReactSelect from "react-select";

const updateOrder = (data) => {
  return http().put(`${endpoints.orders.getAll}/${data.order_id}`, data);
};

const deleteOrderItem = ({ id }) => {
  return http().delete(`${endpoints.orders.getAll}/order-items/${id}`);
};

export default function Page({ params: { id } }) {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      po_number: "",
      po_file: "",
      quotation_file: "",
      items: [],
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "items",
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token] = useLocalStorage("token");
  const { user } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  const { data: subAdmins, isLoading: isSubAdminLoading } =
    useFetchUsers("subadmin");
  const formattedSubAdmins = subAdmins?.map(({ id, name, username }) => ({
    value: id,
    label: `${name} (@${username})`,
  }));

  const updateMutation = useMutation(updateOrder, {
    onSuccess: (data) => {
      toast.success("Updated");
      queryClient.invalidateQueries(["orders"]);
      router.push("/orders");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });

  function handleUpdate(data) {
    updateMutation.mutate(Object.assign(data, { order_id: id }));
  }

  const deleteMutation = useMutation(deleteOrderItem, {
    onSuccess: (data) => {
      console.log({ data });
      const index = fields.findIndex((so) => so._id === data.data.id);
      remove(index);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleDelete = ({ id }) => {
    deleteMutation.mutate({ id });
  };

  useEffect(() => {
    const fetchOrderById = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(`${endpoints.orders.getAll}/${id}`);
        if (data) {
          setValue("status", data.status);
          setValue("po_number", data.po_number);
          setValue("po_file", data.po_file);
          setValue("quotation_file", data.quotation_file);
          formattedSubAdmins.length &&
            setValue(
              "assigned_to",
              formattedSubAdmins.find((so) => so.value === data.assigned_to)
            );
          setValue(
            "items",
            data?.items.map((item) => ({ ...item, _id: item.id }))
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchOrderById();
  }, [id, formattedSubAdmins?.length]);

  const onSubmit = (data) => {
    const payload = {
      status: data.status,
      items: data.items,
      assigned_to: data.assigned_to,
    };
    handleUpdate(payload);
  };

  const handleFileChange = async (event) => {
    try {
      const selectedFiles = Array.from(event.target.files);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.files.upload}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setValue("quotation_file", data.quotation_file);
      handleUpdate({ quotation_file: data?.path[0] });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteFile = async (filePath) => {
    try {
      const resp = await http().delete(
        `${endpoints.files.getFiles}?file_path=${filePath}`
      );
      setValue("quotation_file", "");
      updateMutation.mutate({ quotation_file: "", order_id: id });
    } catch (error) {
      console.log(error);
      toast.error("error deleting image");
    }
  };

  const itemStatus = (key) => watch(`items.${key}.status`);

  if (isLoading || isSubAdminLoading) return <Spinner />;

  return (
    <div className="bg-white rounded-md p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {fields?.map((field, key) => (
            <div key={field.id}>
              <H5>Item: {key + 1}</H5>
              <div className="grid grid-cols-4 gap-2 border p-4 rounded-md relative">
                {/* name */}
                <div>
                  <Label>Product</Label>
                  <Input value={field.product_title} disabled />
                </div>

                {/* quantity */}
                <div>
                  <Label>Quantity</Label>
                  <Input
                    disabled
                    type="number"
                    {...register(`items.${key}.quantity`, {
                      required: "required",
                      valueAsNumber: true,
                    })}
                    placeholder="Enter quantity"
                  />
                  {errors?.items?.[key] && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]?.["quantity"]?.message}
                    </Small>
                  )}
                </div>

                {/* available quantity */}
                {itemStatus(key) === "partially_available" && (
                  <div>
                    <Label>Available quantity</Label>
                    <Input
                      type="number"
                      {...register(`items.${key}.available_quantity`, {
                        required: "required",
                        valueAsNumber: true,
                      })}
                      placeholder="Enter available quantity"
                      disabled
                    />
                    {errors?.items?.[key] && (
                      <Small className={"text-red-500"}>
                        {errors.items[key]?.["available_quantity"]?.message}
                      </Small>
                    )}
                  </div>
                )}

                {/* status */}
                <div>
                  <Label>Status</Label>
                  <Controller
                    control={control}
                    name={`items.${key}.status`}
                    render={({ field }) => {
                      return (
                        <Select
                          onValueChange={field.onChange}
                          required
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_transit">
                              In transit
                            </SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  {errors?.items?.[key] && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]?.["status"]?.message}
                    </Small>
                  )}
                </div>

                {watch(`items.${key}.status`) === "in_transit" && (
                  <div>
                    <Label>Transit quantity</Label>

                    <Input
                      type="number"
                      {...register(`items.${key}.available_quantity`, {
                        required: "required",
                        valueAsNumber: true,
                      })}
                      placeholder="Enter transit quantity"
                    />
                    {errors?.items?.[key] && (
                      <Small className={"text-red-500"}>
                        {errors.items[key]?.["available_quantity"]?.message}
                      </Small>
                    )}
                  </div>
                )}

                {/* base rate */}
                <div>
                  <Label>Base rate</Label>

                  <Input
                    type="number"
                    {...register(`items.${key}.base_rate`, {
                      required: "required",
                      valueAsNumber: true,
                    })}
                    placeholder="Enter base rate"
                    disabled
                  />
                  {errors?.items?.[key] && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]?.["base_rate"]?.message}
                    </Small>
                  )}
                </div>

                {/* gst */}
                <div>
                  <Label>GST</Label>
                  <Input
                    type="number"
                    {...register(`items.${key}.gst_percentage`, {
                      required: "required",
                      valueAsNumber: true,
                    })}
                    placeholder="Enter gst"
                    disabled
                  />
                  {errors?.items?.[key] && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]?.["gst_percentage"]?.message}
                    </Small>
                  )}
                </div>

                {/* total amount */}
                {watch(`items.${key}.total_amount`) && (
                  <div>
                    <Label>Total amount</Label>
                    <Input
                      type="text"
                      {...register(`items.${key}.total_amount`)}
                      value={parseFloat(
                        watch(`items.${key}.total_amount`)
                      ).toFixed(2)}
                      disabled
                    />
                  </div>
                )}

                {/* comment */}
                <div className="col-span-4">
                  <Label>Comment</Label>
                  <Textarea
                    {...register(`items.${key}.comment`)}
                    placeholder="Write comment"
                  />
                  {errors?.items?.[key] && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]?.["comment"]?.message}
                    </Small>
                  )}
                </div>

                {/* action */}
                <div className="absolute -top-3 -right-3">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete({ id: field._id })}
                  >
                    <MdDelete size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order status */}
        <div className="grid grid-cols-2 my-6 gap-2">
          {/* assign order */}
          {user?.role === "admin" && (
            <div>
              <Label>Assign Order to</Label>
              <Controller
                control={control}
                name={`assigned_to`}
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    options={formattedSubAdmins}
                    defaultValue={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          )}

          <div>
            <Label>Order status</Label>
            <Controller
              control={control}
              name={`status`}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors?.status && (
              <Small className={"text-red-500"}>{errors.status.message}</Small>
            )}
          </div>

          <div>
            <Label>Quotation</Label>
            {!watch("quotation_file") ? (
              <div>
                <Input type="file" onChange={handleFileChange} />
              </div>
            ) : (
              <div className="flex items-center justify-between border px-2 text-xs rounded-md">
                <span>{getValues("quotation_file").split("/")[1]} </span>
                <div className="flex items-center justify-center gap-2">
                  <Button type="button" variant="outline" size="icon">
                    <a
                      target="_vishal"
                      href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${getValues("quotation_file")}`}
                    >
                      <Eye />
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteFile(getValues("quotation_file"))}
                  >
                    <MdDelete size={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {fields?.length > 0 && (
          <div className="flex items-center justify-end">
            <Button type="submit" variant="primary">
              Submit query
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
