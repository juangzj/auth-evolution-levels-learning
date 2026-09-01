import { api } from "../../api/axios";
import type { User } from "./types/model/user.type";

export async function register(data: User) {
  const response = await api.post("/users", data);
  return response.data;
}

export async function findAll() {
  const response = await api.get<User[]>("/users");
  return response.data;
}
