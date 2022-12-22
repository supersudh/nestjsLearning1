import { IsEmail, isEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @IsString()
  password: string;
}