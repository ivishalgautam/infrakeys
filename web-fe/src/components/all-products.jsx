"use client";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import React from "react";
import PaginationControls from "./PaginationControls";
import ProductCard from "./cards/product";

export default function AllProducts() {
  const { data } = useFetchProducts();
  return (
    <section className="py-4">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {data?.data?.map(({ id, pictures, slug, title }) => (
            <ProductCard
              key={id}
              image={pictures[0]}
              slug={slug}
              title={title}
            />
          ))}
        </div>
        <div>
          <PaginationControls total_page={data?.total_page} />
        </div>
      </div>
    </section>
  );
}
