import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const errorMessage = Array.isArray(exceptionResponse['message'])
      ? exceptionResponse['message']
      : exception.message;

    const errorResponse: any = {
      errorCode: new Date().getTime(),
      timestamp: new Date(),
      statusCode: status,
      message: errorMessage,
    };
    this.logger.error(exception.message, errorResponse, exception.stack);
    response.status(status).json(errorResponse);
  }
}
