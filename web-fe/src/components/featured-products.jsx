"use client";
import ProductCard from "./cards/product";
import { H3, P } from "./ui/typography";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import axios from "axios";

const fetchProducts = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(
    `${baseUrl}${endpoints.products.getAll}?featured=true`,
  );

  return data?.data;
};

export default function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="pb-10">
      <div className="container space-y-4 pt-16">
        <H3 className={"border-b pb-4"}>
          <span className="border-b-2 border-primary py-3">Featured </span>
          products
        </H3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {!data?.length ? (
            <P>Not found!</P>
          ) : (
            data?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
