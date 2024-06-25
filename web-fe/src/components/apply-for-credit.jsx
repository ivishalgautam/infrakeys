"use client";
import { useContext } from "react";
import { MainContext } from "@/store/context";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const applyForCredit = async (data) => {
  return await http().put(`${endpoints.users.getAll}/${data.id}`, data);
};

export default function ApplyForCredit() {
  const router = useRouter();
  const { user } = useContext(MainContext);

  const createMutation = useMutation(applyForCredit, {
    onSuccess: () => {
      toast.success("Successfully applied for credit limit.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleApplyForCredit() {
    if (!user) {
      toast.warning("Please login first!");
      return router.push("/auth/login");
    }

    createMutation.mutate({ id: user.id, channel_financing: "initiated" });
  }

  return <div onClick={handleApplyForCredit}>ApplyForCredit</div>;
}
