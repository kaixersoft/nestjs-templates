import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  async healthCheck() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }
}
