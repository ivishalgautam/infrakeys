"use client";
import Title from "@/components/Title";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import ProductTableWithCategoriesAndFilter from "@/components/table/product-table-with-categories-filter";
import Spinner from "@/components/Spinner";

export default function Create() {
  const { data: products, isLoading } = useFetchProducts();
  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input space-y-4">
      <div className="p-2">
        <Title text={"Products"} />
      </div>

      <div>
        <ProductTableWithCategoriesAndFilter products={products} />
      </div>
    </div>
  );
}
