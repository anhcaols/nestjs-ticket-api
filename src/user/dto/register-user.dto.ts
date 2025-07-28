import { IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Account name is required' })
  accountname: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}