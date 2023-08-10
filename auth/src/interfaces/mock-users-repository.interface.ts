import { CreateUserDto, UserDto } from 'src/users/dto';
import { User } from 'src/users/entities/user.entity';

// POO: POLYMORPHISM

export interface MockUsersRepository {
  findOne: (conditions: any) => Promise<User | null>;
  find: (conditions: any) => Promise<UserDto[]>;
  create: (createUserDto: CreateUserDto) => Promise<UserDto>;
  save: (user: User) => Promise<User>;
}
