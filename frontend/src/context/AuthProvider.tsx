import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContext as AuthContextType } from "./types/auth-context.type";
import { getMe, logout as logoutApi } from "../features/auth/auth.api";

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
