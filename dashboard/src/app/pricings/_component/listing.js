"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import { DeleteDialog } from "./delete-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { DataTableSkeleton } from "@/components/datatable/data-table-skeleton";
import { DataTable } from "@/components/datatable/data-table";
import toast from "react-hot-toast";

export default function Listing() {
  const [id, setId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [`product-pricings`],
    queryFn: async () => {
      const { data } = await http().get(
        `${endpoints.pricings.getAll}?${searchParamsStr}`
      );
      return data ?? [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }) =>
      await http().delete(`${endpoints.pricings.getAll}/${id}`),
    onSuccess: () => {
      setIsModal(false);
      toast.success("Deleted successfully.");
      queryClient.invalidateQueries([`product-pricings`]);
    },
    onError: (error) => toast.success("Something went wrong."),
  });

  const openModal = () => setIsModal(true);

  useEffect(() => {
    if (!searchParamsStr) {
      const params = new URLSearchParams();
      params.set("page", 1);
      params.set("limit", 10);
      router.replace(`?${params.toString()}`);
    }
  }, [searchParamsStr, router]);

  const handleNavigate = (link) => router.push(link);

  if (isLoading) return <DataTableSkeleton columnCount={4} rowCount={10} />;
  if (isError) return error?.message ?? "error";

  return (
    <div className="w-full rounded-lg border-input">
      <DataTable
        columns={columns(openModal, setId, handleNavigate)}
        data={data?.pricings ?? []}
        totalItems={data?.total ?? 0}
      />
      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isModal}
        setIsOpen={setIsModal}
        id={id}
      />
    </div>
  );
}
