"use client";
import Title from "@/components/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

async function deletePoints(data) {
  return http().delete(`${endpoints.requirements.getAll}/${data.id}`);
}

async function fetchRequirements() {
  const { data } = await http().get(endpoints.requirements.getAll);
  return data;
}

export default function Brands() {
  const [requirementId, setRequirementId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchRequirements,
    queryKey: ["requirements"],
  });

  const deleteMutation = useMutation(deletePoints, {
    onSuccess: () => {
      toast.success("Points deleted.");
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = async (id) => {
    deleteMutation.mutate({ id: id });
  };

  useEffect(() => {
    const viewDocs = async () => {
      const { data } = await http().get(
        `${endpoints.requirements.getAll}/${requirementId}`
      );
      const docs = data?.docs?.map((doc) => ({
        uri: `${process.env.NEXT_PUBLIC_API_URL}${endpoints.files.getFiles}?file_path=${doc}`,
      }));
      setDocs(docs);
    };

    if (requirementId) {
      viewDocs();
    }
  }, [requirementId]);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error.message ?? "error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"User requirements"} />
      </div>
      <div>
        <DataTable
          columns={columns(setRequirementId, handleDelete)}
          data={data}
        />
      </div>
    </div>
  );
}
