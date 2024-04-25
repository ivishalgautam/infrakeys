"use client";
import { MainContext } from "@/store/context";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function Page() {
  const router = useRouter();
  router.push("/");
}
