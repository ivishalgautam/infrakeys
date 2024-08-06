import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "../utils/http.js";

const fetchRequirements = async () => {
  const { data } = await http().get(`${endpoints.requirements.getAll}`);
  return data;
};

export function useFetchRequirements() {
  return useQuery(["requirements"], () => fetchRequirements());
}
