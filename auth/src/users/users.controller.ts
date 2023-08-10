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
import { Token } from '../decorators/get-token.decorator';

@Controller('users')
export class UsersController {
  // POO: ENCAPSULATION
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto) // DESIGN PATTERN: INTERCEPTOR
  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Serialize(UserDto) // DESIGN PATTERN: INTERCEPTOR
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Serialize(UsersDto) // DESIGN PATTERN: INTERCEPTOR
  @Get()
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }

  @Serialize(UserDto) // DESIGN PATTERN: INTERCEPTOR
  @Get(':id')
  @HttpCode(200)
  @Token() // DESIGN PATTERN: DECORATOR
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Serialize(UserDto) // DESIGN PATTERN: INTERCEPTOR
  @Put(':id')
  @HttpCode(200)
  @Token() // DESIGN PATTERN: DECORATOR
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Token() // DESIGN PATTERN: DECORATOR & GUARDS
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
