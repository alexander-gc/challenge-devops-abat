import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UserDto } from './dto';
import { MockUsersRepository } from '../interfaces/mock-users-repository.interface';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository: MockUsersRepository = {
    findOne: jest.fn(async (conditions: any): Promise<User> => {
      const { id, email, isDeleted } = conditions.where;

      if (email === 'john@gmail.com') {
        return {
          id: 1,
          firstName: 'John',
          lastName: 'Mith',
          email: 'john@gmail.com',
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'password',
        };
      } else if (id === 10 && isDeleted === false) {
        return {
          id: 10,
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice@gmail.com',
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'password',
        };
      }

      return null;
    }),
    find: jest.fn(async (conditions: any): Promise<UserDto[]> => {
      return [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Mith',
          email: 'john@gmail.com',
          isDeleted: conditions.where.isDeleted,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }),
    create: jest.fn(async (createUserDto: CreateUserDto): Promise<UserDto> => {
      return {
        id: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createUserDto,
      };
    }),
    save: jest.fn(async (user: User): Promise<User> => user),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a user', async () => {
    const user = await service.findOne(10);

    expect(user).toEqual({
      id: 10,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@gmail.com',
      isDeleted: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should get users', async () => {
    const users = await service.findAll();

    expect(users).toEqual({
      length: users['length'],
      users: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Mith',
          email: 'john@gmail.com',
          isDeleted: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
    });
  });

  it('should create a user', async () => {
    const user = await service.create({
      firstName: 'John',
      lastName: 'Mith',
      email: 'pepe@gmail.com',
      password: 'password',
    });

    expect(user).toEqual({
      id: 1,
      firstName: 'John',
      lastName: 'Mith',
      email: 'pepe@gmail.com',
      password: 'password',
      isDeleted: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should sign in', async () => {
    const user = await service.login({
      email: 'john@gmail.com',
      password: 'password',
    });

    expect(user).toEqual({
      id: 1,
      firstName: 'John',
      lastName: 'Mith',
      email: 'john@gmail.com',
      isDeleted: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      password: 'password',
    });
  });

  it('should delete a user', async () => {
    const result = await service.remove(10);
    expect(result).toEqual({ msg: `User #10 deleted successfully` });
  });

  it('should update a user', async () => {
    const result = await service.update(10, {
      firstName: 'Franklin',
      lastName: 'Mark',
      email: 'franklin@gmail.com',
    });

    expect(result).toEqual({
      id: 10,
      firstName: 'Franklin',
      lastName: 'Mark',
      email: 'franklin@gmail.com',
      isDeleted: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
