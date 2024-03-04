import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullboardModule } from './bullboard/bullboard.module';
import { SampleModule } from './sample/sample.module';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthenticationGuard,
  KeycloakModule,
} from '@rnd-ai-npm-domain/identity-middleware';
import { IAMConfigService } from './common/services/iam-config.service';
import { KeycloakConfigModule } from './common/modules/keycloak-config.module';

@Module({
  imports: [
    BullboardModule,
    SampleModule,
    KeycloakModule.registerAsync({
      useExisting: IAMConfigService,
      imports: [KeycloakConfigModule],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
