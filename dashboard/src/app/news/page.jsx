"use client";
import Title from "@/components/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { buttonVariants } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function deleteNews(data) {
  return http().delete(`${endpoints.news.getAll}/${data.id}`);
}

async function fetchNews() {
  return await http().get(endpoints.news.getAll);
}

export default function NewsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchNews,
    queryKey: ["news"],
  });

  const deleteMutation = useMutation(deleteNews, {
    onSuccess: () => {
      toast.success("News deleted.");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error) => {
      toast.error(error.message ?? "error");
    },
  });

  const handleDelete = async (id) => {
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      deleteMutation.mutate({ id: id });
    }
  };

  const handleNavigate = (href) => {
    router.push(href);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) return error?.message ?? "error";

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"news"} />

        <Link className={buttonVariants("default")} href={"/news/create"}>
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
