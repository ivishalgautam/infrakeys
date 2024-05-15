"use client";
import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { MainContext } from "@/store/context";
import { Button } from "../ui/button";
import { removeEmptyKeys } from "@/lib/removeEmptyKeys";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}`, data);
};

export default function AddToCart({ id, type, filters }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useContext(MainContext);
  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("cart-items");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleAddToCart = async (e, id, type) => {
    e.stopPropagation();

    if (!user) {
      toast.warning("Please login first");
      return router.push("/auth/login");
    }

    if (!type) {
      return toast.warning("Please select type!");
    }

    createMutation.mutate({
      product_id: id,
      item_type: type,
      filters: removeEmptyKeys(filters),
    });
  };

  return (
    <Button variant="primary" onClick={(e) => handleAddToCart(e, id, type)}>
      <ShoppingCart size={16} /> &nbsp; Add
    </Button>
  );
}
