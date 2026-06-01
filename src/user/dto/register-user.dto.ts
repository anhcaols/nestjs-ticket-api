import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 12, {
    message: 'Usename must be between 2 and 12 characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12, {
    message: 'Password must be between 6 and 12 characters',
  })
  password: string;
}
