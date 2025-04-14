"use client";
import BlogForm from "@/components/Forms/blog";
import NewsForm from "@/components/Forms/news";
import Section from "@/components/Section";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

async function updateBlog(data) {
  return http().put(`${endpoints.news.getAll}/${data.id}`, data);
}

export default function Page({ params: { id } }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation(updateBlog, {
    onSuccess: () => {
      toast.success("News updated.");
      queryClient.invalidateQueries({ queryKey: ["news"] });
      router.push("/news");
    },
    onError: (error) => {
      toast.error(error.message ?? "error updating news");
    },
  });

  const handleUpdate = async (data) => {
    updateMutation.mutate({ ...data, id: id });
  };
  return (
    <Section>
      <NewsForm type={"edit"} newsId={id} handleUpdate={handleUpdate} />
    </Section>
  );
}
