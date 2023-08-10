import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { EnvConfiguration } from '../../config/env.config';
const { token } = EnvConfiguration();

// DESIGN PATTERN: DECORATOR

@Injectable()
class GetToken implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const headerToken = req.headers['token'];

    if (!headerToken) throw new UnauthorizedException('Token missing');

    if (headerToken != token)
      throw new UnauthorizedException('Token not valid');

    return true;
  }
}

export function Token() {
  return UseGuards(GetToken);
}
