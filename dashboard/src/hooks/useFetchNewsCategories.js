import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "../utils/http.js";

const fetchCategories = async () => {
  const { data } = await http().get(endpoints.newsCategories.getAll);
  return data;
};

export function useFetchNewsCategories() {
  return useQuery(["news-categories"], () => fetchCategories());
}
