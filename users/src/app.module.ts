import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration } from 'config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfiguration] }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
