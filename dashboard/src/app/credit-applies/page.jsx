"use client";
import Title from "@/components/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Modal from "@/components/Modal";
import { useState } from "react";
import QueryForm from "@/components/Forms/Query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import ApplyForCreditForm from "@/components/Forms/apply-for-credit";

async function deleteApplyCredit({ id }) {
  return await http().delete(`${endpoints.creditApplies.getAll}/${id}`);
}

async function fetchCreditApplies() {
  return await http().get(endpoints.creditApplies.getAll);
}

export default function Queries() {
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState(null);
  const queryClient = useQueryClient();

  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchCreditApplies,
    queryKey: ["creditApplies"],
  });

  const deleteMutation = useMutation(deleteApplyCredit, {
    onSuccess: () => {
      toast.success("Credit apply deleted.");
      queryClient.invalidateQueries({ queryKey: ["creditApplies"] });
    },
    onError: (error) => {
      toast.error(error.message ?? "error");
    },
  });

  const handleDelete = async (id) => {
    const confirmation = confirm("Are you sure?");
    if (!confirmation) return;
    deleteMutation.mutate({ id });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error.message ?? "error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Credit Applies"} />
      </div>

      <div>
        <DataTable
          columns={columns(openModal, setId, handleDelete)}
          data={data}
        />
      </div>

      {isModal && (
        <Modal isOpen={isModal} onClose={closeModal}>
          <ApplyForCreditForm id={id} />
        </Modal>
      )}
    </div>
  );
}
