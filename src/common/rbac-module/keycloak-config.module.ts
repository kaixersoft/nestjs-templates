import { Module } from '@nestjs/common';
import { IAMConfigService } from './iam-config.service';

@Module({
  providers: [IAMConfigService],
  exports: [IAMConfigService],
})
export class KeycloakConfigModule {}
