import { UserRole } from '../enums/user-role.enum';
export class UserResponseDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
