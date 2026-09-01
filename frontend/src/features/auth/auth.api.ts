import { api } from "../../api/axios";
import type { Login } from "./types/login.type";
import type { AuthUser, LoginResponse } from "./types/auth-response.type";

export const login = async (data: Login) => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<AuthUser>("/auth/me");
  return response.data;
};
