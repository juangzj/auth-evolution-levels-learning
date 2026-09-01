import { createContext } from "react";

import type { AuthContext as AuthContextType } from "./types/auth-context.type";

// Stores the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
