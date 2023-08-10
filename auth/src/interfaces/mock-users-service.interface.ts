import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/users/dto';

// POO: POLYMORPHISM

export interface MockUsersService {
  create: (dto: CreateUserDto) => Promise<UserDto>;
  findAll: () => Promise<{ length: number; users: UserDto[] }>;
  findOne: (id: number) => Promise<UserDto>;
  login: (dto: LoginUserDto) => Promise<UserDto>;
  update: (id: number, updateUserDto: UpdateUserDto) => Promise<UserDto>;
  remove: (id: number) => Promise<object>;
}
