"use client";
import OTPForm from "@/components/forms/otp";
import SignUpForm from "@/components/forms/signup";
import AuthLayout from "@/components/layout/auth-layout";
import React from "react";
import { useState } from "react";

export default function Signin() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(null);

  const [requestId, setRequestId] = useState(null);

  return (
    <AuthLayout>
      {!isOtpSent ? (
        <SignUpForm
          setIsOtpSent={setIsOtpSent}
          setPhone={setPhone}
          requestId={requestId}
          setRequestId={setRequestId}
          name={name}
          setName={setName}
        />
      ) : (
        <OTPForm
          phone={phone}
          requestId={requestId}
          setRequestId={setRequestId}
          name={name}
          setName={setName}
        />
      )}
    </AuthLayout>
  );
}
