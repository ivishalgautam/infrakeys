"use client";
import Title from "@/components/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Modal from "@/components/Modal";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { CategoryForm } from "@/components/Forms/Category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "@/components/Spinner";
import { isObject } from "@/utils/object";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function deleteCategory(data) {
  return http().delete(`${endpoints.newsCategories.getAll}/${data.id}`);
}

async function fetchCategories() {
  const { data } = await http().get(endpoints.newsCategories.getAll);
  return data;
}

export default function NewsCategories() {
  const queryClient = useQueryClient();
  const router = useRouter();

  function openModal() {
    setIsModal(true);
  }
  function closeModal() {
    setIsModal(false);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["categories"],
  });

  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success("Category deleted.");
      queryClient.invalidateQueries(["categories"]);
      closeModal();
    },
    onError: (error) => {
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const handleDelete = async (id) => {
    deleteMutation.mutate({ id: id });
  };

  const handleNavigate = (href) => {
    router.push(href);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    toast.error(error.message ?? "error");
    return "error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Categories"} />

        <Link
          className={buttonVariants("default")}
          href={"/news-categories/create"}
        >
          Create
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns(handleDelete, handleNavigate)}
          data={data?.map((category) => category)}
        />
      </div>
    </div>
  );
}
