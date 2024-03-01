import {
  ValidationPipe,
  BadRequestException,
  INestApplication,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';

import {
  ResponseInterceptor,
  LoggingInterceptor,
  HttpExceptionFilter,
  QueryExceptionFilter,
} from '../interceptors';
import { ValidationError } from 'class-validator';

export function configureApp(
  appOptions: INestApplication,
  version = 'v1',
): void {
  // Global Prefix
  appOptions.setGlobalPrefix(version);

  // Validate DTO
  appOptions.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );

  // enable cors
  const allowOrigin = process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN || '*';
  Logger.log(`Access Control Allow Origin set to : ${allowOrigin}`);
  appOptions.enableCors({
    origin: allowOrigin,
  });

  // Response Formatter
  appOptions.useGlobalInterceptors(new ResponseInterceptor());

  // Logger Formatter
  appOptions.useGlobalInterceptors(new LoggingInterceptor());

  // Http Exception
  appOptions.useGlobalFilters(new HttpExceptionFilter());

  // Query Exception
  appOptions.useGlobalFilters(new QueryExceptionFilter());
}
