import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "../utils/http.js";

const fetchUsers = async (role) => {
  const { data } = await http().get(
    `${endpoints.users.getAll}${role ? `?role=${role}` : ""}`
  );
  return data;
};

export function useFetchUsers(role) {
  return useQuery(["users"], () => fetchUsers(role));
}
