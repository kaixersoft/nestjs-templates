import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import {
  HttpExceptionFilter,
  LoggingInterceptor,
  ResponseInterceptor,
} from '@core/interceptors';
import { QueryExceptionFilter } from '@core/interceptors/query-exception.interceptor';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  app.setGlobalPrefix('v1');

  // Validate DTO
  app.useGlobalPipes(
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
  app.enableCors({
    origin: allowOrigin,
  });

  // Response Formatter
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Logger Formatter
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Http Exception
  app.useGlobalFilters(new HttpExceptionFilter());

  // Query Exception
  app.useGlobalFilters(new QueryExceptionFilter());

  await app.listen(process.env.PORT || 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
