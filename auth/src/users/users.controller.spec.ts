import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserDto } from './dto';
import { MockUsersService } from '../interfaces/mock-users-service.interface';

describe('UsersController', () => {
  let controller: UsersController;

  const userInput = {
    firstName: 'John',
    lastName: 'Mith',
    email: 'john@gmail.com',
    password: 'password',
  };

  const userResponse = {
    id: 1,
    firstName: 'John',
    lastName: 'Mith',
    email: 'john@gmail.com',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService: MockUsersService = {
    create: jest.fn(async (dto: CreateUserDto): Promise<UserDto> => {
      delete dto.password;

      return {
        ...userResponse,
        ...dto,
      };
    }),
    findAll: jest.fn(
      async (): Promise<{ length: number; users: UserDto[] }> => {
        return { length: 0, users: [userResponse] };
      },
    ),
    findOne: jest.fn(async (id: number): Promise<UserDto> => {
      return {
        ...userResponse,
        id,
      };
    }),
    login: jest.fn(async (dto: LoginUserDto): Promise<UserDto> => {
      return {
        ...userResponse,
        ...dto,
      };
    }),
    update: jest.fn(
      async (id: number, updateUserDto: UpdateUserDto): Promise<UserDto> => {
        return {
          ...userResponse,
          ...updateUserDto,
          id,
        };
      },
    ),
    remove: jest.fn(async (id: number): Promise<object> => {
      return { msg: `User #${id} deleted successfully` };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const newUser = await controller.create(userInput);
    expect(newUser).toEqual({ ...userInput, ...userResponse });
  });

  it('should get a user', async () => {
    const user = await controller.findOne('1');

    expect(user).toEqual({
      ...userResponse,
      id: 1,
    });
  });

  it('should get users', async () => {
    const users = await controller.findAll();
    expect(users).toEqual({ length: 0, users: [userResponse] });
  });

  it('should sign in', async () => {
    const newUser = await controller.login({
      email: 'john@gmail.com',
      password: 'password',
    });

    expect(newUser).toEqual({
      ...userResponse,
      email: 'john@gmail.com',
      password: 'password',
    });
  });

  it('should update a user', async () => {
    const user = await controller.update('1', userInput);

    expect(user).toEqual({
      ...userResponse,
      ...userInput,
      id: 1,
    });
  });

  it('should delete a user', async () => {
    const user = await controller.remove('1');
    expect(user).toEqual({ msg: `User #1 deleted successfully` });
  });
});
