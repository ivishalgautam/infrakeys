"use client";
import StatCard from "@/components/cards/stat-card";
import Chart from "@/components/Chart";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

async function fetchRecords() {
  const { data } = await http().get(endpoints.dashboard.getAll);
  return data;
}

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchRecords,
    queryKey: ["dashboard"],
  });

  if (isLoading) return <Spinner />;
  if (isError) return error?.message ?? "error";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {data &&
          Object.keys(data?.products)?.map((status, ind) => (
            <StatCard
              key={ind}
              status={status}
              count={data?.products[status]}
            />
          ))}
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
}
