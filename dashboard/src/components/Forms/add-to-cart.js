"use client";
import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { MainContext } from "@/store/context";
import { Button } from "../ui/button";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}`, data);
};

export default function AddToCart({ id, type }) {
  const queryClient = useQueryClient();
  const { user } = useContext(MainContext);
  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart-items");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleAddToCart = async (id, type) => {
    if (!type) {
      return toast.warning("Please select type!");
    }
    if (!user) return toast.warning("Please login first");
    createMutation.mutate({ product_id: id, item_type: type });
  };
  return (
    <Button variant="primary" onClick={() => handleAddToCart(id, type)}>
      Add to Cart
    </Button>
  );
}
