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

async function createBlog(data) {
  return http().post(endpoints.news.getAll, data);
}

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
      toast.success("News created.");
      router.push("/news");
    },
    onError: (error) => {
      toast.error(error.message ?? "error creating blog!");
    },
  });

  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };

  return (
    <Section>
      <NewsForm type={"create"} handleCreate={handleCreate} />
    </Section>
  );
}
