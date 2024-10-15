"use client";
import Section from "@/components/Section";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoryVariantForm } from "@/components/Forms/category-variant";
import { useRouter } from "next/navigation";

async function updateCategory(data) {
  return http().put(`${endpoints.categories.getAll}/${data.id}`, data);
}

export default function Page({ params: { id } }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const updateMutation = useMutation(updateCategory, {
    onSuccess: ({ data }) => {
      console.log({ data });
      toast.success("Category updated.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push(`/categories/variant/${data.category_id}`);
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
      <CategoryVariantForm
        type={"edit"}
        handleUpdate={handleUpdate}
        categoryVariantId={id}
      />
    </Section>
  );
}
