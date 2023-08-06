import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { classToPlain, classToPlainFromExist, instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface Response<T> {
  data: T;
}
@Injectable()
export class AppInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ) {
    return next.handle().pipe(
      map((data) => {
        let response = context.switchToHttp().getResponse();


        const statusCode = response.statusCode || 200;

        const dataWithoutPassword = instanceToPlain(data, { excludeExtraneousValues: true });
        if ('password' in dataWithoutPassword) {
          delete dataWithoutPassword['password'];
        }

        const res = {
          statusCode,
          success: true,
          data: dataWithoutPassword,
        };
        return res
      }),
    );
  }
}
