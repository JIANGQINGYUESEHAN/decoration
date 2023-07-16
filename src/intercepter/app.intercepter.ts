import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class AppInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        let response = context.switchToHttp().getResponse();

        const statusCode = response.statusCode || 200;

        const res = {
          statusCode,
          success: true,
          data,
        };

        return res;
      }),
    );
  }
}
