"use client";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import Spinner from "@/components/Spinner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

async function deleteProduct({ id }) {
  return http().delete(`${endpoints.products.getAll}/${id}`);
}

const fetchProducts = async (page = 1, limit = 10) => {
  return await http().get(
    `${endpoints.products.getAll}/dashboard/getAll?page=${page}&limit=${limit}`
  );
};

export default function Products() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchProducts(page, limit),
    queryKey: ["products", page, limit],
  });
  const router = useRouter();

  // console.log({ paginatedproducts: data, searchParams });

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted.");
    },
    onError: (error) => {
      toast.error(error.message ?? "error deleting product!");
    },
  });

  const handleDelete = async (id) => {
    deleteMutation.mutate({ id });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error?.message ?? "Error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Products"} />
        <Button asChild>
          <Link href={"/products/create"}>Create</Link>
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns(handleDelete, router)}
          data={data?.data}
          total_page={data?.total_page}
        />
      </div>
    </div>
  );
}
