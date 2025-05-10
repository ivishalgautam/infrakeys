"use client";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { CustomerForm } from "@/components/Forms/Customer";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useRouter, useSearchParams } from "next/navigation";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

async function deleteUser(data) {
  return http().delete(`${endpoints.users.getAll}/${data.id}`);
}

const fetchUsers = async (searchParams) => {
  const { data } = await http().get(
    `${endpoints.users.getAll}?${searchParams}`
  );
  return data;
};

export default function Customers() {
  const [type, setType] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", searchParams.toString()],
    queryFn: () => fetchUsers(searchParams.toString()),
  });

  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ throttleMs: "300" })
  );

  const [role, setRole] = useQueryState("role", parseAsString.withDefault(""));

  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success("User deleted.");
      queryClient.invalidateQueries(["users"]);
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

  function downloadCSV() {
    const csvData = data.users;

    const csvString = Papa.unparse(csvData);

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "results.csv");
  }

  // if (isLoading) {
  //   return <Spinner />;
  // }

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
        <div className="flex items-center py-4 gap-2">
          <div className="grow-0">
            <Input
              placeholder="Filter users by name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Select
            onValueChange={(value) => {
              console.log({ value });
              setRole(value);
            }}
            defaultValue={role}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="subadmin">Subadmin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button type="button" onClick={downloadCSV} variant="outline">
            <Download size={15} className="mr-1" />
            Export CSV
          </Button>
          <Button onClick={() => {}}>Reset</Button>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns(
              setType,
              openModal,
              setCustomerId,
              handleCustomerStatus,
              handleNavigate
            )}
            data={data?.users ?? []}
            totalPage={data?.total_pages ?? 0}
          />
        )}
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
