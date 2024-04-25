import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "@/utils/http.js";

export const fetchCategories = async () => {
  const { data } = await http().get(endpoints.categories.getAll);
  return data;
};

export function useFetchCategories() {
  return useQuery(["categories"], () => fetchCategories());
}
