import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContext as AuthContextType } from "./types/auth-context.type";
import {
  getMe,
  logout as logoutApi,
  login as loginApi,
} from "../features/auth/auth.api";

import type { Login } from "../features/auth/types/login.type";
// Provides the authentication state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const [isLoading, setIsLoading] = useState(true);

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

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  const login = async (data: Login) => {
    const response = await loginApi(data);
    setUser(response.user);
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
