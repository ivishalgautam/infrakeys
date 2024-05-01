"use client";
import OTPForm from "@/components/forms/otp";
import SignUpForm from "@/components/forms/signup";
import AuthLayout from "@/components/layout/auth-layout";
import React from "react";
import { useState } from "react";

export default function Signin() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  return (
    <AuthLayout>
      {!isOtpSent ? (
        <SignUpForm setIsOtpSent={setIsOtpSent} setPhone={setPhone} />
      ) : (
        <OTPForm phone={phone} />
      )}
    </AuthLayout>
  );
}
