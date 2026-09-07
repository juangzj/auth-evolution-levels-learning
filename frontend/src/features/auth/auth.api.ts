import { api } from "../../api/axios";
import type { Login } from "./types/login.type";
import type { User } from "../user/domain/entities/user.entity";
import type { RegisterUserDto } from "../user/domain/dtos/register-user.dto";

export const login = async (data: Login) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response;
};

export async function register(registerUserDto: RegisterUserDto) {
  const response = await api.post("/auth/register", registerUserDto);
  return response.data;
}
