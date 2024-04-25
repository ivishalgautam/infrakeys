import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "@/utils/http.js";

export const searchProducts = async (q) => {
  const { data } = await http().get(
    `${endpoints.products.getAll}/search?q=${q}`,
  );
  return data;
};

export function useSearchProducts() {
  return useQuery(["templates", query], () => searchProducts());
}
