import { useContext } from "react";

import { AuthContext } from "./AuthContext";

// Allows components to access the context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
