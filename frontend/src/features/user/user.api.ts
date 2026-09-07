import { api } from "../../api/axios";
import type { User } from "./domain/entities/user.entity";
import type { UpdateOwnUserDto } from "./domain/dtos/update-own-user.dto";
import type { UpdateUserDto } from "./domain/dtos/update-user.dto";

export async function findAll() {
  const response = await api.get<User[]>("/users");
  return response.data;
}

export async function updateOwnUserData(updateOwnUserDto: UpdateOwnUserDto) {
  const response = await api.patch<User>("/users/me", updateOwnUserDto);
  return response.data;
}

export async function updateUser(userId: string, updateUserDto: UpdateUserDto) {
  const response = await api.patch<User>(`/users/${userId}`, updateUserDto);
  return response.data;
}

export async function deleteUser(userId: string) {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
}
