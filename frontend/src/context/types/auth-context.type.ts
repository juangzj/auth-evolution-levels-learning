import type { Login } from "../../features/auth/types/login.type";
import type { User } from "../../features/user/types/model/user.type";

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: Login) => Promise<void>;
  logout: () => Promise<void>;
}
