import type { UserRole } from "../../enums/user-role.enum";

export interface UserListQuery {
  page?: number;
  limit?: number;
  name?: string;
  email: string;
  role?: UserRole;
}
