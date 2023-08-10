import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { dataSource } from 'database/data-source';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule); // DESIGN PATTERN: SINGLETON

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  dataSource
    .initialize()
    .then(() => {
      console.log('Database has been initialized!');
    })
    .catch((err) => {
      console.error('Error during initialization', err);
    });

  await app.listen(port, () => console.log('Server running at port ' + port));
}
bootstrap();
