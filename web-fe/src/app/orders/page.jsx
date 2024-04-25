"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "@/components/Spinner";

async function fetchOrders() {
  return await http().get(`${endpoints.orders.getAll}`);
}

export default function Orders() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchOrders,
    queryKey: ["orders"],
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return JSON.stringify(error);
  }

  return (
    <div className="mt-5 rounded-lg border-input bg-white">
      <DataTable columns={columns()} data={data?.data} />
    </div>
  );
}
