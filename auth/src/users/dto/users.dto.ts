import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

// Response

export class UsersDto {
  @Expose()
  length: number;

  @Expose()
  @Type(() => UserDto)
  users: UserDto[];
}
