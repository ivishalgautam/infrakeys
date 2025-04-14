"use client";
import { CategoryForm } from "@/components/Forms/Category";
import Section from "@/components/Section";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NewsCategoryForm } from "@/components/Forms/news-category";

async function postCategory(data) {
  return http().post(endpoints.newsCategories.getAll, data);
}

export default function NewCategoryCreatePage() {
  const queryClient = useQueryClient();
  const createMutation = useMutation(postCategory, {
    onSuccess: () => {
      toast.success("New category added.");
      queryClient.invalidateQueries(["news-categories"]);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error creating category");
    },
  });

  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };
  return (
    <Section>
      <NewsCategoryForm type={"create"} handleCreate={handleCreate} />
    </Section>
  );
}
