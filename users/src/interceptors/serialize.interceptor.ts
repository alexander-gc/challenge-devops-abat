import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance, ClassConstructor } from 'class-transformer';

// extends: we are subclassing an existing class.
// implements: we wanna create a new class that satisfies all the requeriments of either an abstract class or an interface.
// ClassConstructor: parameter must be any class type.

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<T> {
    // Run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
