"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import CartForm from "@/components/forms/cart/cart";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { H3 } from "@/components/ui/typography";

const createEnquiry = (data) => {
  return http().post(endpoints.enquiries.getAll, data);
};

const fetchTempCart = async () => {
  const { data } = await http().get(endpoints.cart.getAll);
  return data;
};

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart"],
  });

  const createMutation = useMutation(createEnquiry, {
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries(["cart", "cart-items"]);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleCreate = (data) => {
    createMutation.mutate(data);
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="rounded-md p-4">
      <div className="container">
        <CartForm data={data} handleCreate={handleCreate} />
      </div>
    </section>
  );
}
