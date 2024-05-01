"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Title from "../Title";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import ReactSelect from "react-select";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import Spinner from "../Spinner";

export function PointForm({
  type,
  handleCreate,
  handleUpdate,
  handleDelete,
  closeModal,
  pointId,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: customers } = useFetchUsers("user");
  const [isLoading, setIsLoading] = useState(false);

  const formattedCustomers = useMemo(
    () =>
      customers?.map(({ name, id, phone }) => ({
        label: `${name} (+91${phone})`,
        value: id,
      })),
    [customers]
  );

  const onSubmit = (data) => {
    const payload = {
      user_id: data.user_id.value,
      points: data.points,
    };

    if (type === "create") {
      handleCreate(payload);
    } else if (type === "edit") {
      handleUpdate(payload);
    } else if (type === "delete") {
      handleDelete(pointId);
    }
    closeModal();
  };

  useEffect(() => {
    // Fetch data from API and populate the form with prefilled values
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await http().get(
          `${endpoints.points.getAll}/${pointId}`
        );

        data &&
          formattedCustomers &&
          setValue(
            "user_id",
            formattedCustomers.find((so) => so.value === data?.user_id)
          );
        data && setValue("points", data?.points);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (pointId && (type === "edit" || type === "view" || type === "delete")) {
      fetchData();
    }
  }, [pointId, type, formattedCustomers]);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl">
      <div className="space-y-4 p-2">
        <Title
          text={
            type === "create"
              ? "Add points"
              : type === "view"
                ? "Point details"
                : type === "edit"
                  ? "Edit points"
                  : "Are you sure you want to delete"
          }
        />

        {/* user id */}
        <div>
          <Label htmlFor="user_id">Customers</Label>
          <Controller
            control={control}
            rules={{ required: "select a customer" }}
            name="user_id"
            render={({ field: { onChange, value } }) => (
              <ReactSelect
                options={formattedCustomers}
                defaultValue={value}
                onChange={onChange}
              />
            )}
          />
          {errors.user_id && (
            <span className="text-red-600">{errors.user_id.message}</span>
          )}
        </div>

        {/* points */}
        <div>
          <Label htmlFor="name">Points</Label>
          <Input
            type="number"
            disabled={type === "view" || type === "delete"}
            placeholder="Enter points"
            {...register("points", {
              required: "required*",
              valueAsNumber: true,
            })}
          />
          {errors.points && (
            <span className="text-red-600">{errors.points.message}</span>
          )}
        </div>

        <div className="text-right">
          {type !== "view" && (
            <Button variant={type === "delete" ? "destructive" : "default"}>
              {type === "create"
                ? "Create"
                : type === "edit"
                  ? "Update"
                  : "Delete"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
