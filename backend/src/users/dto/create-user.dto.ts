import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { Column } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail({}, { message: 'Please provide a valid email addres' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at leat 8 characters long' })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole;
}
