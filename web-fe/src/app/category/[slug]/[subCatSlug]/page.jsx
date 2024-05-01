import SidebarSubCategoriesWithTypes from "@/components/layout/sidebar-subcategories-with-types";
import ProductTableWithFilter from "@/components/table/product-table-with-filter";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params: { subCatSlug } }) {
  const { data } = (
    await axios.get(`${baseUrl}${endpoints.subCategories.getAll}/${subCatSlug}`)
  )?.data;

  return {
    title: data?.name,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    openGraph: {
      images: data?.image,
    },
  };
}

async function getProductsBySubCategory(slug) {
  const { data } = await axios.get(
    `${baseUrl}${endpoints.products.getAll}/getBySubCategory/${slug}`,
  );
  return data;
}

async function getSubCategoriesByCategory(slug) {
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
