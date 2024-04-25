import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import axios from "axios";

export const fetchBanners = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(baseUrl + endpoints.banners.getAll);
  return data?.data;
};

export function useFetchBanners() {
  return useQuery(["brands"], () => fetchBanners());
}
