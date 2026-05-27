import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 12, {
    message: 'Password must be between 2 and 12 characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12, {
    message: 'Password must be between 6 and 12 characters',
  })
  password: string;
}
