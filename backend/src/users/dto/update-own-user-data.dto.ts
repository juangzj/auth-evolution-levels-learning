import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOwnUserData {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
