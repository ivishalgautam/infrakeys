"use client";
import React, { useContext, useEffect } from "react";
import { H3 } from "../ui/typography";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
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
import { Textarea } from "../ui/textarea";

const createQuery = async (data) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: response } = await axios.post(
    `${baseUrl}${endpoints.queries.getAll}`,
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
      company: "",
      company_gst: "",
      pincode: "",
      email: "",
      phone: "",
      name: "",
      message: "",
      type: enquirytype,
    },
  });
  const [quantityTypes, setQuantityTypes] = useState([]);

  const createMutation = useMutation(createQuery, {
    onSuccess: (data) => {
      toast.success("Enquiry sent");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    // console.log({ data });
    const payload = {
      company: data?.company,
      company_gst: data?.company_gst,
      pincode: data?.pincode,
      email: data?.email,
      phone: data?.phone,
      type: data?.type,
      message: data?.message,
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
      setValue("email", user.email);
      setValue("name", user.name);
    }
  }, [user]);

  useEffect(() => {
    if (products && productId) {
      setValue("product_id", productId);
    }
  }, [products, productId]);

  return (
    <div
      className={cn(
        "space-y-4 rounded-lg border border-primary bg-white p-4 shadow-md",
        {
          "w-full pt-6 sm:w-96": type === "vertical",
        },
      )}
    >
      <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
        <H3>Tell Us Your Query</H3>
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

          <div className="space-y-4">
            <div
              className={cn("grid grid-cols-1 gap-2", {
                "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5":
                  type === "horizontal",
              })}
            >
              {/* name */}
              <div className="relative">
                <Label>Name</Label>
                <Input
                  {...register("name", { required: "required*" })}
                  placeholder="Enter name"
                  disabled={user}
                />
                {errors.name && (
                  <span className="absolute left-0 top-full text-sm text-red-600">
                    {errors.name.message}
                  </span>
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
              {watch("type") === "sell" ? (
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
                  disabled={watch("email") && user}
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
            </div>

            <div>
              <Label>Query</Label>
              <Textarea
                {...register("message", { required: "required*" })}
                placeholder="Enter your query"
              />
            </div>

            {/* submit */}
            <div className={"text-end"}>
              <Button variant="primary">Submit</Button>
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
      name="type"
      render={({ field }) => (
        <RadioGroup
          defaultValue={field.value}
          className="flex items-center justify-start"
          onValueChange={field.onChange}
        >
          {["buy", "sell"].map((type) => (
            <Label
              htmlFor={type}
              key={type}
              className={cn(
                "flex cursor-pointer items-center gap-1 space-x-2 rounded-xl border p-2 capitalize transition-colors",
                {
                  "border-primary/50 bg-primary/20": watch("type") === type,
                },
              )}
            >
              <RadioGroupItem value={type} id={type} />
              {type}
            </Label>
          ))}
        </RadioGroup>
      )}
    />
  );
}
