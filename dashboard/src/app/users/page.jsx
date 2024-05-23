"use client";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { CustomerForm } from "@/components/Forms/Customer";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useRouter } from "next/navigation";

async function deleteUser(data) {
  return http().delete(`${endpoints.users.getAll}/${data.id}`);
}

export default function Customers() {
  const [type, setType] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError, error } = useFetchUsers();
  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success("User deleted.");
      queryClient.invalidateQueries("users");
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message ?? "error");
    },
  });

  const handleDelete = async (data) => {
    deleteMutation.mutate(data);
  };

  const handleNavigate = (href) => {
    router.push(href);
  };

  async function handleCustomerStatus(customerId, status) {
    try {
      const response = await http().put(
        `${endpoints.users.getAll}/${customerId}`,
        { is_active: status }
      );
      toast.success(response.message);
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error?.message ?? "error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Users"} />
        <Button asChild>
          <Link href={"/users/create"}>Create</Link>
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns(
            setType,
            openModal,
            setCustomerId,
            handleCustomerStatus,
            handleNavigate
          )}
          data={data}
        />
      </div>

      {isModal && (
        <Modal onClose={closeModal} isOpen={isModal}>
          <CustomerForm
            type={type}
            handleDelete={handleDelete}
            closeModal={closeModal}
            customerId={customerId}
          />
        </Modal>
      )}
    </div>
  );
}
