import ProductPricingTableWithFilter from "@/components/table/product-pricing-table-with-filter";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
async function getProductsPricing(slug) {
  const { data } = await axios.get(`${baseUrl}${endpoints.products.pricing}`);
  return data;
}

export default async function PricingsPage() {
  const { data } = await getProductsPricing();

  return (
    <div className="container">
      <ProductPricingTableWithFilter products={data.pricings} />
    </div>
  );
}
