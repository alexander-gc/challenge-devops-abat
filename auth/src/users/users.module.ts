import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

// DESIGN PATTERN: DEPENDENCY INJECTION

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController], // Routes
  providers: [UsersService], // Dependencies
  exports: [TypeOrmModule], // Exports them with the other modules
})
export class UsersModule {}
