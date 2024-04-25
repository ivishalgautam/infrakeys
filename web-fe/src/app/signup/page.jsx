import { SignUpForm } from "@/components/forms/signup";
import AuthLayout from "@/components/layout/auth-layout";
import React from "react";

export default function Signin() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
