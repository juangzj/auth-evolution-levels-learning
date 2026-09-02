import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOwnUserData {
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
