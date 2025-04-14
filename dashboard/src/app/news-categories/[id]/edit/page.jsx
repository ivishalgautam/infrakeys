"use client";
import { CategoryForm } from "@/components/Forms/Category";
import Section from "@/components/Section";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NewsCategoryForm } from "@/components/Forms/news-category";

async function updateCategory(data) {
  return http().put(`${endpoints.newsCategories.getAll}/${data.id}`, data);
}

export default function NewsCategoryEditPage({ params: { type, id } }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success("Category updated.");
      queryClient.invalidateQueries({ queryKey: ["news-categories"] });
      router.push("/news-categories");
    },
    onError: (error) => {
      if (isObject(error)) {
        toast(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const handleUpdate = async (data) => {
    updateMutation.mutate({ ...data, id: id });
  };
  return (
    <Section>
      <NewsCategoryForm
        type={"edit"}
        categoryId={id}
        handleUpdate={handleUpdate}
      />
    </Section>
  );
}
