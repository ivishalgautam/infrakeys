"use client";
import React, { useContext, useEffect } from "react";
import { H3, P } from "../ui/typography";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { MainContext } from "@/store/context";

const createEnquiry = async (data) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: response } = await axios.post(
    `${baseUrl}${endpoints.enquiries.getAll}`,
    data,
  );
  return response;
};

export default function QueryForm({ type, enquirytype = "buy", productId }) {
  const { user } = useContext(MainContext);
  const { data: products } = useFetchProducts();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      product_id: "",
      quantity: "",
      quantity_type: "",
      company: "",
      company_gst: "",
      pincode: "",
      email: "",
      phone: "",
      enquiry_type: enquirytype,
    },
  });
  const [quantityTypes, setQuantityTypes] = useState([]);

  const createMutation = useMutation(createEnquiry, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Enquiry sent");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    const payload = {
      product_id: data?.product_id,
      quantity: data?.quantity,
      quantity_type: data?.quantity_type,
      company: data?.company,
      company_gst: data?.company_gst,
      pincode: data?.pincode,
      email: data?.email,
      phone: data?.phone,
      enquiry_type: data?.enquiry_type,
    };

    handleCreate(payload);
  };

  const handleCreate = (data) => {
    createMutation.mutate(data);
  };

  useEffect(() => {
    if (watch("product_id")) {
      const types = products?.find(
        (prd) => prd.id === watch("product_id"),
      ).quantity_types;

      if (typeof types === "object") {
        setQuantityTypes(types);
        setValue("quantity_type", types[0]);
      } else {
        setQuantityTypes(JSON.parse(types));
      }
    }
  }, [watch("product_id"), products]);

  useEffect(() => {
    if (user) {
      setValue("phone", user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (products && productId) {
      setValue("product_id", productId);
    }
  }, [products, productId]);

  return (
    <div
      className={cn("space-y-4 rounded-lg bg-primary p-4", {
        "w-full pt-6 sm:w-96": type === "vertical",
      })}
    >
      <div className="flex flex-col items-center justify-start gap-4 text-white md:flex-row">
        <H3>Tell Us Your Requirement</H3>
        <p className={cn("m-0 p-0", { hidden: type === "vertical" })}>
          Best Rates | Working Capital | Delivery Anywhere
        </p>
      </div>
      <div
        className={cn("rounded-md bg-white p-4", {
          "pb-6": Object.keys(errors).length > 0,
        })}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center justify-center sm:justify-start">
            <RadioButtons control={control} watch={watch} />
          </div>

          <div
            className={cn("grid grid-cols-1 gap-2", {
              "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7":
                type === "horizontal",
            })}
          >
            {/* product */}
            <div className="relative">
              <Label>Product</Label>
              <Controller
                control={control}
                name="product_id"
                rules={{ required: "required*" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={products && productId ? productId : ""}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map(({ id: value, title: label }) => (
                        <SelectItem value={value} key={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.product_id && (
                <span className="absolute left-0 top-full text-sm text-red-600">
                  {errors.product_id.message}
                </span>
              )}
            </div>

            <div className="relative">
              {/* quantity */}
              <div className="relative">
                <Label>Quantity</Label>
                <Input
                  {...register("quantity", {
                    required: "required*",
                    valueAsNumber: true,
                  })}
                  placeholder="Quantity"
                />
                {errors.quantity && (
                  <span className="absolute left-0 top-full text-sm text-red-600">
                    {errors.quantity.message}
                  </span>
                )}
              </div>

              {/* quantity type*/}
              {watch("product_id") && quantityTypes.length ? (
                <div className="absolute bottom-0 right-0 z-10">
                  <Controller
                    control={control}
                    name="quantity_type"
                    rules={{ required: "required*" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-black uppercase text-white">
                          <SelectValue placeholder="Select quantity type" />
                        </SelectTrigger>
                        <SelectContent>
                          {quantityTypes?.map((qt) => (
                            <SelectItem
                              value={qt}
                              key={qt}
                              className="uppercase"
                            >
                              {qt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* company */}
            <div className="relative">
              <Label>Company</Label>
              <Input
                {...register("company", { required: "required*" })}
                placeholder="Enter company name"
              />
              {errors.company && (
                <span className="absolute left-0 top-full text-sm text-red-600">
                  {errors.company.message}
                </span>
              )}
            </div>

            {/* company gst or pincode */}
            {watch("enquiry_type") === "sell" ? (
              <div className="relative">
                <Label>Company GST</Label>
                <Input
                  {...register("company_gst", {
                    required: "required*",
                  })}
                  placeholder="Company GST"
                />
                {errors.company_gst && (
                  <span className="absolute left-0 top-full text-sm text-red-600">
                    {errors.company_gst.message}
                  </span>
                )}
              </div>
            ) : (
              <div className="relative">
                <Label>Pincode</Label>
                <Input
                  type="number"
                  {...register("pincode", {
                    required: "required*",
                    valueAsNumber: true,
                  })}
                  placeholder="Pincode"
                />
                {errors.pincode && (
                  <span className="absolute left-0 top-full text-sm text-red-600">
                    {errors.pincode.message}
                  </span>
                )}
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Label>Email</Label>
              <Input
                {...register("email", {
                  required: "required*",
                })}
                placeholder="Email"
              />
              {errors.email && (
                <span className="absolute left-0 top-full text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* phone */}
            <div className="relative">
              <Label>Phone</Label>
              <Input
                {...register("phone", {
                  required: "required*",
                })}
                disabled={user}
                placeholder="Phone"
              />
              {errors.phone && (
                <span className="absolute left-0 top-full text-sm text-red-600">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* submit */}
            <div
              className={cn({
                "flex items-end sm:col-span-2 md:col-start-3 md:col-end-4 lg:col-span-1":
                  type === "horizontal",
              })}
            >
              <Button className="w-full">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RadioButtons({ control, watch }) {
  return (
    <Controller
      control={control}
      name="enquiry_type"
      render={({ field }) => (
        <RadioGroup
          defaultValue={field.value}
          className="flex items-center justify-start"
          onValueChange={field.onChange}
        >
          {["buy", "sell"].map((type) => (
            <div
              key={type}
              className={cn(
                "flex items-center space-x-2 rounded-xl border p-2 transition-colors",
                {
                  "border-primary/50 bg-primary/20":
                    watch("enquiry_type") === type,
                },
              )}
            >
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type} className="cursor-pointer capitalize">
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
