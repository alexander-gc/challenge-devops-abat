import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

// POO: ABSTRACTION

// Response

export class UsersDto {
  @Expose()
  length: number;

  @Expose()
  @Type(() => UserDto)
  users: UserDto[];
}
