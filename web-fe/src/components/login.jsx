"use client";
import LoginForm from "@/components/forms/login";
import OTPForm from "@/components/forms/otp";
import AuthLayout from "@/components/layout/auth-layout";
import { useState } from "react";

export default function Login({ className }) {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  return (
    <AuthLayout className={className}>
      {!isOtpSent ? (
        <LoginForm setIsOtpSent={setIsOtpSent} setPhone={setPhone} />
      ) : (
        <OTPForm phone={phone} />
      )}
    </AuthLayout>
  );
}
