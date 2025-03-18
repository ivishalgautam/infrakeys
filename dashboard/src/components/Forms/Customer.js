"use client";
import React, { useEffect, useState } from "react";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Controller, useForm } from "react-hook-form";
import Title from "../Title";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaRegEye } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";

import "react-phone-number-input/style.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Spinner from "../Spinner";

export function CustomerForm({
  type,
  handleCreate,
  handleUpdate,
  handleDelete,
  customerId,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    cpassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    if (type === "delete") {
      return handleDelete({ id: customerId });
    }

    const payload = {
      role: data.role,
      name: data.name,
      phone: data.phone,
      email: data.email,
      username: data.username,
      password: data.password,
      company_name: data.company_name,
    };

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    }

    // reset();
  };

  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.users.getAll}/${customerId}`
        );
        data && setValue("role", data?.role);
        data && setValue("name", data?.name);
        data && setValue("phone", data?.phone);
        data && setValue("email", data?.email);
        data && setValue("username", data?.username);
        data && setValue("company_name", data?.company_name);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId && (type === "edit" || type === "view")) {
      fetchData();
    }
  }, [customerId, type]);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl">
      <div className="space-y-4">
        {type !== "delete" ? (
          <div className="space-y-4">
            {/* title */}
            <div className="">
              <Title
                text={
                  type === "create"
                    ? "Create customer"
                    : type === "view"
                      ? "Customer details"
                      : type === "edit"
                        ? "Edit customer"
                        : "Are you sure you want to delete"
                }
              />
            </div>

            {/* product info */}
            <div className="bg-white p-8 rounded-lg border-input shadow-lg space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {/* role */}
                <div>
                  <Label htmlFor="name">Role</Label>
                  <Controller
                    control={control}
                    name="role"
                    rules={{ required: "required*" }}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>ROLES</SelectLabel>
                            <SelectItem value="user">Customer</SelectItem>
                            <SelectItem value="subadmin">Sub Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <span className="text-red-600">{errors.role.message}</span>
                  )}
                </div>

                {/* name */}
                <div>
                  <Label htmlFor="name">Fullname</Label>
                  <Input
                    type="text"
                    disabled={type === "view" || type === "delete"}
                    placeholder="Enter Fullname"
                    {...register("name", {
                      required: "required",
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                  )}
                </div>

                {/* phone */}
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    {...register("phone", {
                      required: "required",
                    })}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <span className="text-red-600">{errors.phone.message}</span>
                  )}
                </div>

                {/* email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    disabled={type === "view" || type === "delete"}
                    placeholder="Email"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                  )}
                </div>

                {/* company name */}
                <div>
                  <Label htmlFor="company_name">Company name</Label>
                  <Input
                    type="text"
                    disabled={type === "view" || type === "delete"}
                    placeholder="Enter company name"
                    {...register("company_name")}
                  />
                  {errors.company_name && (
                    <span className="text-red-600">
                      {errors.company_name.message}
                    </span>
                  )}
                </div>

                {/* username */}
                {watch("role") === "subadmin" && (
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      type="text"
                      disabled={type === "view" || type === "delete"}
                      placeholder="Username"
                      {...register("username", {
                        required: "required",
                      })}
                    />
                    {errors.username && (
                      <span className="text-red-600">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                )}

                {type === "edit" && watch("role") === "subadmin" && (
                  <div className="col-span-3 flex items-center justify-start mt-4 gap-2">
                    <Label htmlFor="change_password">Change password</Label>
                    <Controller
                      name="change_password"
                      control={control}
                      render={({ field }) => (
                        <Checkbox onCheckedChange={field.onChange} />
                      )}
                    />
                  </div>
                )}

                {/* passwords */}
                {(type === "create" || watch("change_password")) &&
                  watch("role") === "subadmin" && (
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            type={showPasswords.password ? "text" : "password"}
                            disabled={type === "view" || type === "delete"}
                            placeholder="Password"
                            {...register("password", {
                              required: "required",
                            })}
                          />
                          <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                password: !prev.password,
                              }))
                            }
                          >
                            <FaRegEye />
                          </div>
                        </div>
                        {errors.password && (
                          <span className="text-red-600">
                            {errors.password.message}
                          </span>
                        )}
                      </div>

                      {/* confirm password */}
                      <div className="relative">
                        <Label htmlFor="confirm_password">
                          Confirm password
                        </Label>
                        <div className="relative">
                          <Input
                            type={showPasswords.cpassword ? "text" : "password"}
                            disabled={type === "view" || type === "delete"}
                            placeholder="Confirm password"
                            {...register("confirm_password", {
                              required: "required",
                              validate: (val) => {
                                if (watch("password") != val) {
                                  return "Your passwords do not match";
                                }
                              },
                            })}
                          />
                          <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                cpassword: !showPasswords.cpassword,
                              }))
                            }
                          >
                            <FaRegEye />
                          </div>
                        </div>
                        {errors.confirm_password && (
                          <span className="text-red-600">
                            {errors.confirm_password.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
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
