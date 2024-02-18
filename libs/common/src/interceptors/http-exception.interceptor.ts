import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      let errorMessage = Array.isArray(exceptionResponse['message'])
        ? exceptionResponse['message']
        : exception.message;

      if (Array.isArray(errorMessage) && errorMessage[0]?.constraints) {
        errorMessage = Object.values(errorMessage[0]?.constraints);
      }

      const errorResponse: any = {
        errorCode: new Date().getTime(),
        timestamp: new Date(),
        statusCode: status,
        message: errorMessage,
      };
      this.logger.error(exception.message, errorResponse, exception.stack);
      response.status(status).json(errorResponse);
    } else {
      const status = 500;
      const errorMessage = 'internal server error';
      const errorResponse: any = {
        errorCode: new Date().getTime(),
        timestamp: new Date(),
        statusCode: status,
        message: errorMessage,
      };
      this.logger.error(errorMessage, errorResponse, exception);
      response.status(status).json(errorResponse);
    }
  }
}
