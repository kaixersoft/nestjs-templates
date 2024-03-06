import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 400;
    const exceptionResponse = exception;
    const errorMessage = Array.isArray(exceptionResponse['message'])
      ? exceptionResponse['message']
      : exception.message;

    const errorResponse: any = {
      errorCode: new Date().getTime(),
      timestamp: new Date(),
      statusCode: status,
      message: [errorMessage],
    };
    this.logger.error(exception.message, errorResponse, exception.stack);
    response.status(status).json(errorResponse);
  }
}
