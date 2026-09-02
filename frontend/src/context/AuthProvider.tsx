import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import type { AuthContext as AuthContextType } from "./types/auth-context.type";
import type { Login } from "../features/auth/types/login.type";

import {
  getMe,
  login as loginApi,
  logout as logoutApi,
} from "../features/auth/auth.api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Restore user when application starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getMe();

        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (data: Login) => {
    const response = await loginApi(data);

    setUser(response.user);
  };

  // Logout
  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
