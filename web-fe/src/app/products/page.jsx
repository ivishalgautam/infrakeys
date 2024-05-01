"use client";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "@/components/Spinner";
import ProductTableWithCategoriesAndFilter from "@/components/table/product-table-with-categories-filter";

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

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <ProductTableWithCategoriesAndFilter products={data} />
        </div>
        <div>{/* <PaginationControls total_page={data?.total_page} /> */}</div>
      </div>
    </section>
  );
}
