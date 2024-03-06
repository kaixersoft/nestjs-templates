import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseObject<T> {
  timestamp: Date;
  statusCode: number;
  message: string;
  data: T;
}
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseObject<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseObject<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        timestamp: new Date(),
        statusCode,
        message: 'Operation completed successfully',
        data: data ?? [],
      })),
    );
  }
}
