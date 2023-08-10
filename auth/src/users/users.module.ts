import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController], // Routes
  providers: [UsersService], // Dependencies
  exports: [TypeOrmModule], // Exports them with the other modules
})
export class UsersModule {}
