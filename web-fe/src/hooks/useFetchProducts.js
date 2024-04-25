import { useQuery } from "@tanstack/react-query";
import http from "../utils/http.js";
import { endpoints } from "@/utils/endpoints.js";

const fetchProducts = async (page, limit) => {
  const { data } = await http().get(
    `${endpoints.products.getAll}${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  );
  return data;
};

export function useFetchProducts(page, limit) {
  return useQuery(["products"], () => fetchProducts(page, limit));
}
