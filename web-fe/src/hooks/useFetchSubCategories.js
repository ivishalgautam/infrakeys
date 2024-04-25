import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import axios from "axios";

const fetchSubCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(baseUrl + endpoints.subCategories.getAll);
  return data?.data;
};

export function useFetchSubCategories() {
  return useQuery(["sub-categories"], () => fetchSubCategories());
}
