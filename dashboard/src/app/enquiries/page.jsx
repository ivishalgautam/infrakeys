"use client";
import Title from "@/components/Title";
import Spinner from "@/components/Spinner";
import { DataTable } from "./data-table.jsx";
import { columns } from "./columns.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "@/components/Modal.js";
import { EnquiryForm } from "@/components/Forms/Enquiry.js";

async function updateEnquiry(data) {
  return http().put(`${endpoints.enquiries.getAll}/${data.id}`, data);
}

async function deleteEnquiry({ id }) {
  return http().delete(`${endpoints.enquiries.getAll}/${id}`);
}

async function fetchEnquiries() {
  const { data } = await http().get(`${endpoints.enquiries.getAll}`);
  return data;
}

export default function Products() {
  const queryClient = useQueryClient();
  const [enquiryId, setEnquiryId] = useState("");
  const [type, setType] = useState("");
  const [isModal, setIsModal] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchEnquiries,
    queryKey: ["enquiries"],
  });
  function openModal() {
    setIsModal(true);
  }
  function closeModal() {
    setIsModal(false);
  }
  const updateMutation = useMutation(updateEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const deleteMutation = useMutation(deleteEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = async (data) => {
    updateMutation.mutate({ ...data, id: enquiryId });
  };

  const handleDelete = async ({ id }) => {
    deleteMutation.mutate({ id });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return JSON.stringify(error);
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Enquiries"} />
      </div>

      <div>
        <DataTable
          columns={columns(setEnquiryId, setType, handleDelete, openModal)}
          data={data}
        />
      </div>

      {isModal && (
        <Modal isOpen={isModal} onClose={closeModal}>
          <EnquiryForm
            handleUpdate={handleUpdate}
            enquiryId={enquiryId}
            type={type}
          />
        </Modal>
      )}
    </div>
  );
}
