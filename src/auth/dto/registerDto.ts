import { IsEmail, IsString } from 'class-validator';

export class registerDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
