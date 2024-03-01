import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../utils/http-service.utils';

interface ResponseData {
  result: {
    access_token?: string;
    expires_in?: number;
  };
}

@Injectable()
export class ServiceLayerApi {
  protected logger = new Logger(ServiceLayerApi.name);

  private CLIENT_CREDENTIAL_AUTH_URL = process.env.CLIENT_CREDENTIAL_AUTH;

  private CLIENT_ID = process.env.CLIENT_ID;
  private CLIENT_SECRET = process.env.CLIENT_SECRET;

  private token: string;
  private tokenExpiration: Date;
  protected httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getToken(): Promise<string> {
    if (!this.token || new Date() > this.tokenExpiration) {
      // Retrieve a new token from the OAuth server
      const response = await this.httpService.post(
        this.CLIENT_CREDENTIAL_AUTH_URL,
        {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          grant_type: 'client_credentials',
          scope: 'openid',
        },
      );

      this.token = (response.data as ResponseData).result.access_token;
      // Set the token expiration date/time
      this.tokenExpiration = new Date();
      this.tokenExpiration.setSeconds(
        this.tokenExpiration.getSeconds() +
          (response.data as ResponseData).result.expires_in,
      );
    }

    return this.token;
  }
}
