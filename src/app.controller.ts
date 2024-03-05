import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  AuthenticatedUser,
  AuthenticatedUserId,
  Permission,
  Public,
} from '@rnd-ai-npm-domain/identity-middleware';

@Controller()
export class AppController {
  @Get('/health')
  @Public()
  healthCheck(): string {
    return 'ok';
  }

  @Get('/token-user-id')
  tokenUserId(@AuthenticatedUserId() userId: string): string {
    return userId;
  }

  @Get('/token-user')
  tokenUser(@AuthenticatedUser() user: string): string {
    return user;
  }

  @Get('/token-client-id')
  tokenClientId(@AuthenticatedUserId() clientId: string): string {
    return clientId;
  }

  @Get('/permission')
  @UseGuards(new Permission(['profile']))
  permissionCheck(): string {
    return 'ok';
  }

  @Get('/no-permission')
  @UseGuards(new Permission(['restricted-permission']))
  permissionCheck2(): string {
    return 'ok';
  }
}
