import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
//import { hashSync, compareSync } from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { errorHandler } from 'src/handlers/error.handler';

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
        password,
      });

      await this.userRepo.save(newUser);

      return newUser;
    } catch (error) {
      errorHandler(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      // Validate if user (email) exists
      const existingUser = await this.userRepo.findOne({
        where: { email, isDeleted: false },
      });

      if (!existingUser)
        throw new UnauthorizedException('Credentials are not valid');

      if (password != existingUser.password)
        throw new UnauthorizedException('Password is not valid');

      /*if (!compareSync(password, existingUser.password))
        throw new UnauthorizedException('Password is not valid');*/

      return existingUser;
    } catch (error) {
      errorHandler(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.find({
        where: { isDeleted: false },
      });

      return { length: users.length, users };
    } catch (error) {
      errorHandler(error);
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
      errorHandler(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { firstName, lastName, email } = updateUserDto;

      const user = await this.findOne(id);

      // Validate if email already exists

      Object.assign(user, {
        email,
        firstName,
        lastName,
      });

      await this.userRepo.save(user);

      return user;
    } catch (error) {
      errorHandler(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);

      // User will only be disabled
      user.isDeleted = true;
      this.userRepo.save(user);

      return { msg: 'User deleted successfully' };
    } catch (error) {
      errorHandler(error);
    }
  }
}