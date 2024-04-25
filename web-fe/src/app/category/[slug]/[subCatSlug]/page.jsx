import SidebarSubCategoriesWithTypes from "@/components/layout/sidebar-subcategories-with-types";
import ProductTableWithFilter from "@/components/table/product-table-with-filter";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import React from "react";

async function getProductsBySubCategory(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(
    `${baseUrl}${endpoints.products.getAll}/getBySubCategory/${slug}`,
  );
  return data;
}

async function getSubCategoriesByCategory(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(
    `${baseUrl}${endpoints.subCategories.getAll}/getByCategory/${slug}`,
  );
  return data;
}

export default async function Page({ params: { slug: catSlug, subCatSlug } }) {
  const { data: products } = await getProductsBySubCategory(subCatSlug);
  const { data } = await getSubCategoriesByCategory(catSlug);

  return (
    <div className="container space-y-8 py-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 rounded-lg bg-white p-2">
          <SidebarSubCategoriesWithTypes
            data={data}
            subCatSlug={subCatSlug}
            catSlug={catSlug}
          />
        </div>
        <div className="col-span-4">
          <ProductTableWithFilter products={products} />
        </div>
      </div>
    </div>
  );
}
