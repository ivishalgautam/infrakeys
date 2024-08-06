"use client";
import Title from "@/components/Title";
import Spinner from "@/components/Spinner";
import { DataTable } from "./data-table.jsx";
import { columns } from "./columns.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { useRouter } from "next/navigation.js";

async function deleteEnquiry({ id }) {
  return http().delete(`${endpoints.enquiries.getAll}/${id}`);
}

async function fetchEnquiries() {
  const { data } = await http().get(`${endpoints.enquiries.getAll}`);
  return data;
}

export default function Products() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["enquiries"],
    queryFn: fetchEnquiries,
  });

  const deleteMutation = useMutation(deleteEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["enquiries"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = async ({ id }) => {
    deleteMutation.mutate({ id });
  };

  const handleNavigate = (href) => {
    router.push(href);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error?.message ?? "error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Enquiries"} />
      </div>

      <div>
        <DataTable
          columns={columns(handleDelete, handleNavigate)}
          data={data}
        />
      </div>
    </div>
  );
}
