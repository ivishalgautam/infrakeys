import React, { useEffect } from "react";
import { H5, Muted } from "../../ui/typography";
import { Button } from "../../ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import CartItemTable from "@/components/table/cart-item-table";

const deleteCartItem = ({ id }) => {
  return http().delete(`${endpoints.cart.getAll}/${id}`);
};

export default function SellForm({ data, handleCreate }) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { fields, remove } = useFieldArray({
    control,
    name: "items",
  });

  const deleteMutation = useMutation(deleteCartItem, {
    onSuccess: (data) => {
      const index = fields.findIndex((so) => so._id === data.data.id);
      remove(index);
      toast.success(data.message);
      queryClient.invalidateQueries(["cart-items"]);
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log({ error });
    },
  });

  const handleDelete = ({ id }) => {
    deleteMutation.mutate({ id });
  };

  const onSubmit = (data) => {
    // console.log({ data });
    return;
    handleCreate(Object.assign(data, { enquiry_type: "sell" }));
  };

  useEffect(() => {
    setValue(
      "items",
      data?.map((item) => {
        return { _id: item.id, quantity_type: item.quantity_types[0], ...item };
      }),
    );
  }, [data]);

  return (
    <div className="relative rounded-md border border-primary bg-white p-4 pt-8">
      <H5
        className={
          "absolute -top-4 left-4 inline-block rounded-full bg-primary px-4 py-1 text-white"
        }
      >
        Sell
      </H5>
      {!data?.length ? (
        <Muted>No product added!</Muted>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CartItemTable
            fields={fields}
            register={register}
            errors={errors}
            control={control}
            handleDelete={handleDelete}
          />
          {fields?.length > 0 && (
            <div className="text-end">
              <Button type="submit">Send enquiry</Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
