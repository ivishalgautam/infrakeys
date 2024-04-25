"use client";
import Title from "@/components/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import Spinner from "@/components/Spinner";
import { isObject } from "@/utils/object";
import { toast } from "sonner";
import { SubCatTypeForm } from "@/components/Forms/SubCatType";

async function postSubCatType(data) {
  return http().post(endpoints.sub_category_types.getAll, data);
}

async function updateSubCatType(data) {
  return http().put(`${endpoints.sub_category_types.getAll}/${data.id}`, data);
}

async function deleteSubCatType(data) {
  return http().delete(`${endpoints.sub_category_types.getAll}/${data.id}`);
}

async function fetchSubCatTypes() {
  return http().get(endpoints.sub_category_types.getAll);
}

export default function Brands() {
  const [isModal, setIsModal] = useState(false);
  const [type, setType] = useState("");
  const [brandId, setBrandId] = useState(null);
  const queryClient = useQueryClient();

  function openModal() {
    setIsModal(true);
  }
  function closeModal() {
    setIsModal(false);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchSubCatTypes,
    queryKey: ["subCategoryTypes"],
  });

  const createMutation = useMutation(postSubCatType, {
    onSuccess: () => {
      toast.success("Type added.");
      queryClient.invalidateQueries("subCategoryTypes");
    },
    onError: (error) => {
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const updateMutation = useMutation(updateSubCatType, {
    onSuccess: () => {
      toast.success("Type updated.");
      queryClient.invalidateQueries({ queryKey: ["subCategoryTypes"] });
    },
    onError: (error) => {
      if (isObject(error)) {
        toast(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const deleteMutation = useMutation(deleteSubCatType, {
    onSuccess: () => {
      toast.success("Type deleted.");
      queryClient.invalidateQueries({ queryKey: ["subCategoryTypes"] });
    },
    onError: (error) => {
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };

  const handleUpdate = async (data) => {
    updateMutation.mutate({ ...data, id: brandId });
  };

  const handleDelete = async (id) => {
    deleteMutation.mutate({ id: id });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error.message;
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Sub Category Types"} />

        <Button
          onClick={() => {
            setType("create");
            openModal();
          }}
        >
          Create
        </Button>
      </div>
      <div>
        <DataTable
          columns={columns(setType, openModal, setBrandId)}
          data={data?.data?.map(({ id, name }) => ({ id, name }))}
        />
      </div>

      {isModal && (
        <Modal isOpen={isModal} onClose={closeModal}>
          <SubCatTypeForm
            type={type}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            closeModal={closeModal}
            brandId={brandId}
          />
        </Modal>
      )}
    </div>
  );
}
