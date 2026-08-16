import { api } from "../api";
import type { UserData } from "../../types/user";

export async function register(data: UserData) {
  const response = await api.post("/users", data);
  return response.data;
}
