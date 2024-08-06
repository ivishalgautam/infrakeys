import { MainContext } from "@/store/context";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const fetchTempCart = async () => {
  const { data } = await http().get(endpoints.cart.getAll);
  return data;
};

export default function Cart() {
  const { user, isUserLoading } = useContext(MainContext);
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ["cart-items", pathname],
    queryFn: fetchTempCart,
    enabled: !!user,
  });

  return (
    <Link href={"/cart"}>
      <div className="fixed bottom-10 right-10 z-50 size-12 flex items-center justify-center text-white bg-primary rounded-full">
        <div className="size-6 rounded-full bg-white absolute -top-2 shadow -right-2 text-primary flex items-center justify-center">
          {!isUserLoading && data?.length ? data?.length : "0"}
        </div>
        <ShoppingCart />
      </div>
    </Link>
  );
}
