import SidebarSubCategoriesWithTypes from "@/components/layout/sidebar-subcategories-with-types";
import SubCategoriesSheet from "@/components/sub-categories-sheet";
import ProductTableWithFilter from "@/components/table/product-table-with-filter";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params: { slug, subCatSlug } }) {
  const { data } = (
    await axios.get(`${baseUrl}${endpoints.subCategories.getAll}/${subCatSlug}`)
  )?.data;

  return {
    title: data?.meta_title ?? data?.name,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${slug}/${subCatSlug}`,
    },
    openGraph: {
      title: data?.meta_title ?? data?.name,
      description: data?.meta_description,
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
  console.log({ data });
  return (
    <div className="container space-y-2 py-8">
      <SubCategoriesSheet>
        <SidebarSubCategoriesWithTypes
          data={data}
          subCatSlug={subCatSlug}
          catSlug={catSlug}
        />
      </SubCategoriesSheet>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 hidden rounded-lg bg-white p-2 lg:block">
          <SidebarSubCategoriesWithTypes
            data={data}
            subCatSlug={subCatSlug}
            catSlug={catSlug}
          />
        </div>
        <div className="col-span-5 lg:col-span-4">
          <ProductTableWithFilter products={products} />
        </div>
      </div>
    </div>
  );
}
