import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "../utils/http.js";

const fetchProductPricings = async (params = "") => {
  const { data } = await http().get(`${endpoints.pricings.getAll}?${params}`);
  return data.pricings;
};

export function useFetchProductPricings(params = "") {
  return useQuery(["product-pricings", params], () =>
    fetchProductPricings(params)
  );
}
