import {
  InternalServerErrorException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';

// TODO: Improve it

export const errorHandler = (err: HttpException | any): never => {
  if (
    err instanceof UnauthorizedException ||
    err instanceof NotFoundException ||
    err instanceof ForbiddenException ||
    err instanceof BadRequestException
  ) {
    throw err;
  }

  throw new InternalServerErrorException(
    'Something went wrong',
    err.detail || err.message,
  );
};
