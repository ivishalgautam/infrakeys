import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import axios from "axios";

const fetchFeaturedSubCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(
    baseUrl + endpoints.subCategories.getAll + "?featured=true",
  );
  return data?.data;
};

export function useFetchFeaturedSubCategories() {
  return useQuery(["sub-categories"], () => fetchFeaturedSubCategories());
}
