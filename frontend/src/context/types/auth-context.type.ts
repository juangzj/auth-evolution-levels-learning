import type { User } from "../../features/user/types/model/user.type";

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}
