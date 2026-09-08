import { UserRole } from "../../enums/user-role.enum";

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  password?: string;
}
