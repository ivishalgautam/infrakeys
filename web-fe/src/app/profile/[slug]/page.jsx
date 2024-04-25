"use client";
import React from "react";
import { H4 } from "@/components/ui/typography";
import ProfileForm from "@/components/forms/profile";
import Tracking from "@/components/Tracking";
import ProfileLayout from "@/components/layout/profile-layout";
import Orders from "@/components/Orders";

export default function Page({ params: { slug } }) {
  return (
    <ProfileLayout>
      {slug === "enquiries" && (
        <div className="space-y-4 rounded-lg border p-4">
          <H4>Enquiries</H4>
          <Tracking />
        </div>
      )}
      {slug === "orders" && (
        <div className="space-y-4 rounded-lg border p-4">
          <H4>orders</H4>
          <Orders />
        </div>
      )}
      {slug === "details" && (
        <div className="rounded-lg border p-4">
          <H4>details</H4>
        </div>
      )}
      {slug === "profile" && <ProfileForm />}
    </ProfileLayout>
  );
}
