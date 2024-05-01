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
import { PointForm } from "@/components/Forms/Points";

async function postPoints(data) {
  return http().post(endpoints.points.getAll, data);
}

async function updatePoints(data) {
  return http().put(`${endpoints.points.getAll}/${data.id}`, data);
}

async function deletePoints(data) {
  return http().delete(`${endpoints.points.getAll}/${data.id}`);
}

async function fetchPoints() {
  const { data } = await http().get(endpoints.points.getAll);
  return data;
}

export default function Brands() {
  const [isModal, setIsModal] = useState(false);
  const [type, setType] = useState("");
  const [pointId, setPointId] = useState(null);
  const queryClient = useQueryClient();

  function openModal() {
    setIsModal(true);
  }
  function closeModal() {
    setIsModal(false);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchPoints,
    queryKey: ["points"],
  });

  console.log({ data });

  const createMutation = useMutation(postPoints, {
    onSuccess: () => {
      toast.success("Points added.");
      queryClient.invalidateQueries(["points"]);
    },
    onError: (error) => {
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const updateMutation = useMutation(updatePoints, {
    onSuccess: () => {
      toast.success("Points updated.");
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
    onError: (error) => {
      if (isObject(error)) {
        toast(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const deleteMutation = useMutation(deletePoints, {
    onSuccess: () => {
      toast.success("Points deleted.");
      queryClient.invalidateQueries({ queryKey: ["points"] });
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
    updateMutation.mutate({ ...data, id: pointId });
  };

  const handleDelete = async (id) => {
    deleteMutation.mutate({ id: id });
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
        <Title text={"Points"} />

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
          columns={columns(setType, openModal, setPointId)}
          data={data}
        />
      </div>

      {isModal && (
        <Modal isOpen={isModal} onClose={closeModal}>
          <PointForm
            type={type}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            closeModal={closeModal}
            pointId={pointId}
          />
        </Modal>
      )}
    </div>
  );
}
