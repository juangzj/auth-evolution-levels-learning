import { UserRole } from "../../enums/user-role.enum";

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
}
