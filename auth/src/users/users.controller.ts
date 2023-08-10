import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserDto,
  UsersDto,
} from './dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { Token } from 'src/decorators/get-token.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Serialize(UserDto)
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Serialize(UsersDto)
  @Get()
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }

  @Serialize(UserDto)
  @Get(':id')
  @HttpCode(200)
  @Token()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Serialize(UserDto)
  @Put(':id')
  @HttpCode(200)
  @Token()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Token()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
