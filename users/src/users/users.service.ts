import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
//import { hashSync, compareSync } from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, password } = createUserDto;

      // Validate if email already exists
      const existingEmail = await this.userRepo.findOne({
        where: { email: email.toLowerCase().trim() },
      });

      if (existingEmail) throw new BadRequestException('Email already exists');

      // Encrypt password
      //const encryptedPass = hashSync(password, 10);

      const newUser = this.userRepo.create({
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        password: password,
      });

      await this.userRepo.save(newUser);

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      /*const users = await this.userRepo.find({
        where: { isDeleted: false },
      });

      return users;*/

      return { msg: 'Retrieving all users!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { id, isDeleted: false },
      });

      if (!user) throw new NotFoundException('User not found');

      delete user.password;

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { firstName, lastName, email } = updateUserDto;

      const user = await this.findOne(id);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);

      return { msg: '' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
