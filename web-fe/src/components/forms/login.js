"use client";

import React, { useState } from "react";
import { H1, P } from "../ui/typography";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Link from "next/link";
import { useForm } from "react-hook-form";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { isObject } from "@/utils/object";
import { toast } from "sonner";

export default function LoginForm({
  setIsOtpSent,
  setPhone,
  requestId,
  setRequestId,
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function loginUser(credentials) {
    setLoading(true);
    try {
      const response = await http().post(`${endpoints.otp.send}`, credentials);
      setIsOtpSent(true);
      setRequestId(response.request_id);
    } catch (error) {
      if (isObject(error)) {
        return toast.error(error.message);
      } else {
        return toast.error("Unable to complete your request.");
      }
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data) => {
    setPhone(data.phone);
    await loginUser(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center justify-start p-8">
        <div className="w-full space-y-6">
          <div className="relative mb-8 before:absolute before:-bottom-5 before:left-0 before:h-1.5 before:w-20 before:bg-black">
            <H1>Login</H1>
          </div>

          {/* phone */}
          <div>
            <Label>Phone</Label>
            <Input
              type="number"
              {...register("phone", {
                required: "required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder="Enter your phone"
              className="mt-2 rounded-full bg-gray-100 px-4 py-6"
            />
            {errors.phone && (
              <span className="text-sm text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <Button className="rounded-full px-12 py-6">
              {loading && (
                <span className="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white/30 border-t-white"></span>
              )}
              LOGIN
            </Button>
          </div>

          <div className="translate-y-4">
            <P className={"text-center text-sm font-medium tracking-wide"}>
              Do not have an account?{" "}
              <Link href={"/auth/signup"} className="text-primary">
                Sign up
              </Link>
            </P>
          </div>
        </div>
      </div>
    </form>
  );
}
