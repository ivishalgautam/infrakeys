"use client";
import Section from "@/components/Section";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoryVariantForm } from "@/components/Forms/category-variant";
import { useRouter } from "next/navigation";

async function postCategory(data) {
  return http().post(endpoints.categories.getAll, data);
}

export default function Page({ params: { id } }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const createMutation = useMutation(postCategory, {
    onSuccess: () => {
      toast.success("New category added.");
      queryClient.invalidateQueries([`categories-${id}`, id]);
      router.replace(`/categories/variant/${id}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error creating category1");
    },
  });

  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };

  return (
    <Section>
      <CategoryVariantForm
        type={"create"}
        handleCreate={handleCreate}
        categoryId={id}
      />
    </Section>
  );
}
