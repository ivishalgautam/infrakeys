"use client";
import PaginationControls from "@/components/PaginationControls";
import ProductsWithFilter from "@/components/products-with-filter";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import ProductTableWithFilter from "@/components/table/product-table-with-filter";
import Spinner from "@/components/Spinner";

const fetchProducts = async () => {
  const url = `${endpoints.products.getAll}`;
  const { data } = await http().get(url);
  return data;
};

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) return <Spinner />;

  console.log({ data });

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <ProductTableWithFilter products={data} />
        </div>
        <div>{/* <PaginationControls total_page={data?.total_page} /> */}</div>
      </div>
    </section>
  );
}
