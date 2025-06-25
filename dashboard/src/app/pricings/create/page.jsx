"use client";

import http from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import Section from "@/components/Section.js";
import { useRouter } from "next/navigation";
import { ProductWithPriceForm } from "@/components/Forms/product-with-price.js";

async function createProduct(data) {
  return http().post(endpoints.pricings.getAll, data);
}

export default function Create() {
  const router = useRouter();

  const createMutation = useMutation(createProduct, {
    onSuccess: () => {
      toast.success("Product created.");
      router.push("/pricings");
    },
    onError: (error) => {
      toast.error(error.message ?? "error creating product!");
    },
  });

  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };

  return (
    <Section>
      <ProductWithPriceForm type="create" handleCreate={handleCreate} />
    </Section>
  );
}
