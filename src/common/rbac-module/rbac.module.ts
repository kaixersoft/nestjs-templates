import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  AuthenticationGuard,
  KeycloakModule,
} from '@rnd-ai-npm-domain/identity-middleware';
import { IAMConfigService } from './iam-config.service';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConfigModule } from './keycloak-config.module';

@Global()
@Module({})
export class RbacModule {
  static register(): DynamicModule {
    return {
      module: RbacModule,
      imports: [
        KeycloakModule.registerAsync({
          useExisting: IAMConfigService,
          imports: [KeycloakConfigModule],
        }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthenticationGuard,
        },
      ],
    };
  }
}
