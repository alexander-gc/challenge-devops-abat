import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'firstName is required' })
  @IsString({ message: 'firstName must be a string' })
  firstName: string;

  @IsNotEmpty({ message: 'lastName is required' })
  @IsString({ message: 'lastName must be a string' })
  lastName: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  password: string;
}
