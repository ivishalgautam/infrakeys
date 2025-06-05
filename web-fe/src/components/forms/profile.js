"use client";
import { MainContext } from "@/store/context";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { H4 } from "../ui/typography";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";

const update = async (data) => {
  return await http().put(`${endpoints.users.getAll}/${data.id}`, data);
};

export default function ProfileForm({
  completeProfile = false,
  callback = () => null,
}) {
  const { user } = useContext(MainContext);
  console.log({ user });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      company_name: user?.company_name,
    },
  });

  const values = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    company_name: user?.company_name,
  };

  const updateMutation = useMutation(update, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Update successfully.");
      callback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company_name: data.company_name,
    };

    handleUpdate(payload);
  };

  function handleUpdate(data) {
    updateMutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 rounded-lg border p-4">
        <H4>Account details</H4>

        <div className="space-y-2">
          {(!completeProfile || (completeProfile && !values.name)) && (
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                {...register("name", { required: "required" })}
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>
          )}

          {(!completeProfile || (completeProfile && !values.email)) && (
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>
          )}

          {(!completeProfile || (completeProfile && !values.phone)) && (
            <div>
              <Label>Phone</Label>
              <Input
                type="number"
                {...register("phone", {
                  required: "required",
                  valueAsNumber: true,
                })}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <span className="text-red-600">{errors.phone.message}</span>
              )}
            </div>
          )}

          {(!completeProfile || (completeProfile && !values.company_name)) && (
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                {...register("company_name", { required: "required" })}
                placeholder="Enter your company name"
              />
              {errors.company_name && (
                <span className="text-red-600">
                  {errors.company_name.message}
                </span>
              )}
            </div>
          )}
        </div>

        {/* button */}
        <Button disabled={updateMutation.isLoading}>
          {updateMutation.isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
