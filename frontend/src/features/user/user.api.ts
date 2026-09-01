import { api } from "../../api/axios";
import type { UserData } from "./types/user.type";

export async function register(data: UserData) {
  const response = await api.post("/users", data);
  return response.data;
}

export async function findAll() {
  const response = await api.get<UserData[]>("/users");
  return response.data;
}
