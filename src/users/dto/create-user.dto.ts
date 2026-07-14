import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail({}, { message: 'Please provide a valir email addres' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at leat 8 characters long' })
  password!: string;
}
