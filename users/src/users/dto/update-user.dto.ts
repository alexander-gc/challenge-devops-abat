import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'firstName must be a string' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'lastName must be a string' })
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
