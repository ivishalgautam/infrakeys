"use client";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { H5, Small } from "@/components/ui/typography";
import { MdDelete } from "react-icons/md";
import { endpoints } from "../../../utils/endpoints";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Textarea } from "@/components/ui/textarea";

const updateEnquiry = (data) => {
  return http().put(`${endpoints.enquiries.getAll}/${data.enquiry_id}`, data);
};

const convertToOrder = ({ id }) => {
  return http().post(`${endpoints.enquiries.getAll}/convertToOrder/${id}`, {});
};

const deleteOrderItem = ({ id }) => {
  return http().delete(`${endpoints.enquiries.getAll}/order-items/${id}`);
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
  } = useForm();
  const { fields, remove } = useFieldArray({
    control,
    name: "items",
  });
  const queryClient = useQueryClient();
  const [token] = useLocalStorage("token");

  const router = useRouter();

  const updateMutation = useMutation(updateEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["enquiries"]);
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });

  const convertToOrderMutation = useMutation(convertToOrder, {
    onSuccess: (data) => {
      toast.success(data?.message ?? "Coverted to order.");
      queryClient.invalidateQueries("enquiries");
      router.push("/enquiries");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation(deleteOrderItem, {
    onSuccess: (data) => {
      const index = fields.findIndex((so) => so._id === data.data.id);
      remove(index);
      toast.success("enquiry deleted");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleDelete = ({ id }) => {
    deleteMutation.mutate({ id });
  };

  const handleConvertToOrder = ({ id }) => {
    convertToOrderMutation.mutate({ id });
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const { data } = await http().get(`${endpoints.enquiries.getAll}/${id}`);
      console.log({ data });
      data && setValue("status", data.status);
      data && setValue("user_id", data.user_id);
      data && setValue("quotation_file", data.quotation_file);
      data && setValue("po_number", data.po_number);
      data && setValue("po_file", data.po_file);
      data && setValue("delivery_summary", data.delivery_summary);
      data &&
        setValue(
          "items",
          data?.items?.map((item) => ({ ...item, _id: item.id }))
        );
    };

    fetchData(id);
  }, [id]);

  const handleFileChange = async (event) => {
    try {
      const selectedFiles = Array.from(event.target.files);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      console.log("formData=>", formData);
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

      updateMutation.mutate({ quotation_file: data?.path[0], id: id });

      console.log("Upload successful:", data.path);
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
      updateMutation.mutate({ quotation_file: "", id: id });
    } catch (error) {
      console.log(error);
      toast.error("error deleting image");
    }
  };

  const onSubmit = (data) => {
    const payload = {
      status: data.status,
      user_id: data.user_id,
      items: data.items,
    };
    handleUpdate(payload);
    router.push("/enquiries");
  };

  async function handleUpdate(data) {
    updateMutation.mutate(Object.assign(data, { enquiry_id: id }));
  }

  const itemStatus = (key) => watch(`items.${key}.status`);

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
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="not_available">
                              Not available
                            </SelectItem>
                            <SelectItem value="partially_available">
                              Partially available
                            </SelectItem>
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

                {/* base rate */}
                {!["pending", "not_available"].includes(
                  watch(`items.${key}.status`)
                ) && (
                  <div>
                    <Label>Base rate</Label>

                    <Input
                      type="number"
                      {...register(`items.${key}.base_rate`, {
                        required: "required",
                        valueAsNumber: true,
                      })}
                      placeholder="Enter base rate"
                    />
                    {errors?.items?.[key] && (
                      <Small className={"text-red-500"}>
                        {errors.items[key]?.["base_rate"]?.message}
                      </Small>
                    )}
                  </div>
                )}

                {/* gst */}
                {!["pending", "not_available"].includes(
                  watch(`items.${key}.status`)
                ) && (
                  <div>
                    <Label>GST</Label>
                    <Input
                      type="number"
                      {...register(`items.${key}.gst_percentage`, {
                        required: "required",
                        valueAsNumber: true,
                      })}
                      placeholder="Enter gst"
                    />
                    {errors?.items?.[key] && (
                      <Small className={"text-red-500"}>
                        {errors.items[key]?.["gst_percentage"]?.message}
                      </Small>
                    )}
                  </div>
                )}

                {/* total amount */}
                {!["pending", "not_available"].includes(
                  watch(`items.${key}.status`)
                ) &&
                  watch(`items.${key}.total_amount`) && (
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

        {/* enquiry status */}
        <div className="grid grid-cols-2 my-6 gap-2">
          <div>
            <Label>Enquiry status</Label>
            <Controller
              control={control}
              name={`status`}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  required
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="partially_available">
                      Partially available
                    </SelectItem>
                    <SelectItem value="not_available">Not available</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.enquiry_status && (
              <Small className={"text-red-500"}>
                {errors.enquiry_status.message}
              </Small>
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
          <div className="col-span-4">
            <Label>Address</Label>
            <Textarea {...register(`delivery_summary`)} disabled />
          </div>
          <div>
            <Label>PO Number</Label>
            <Input
              {...register(`po_number`)}
              placeholder="not found!"
              disabled
            />
          </div>
          <div>
            <Label>PO File</Label>
            <div className="flex items-center justify-between rounded-md border px-2 text-xs">
              {!getValues("po_file") ? (
                <Input className="w-full" disabled placeholder="Not found!" />
              ) : (
                <>
                  <span className="truncate">{getValues("po_file")}</span>
                  <div className="flex items-center justify-center gap-2">
                    <Button type="button" variant="outline" size="icon">
                      <a
                        target="_vishal"
                        href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${getValues("po_file")}`}
                      >
                        <Eye />
                      </a>
                    </Button>
                    <Button type="button" variant="destructive" size="icon">
                      <MdDelete size={20} />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {fields?.length > 0 && (
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="default"
              onClick={() => handleConvertToOrder({ id })}
              disabled={!getValues("po_file") || !getValues("po_number")}
            >
              Convert to order
            </Button>

            <Button type="submit" variant="primary">
              Submit query
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
