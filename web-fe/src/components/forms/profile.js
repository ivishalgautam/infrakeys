"use client";
import { MainContext } from "@/store/context";
import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { H4 } from "../ui/typography";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { DatePicker } from "../ui/date-picker";
import moment from "moment";

const update = async (data) => {
  return await http().put(`${endpoints.users.getAll}/${data.id}`, data);
};

export default function ProfileForm() {
  const { user } = useContext(MainContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      birth_date: user?.birth_date,
      email: user?.email,
      mobile_number: user?.mobile_number,
    },
  });

  const updateMutation = useMutation(update, {
    onSuccess: () => {
      toast.success("Update successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: data.birth_date,
      email: data.email,
      mobile_number: data.mobile_number,
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
          <div>
            <Label>Firstname</Label>
            <Input
              type="text"
              {...register("first_name", { required: "required" })}
              placeholder="Firstname"
            />
            {errors.first_name && (
              <span className="text-red-600">{errors.first_name.message}</span>
            )}
          </div>

          <div>
            <Label>Lastname</Label>
            <Input
              type="text"
              {...register("last_name", { required: "required" })}
              placeholder="Lastname"
            />
            {errors.last_name && (
              <span className="text-red-600">{errors.last_name.message}</span>
            )}
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", { required: "required" })}
              placeholder="Email"
              disabled
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div>
            <Label>Mobile number</Label>
            <Input
              type="number"
              {...register("mobile_number", {
                required: "required",
                valueAsNumber: true,
              })}
              placeholder="Mobile number"
            />
            {errors.mobile_number && (
              <span className="text-red-600">
                {errors.mobile_number.message}
              </span>
            )}
          </div>
        </div>

        {/* button */}
        <Button>Update</Button>
      </div>
    </form>
  );
}
