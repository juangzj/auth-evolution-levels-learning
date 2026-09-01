import type { UserData } from "../../features/user/types/user.type";

export interface AuthContext {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
