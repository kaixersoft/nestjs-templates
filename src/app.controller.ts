import { Controller, Get } from '@nestjs/common';
import { Public } from '@rnd-ai-npm-domain/identity-middleware';

@Controller()
export class AppController {
  @Get('/health')
  @Public()
  healthCheck(): string {
    return 'ok';
  }
}
