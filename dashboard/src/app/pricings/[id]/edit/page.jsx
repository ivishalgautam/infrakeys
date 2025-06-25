"use client";

import http from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import Section from "@/components/Section.js";
import { useRouter } from "next/navigation";
import { ProductWithPriceForm } from "@/components/Forms/product-with-price.js";

async function updateProduct(id, data) {
  return http().put(`${endpoints.pricings.getAll}/${id}`, data);
}

export default function EditPricingPage({ params: { id } }) {
  const router = useRouter();

  const updateMutation = useMutation((data) => updateProduct(id, data), {
    onSuccess: () => {
      toast.success("Product updated.");
      router.push("/pricings");
    },
    onError: (error) => {
      toast.error(error.message ?? "error creating product!");
    },
  });

  const handleUpdate = async (data) => {
    updateMutation.mutate(data);
  };

  return (
    <Section>
      <ProductWithPriceForm
        type="edit"
        handleUpdate={handleUpdate}
        productId={id}
      />
    </Section>
  );
}
