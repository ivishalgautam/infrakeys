import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "../utils/http.js";

const fetchSubCatTypes = async () => {
  const { data } = await http().get(endpoints.sub_category_types.getAll);
  return data;
};

export function useFetchSubCatTypes() {
  return useQuery(["subCatTypes"], () => fetchSubCatTypes());
}
