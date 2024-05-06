"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Title from "../Title";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { H3 } from "../ui/typography";

const defaultValues = {
  product_title: "",
  quantity: "",
  quantity_type: "",
  company: "",
  company_gst: "",
  email: "",
  phone: "",
  pincode: "",
  enquiry_type: "",
  status: "",
  available_quantity: "",
  comment: "",
  base_rate: "",
  gst: "",
};

export function EnquiryForm({ type, handleUpdate, enquiryId }) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const payload = {
      status: data?.status,
      quantity: data?.quantity,
      available_quantity: ["pending", "not_available", "quotation"].includes(
        data?.status
      )
        ? 0
        : data?.available_quantity,
      comment: data?.comment,
      base_rate: data?.base_rate,
      gst: data?.gst,
    };

    handleUpdate(payload);
  };
  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      try {
        const { data } = await http().get(
          `${endpoints.enquiries.getAll}/${enquiryId}`
        );
        // console.log({ data });

        data && setValue("product_title", data?.product_title);
        data && setValue("quantity", data?.quantity);
        data && setValue("quantity_type", data?.quantity_type);
        data && setValue("company", data?.company);
        data && setValue("company_gst", data?.company_gst);
        data && setValue("email", data?.email);
        data && setValue("phone", data?.phone);
        data && setValue("pincode", data?.pincode);
        data && setValue("enquiry_type", data?.enquiry_type);
        data && setValue("status", data?.status);
        data && setValue("available_quantity", data?.available_quantity);
        data && setValue("comment", data?.comment);
        data && setValue("base_rate", !data?.base_rate ? "" : data?.base_rate);
        data && setValue("gst", !data?.gst ? "" : data?.gst);
      } catch (error) {
        console.error(error);
      }
    };
    if (enquiryId && type) {
      fetchData();
    }
  }, [enquiryId, type]);

  // useEffect(() => {
  //   if (watch("status") === "available") {
  //     setValue("available_quantity", getValues("quantity"));
  //   }

  //   if (watch("status") === "not_available") {
  //     setValue("available_quantity", "");
  //   }
  // }, [watch("status")]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl">
      <div className="space-y-4 p-2">
        <Title
          text={
            type === "view"
              ? "Enquiry details"
              : type === "edit"
                ? "Edit Enquiry"
                : "Are you sure you want to delete"
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {/* Company */}
          <div>
            <Label htmlFor="company">Company</Label>
            <Input {...register("company")} type="text" disabled />
          </div>

          {/* email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} type="text" disabled />
          </div>

          {/* phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input {...register("phone")} type="text" disabled />
          </div>

          {/* pincode or company gst */}
          {watch("enquiry_type") === "buy" ? (
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input {...register("pincode")} type="text" disabled />
            </div>
          ) : (
            <div>
              <Label htmlFor="company_gst">Company GST</Label>
              <Input {...register("company_gst")} type="text" disabled />
            </div>
          )}

          {/* enquiry_type */}
          <div>
            <Label htmlFor="enquiry_type">Enquiry Type</Label>
            <Input {...register("enquiry_type")} type="text" disabled />
          </div>

          {/* status */}
          {watch("enquiry_type") === "buy" && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                rules={{ required: "required*" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={type === "view"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="quotation">Quotation</SelectItem>
                        <SelectItem value="not_available">
                          Not available
                        </SelectItem>
                        <SelectItem value="in_transit">In transit</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="partially_available">
                          Partially available
                        </SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <span className="text-red-600">{errors.status.message}</span>
              )}
            </div>
          )}

          {/* comment */}
          <div className="sm:col-span-2 md:col-span-3">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              {...register("comment")}
              disabled={type === "view"}
              placeholder="Enter comment"
            />
          </div>
        </div>

        <div>
          <H3>Item details</H3>
          <div className="grid gap-2 grid-cols-3">
            {/* product name */}
            <div>
              <Label htmlFor="product_title">Product Name</Label>
              <Input {...register("product_title")} type="text" disabled />
            </div>

            <div>
              {/* quantity */}
              <div className="relative">
                <Label>Quantity</Label>
                <Input
                  {...register("quantity", { valueAsNumber: true })}
                  placeholder="Quantity"
                  disabled
                />
                {/* quantity type*/}
                {watch("quantity_type") ? (
                  <div className="absolute bottom-0 right-0 z-10">
                    <Button variant="primary" type="button" disabled>
                      {watch("quantity_type")}
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* available quantity */}
            {watch("enquiry_type") === "buy" &&
              !["pending", "not_available", "quotation"].includes(
                watch("status")
              ) && (
                <div>
                  <Label htmlFor="available_quantity">Available</Label>
                  <Input
                    disabled={type === "view"}
                    {...register("available_quantity", {
                      required: "required*",
                      valueAsNumber: true,
                      validate: (val) => {
                        if (watch("quantity") < val) {
                          return "Not more than quantity!";
                        }
                      },
                    })}
                    type="text"
                    placeholder={"Enter available"}
                  />
                  {errors.available_quantity && (
                    <span className="text-red-600">
                      {errors.available_quantity.message}
                    </span>
                  )}
                </div>
              )}

            {/* base rate */}
            <div className="relative">
              <Label>Base rate</Label>
              <Input
                {...register("base_rate", {
                  required: "required*",
                  valueAsNumber: true,
                })}
                placeholder="Base rate"
                disabled={type === "view"}
              />
              {errors.base_rate && (
                <span className="text-red-600">{errors.base_rate.message}</span>
              )}
            </div>

            {/* gst */}
            <div className="relative">
              <Label>GST</Label>
              <Input
                {...register("gst", {
                  required: "required*",
                  valueAsNumber: true,
                })}
                placeholder="Enter gst"
                disabled={type === "view"}
              />
              {errors.gst && (
                <span className="text-red-600">{errors.gst.message}</span>
              )}
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
