import {
  InternalServerErrorException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';

export const errorHandler = (err: HttpException | any): never => {
  const isKnownException =
    err instanceof UnauthorizedException ||
    err instanceof NotFoundException ||
    err instanceof ForbiddenException ||
    err instanceof BadRequestException;

  if (isKnownException) throw err;

  const errorMsg = 'Something went wrong';
  const errorDescription = err.detail || err.message;

  throw new InternalServerErrorException(errorMsg, errorDescription);
};
