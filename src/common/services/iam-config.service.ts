import { Injectable } from '@nestjs/common';
import {
  KeycloakOptions,
  KeycloakOptionsFactory,
  PolicyEnforcementMode,
} from '@rnd-ai-npm-domain/identity-middleware';

@Injectable()
export class IAMConfigService implements KeycloakOptionsFactory {
  createKeycloakOptions(): KeycloakOptions {
    return {
      authServerUrl: process.env.IAM_URL,
      useNestLogger: true,
      policyEnforcement: PolicyEnforcementMode.ENFORCING,
    };
  }
}
