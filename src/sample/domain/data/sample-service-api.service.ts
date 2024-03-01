import { Injectable } from '@nestjs/common';
import { ServiceLayerApi } from 'src/common/services/service-layer-api';

@Injectable()
export class SampleServiceLayerApi extends ServiceLayerApi {
  protected PROFILE_BASE_URL = process.env.PROFILE_SERVICE_API;

  async createNewProfile(data: any): Promise<void> {
    try {
      const token = await this.getToken();

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const url = `${this.PROFILE_BASE_URL}/v1/profile`;

      const result = await this.httpService.post(url, data, {}, headers);

      return (result.data as any).result;
    } catch (e) {
      this.logger.error('createNewProfile', e);
      throw e;
    }
  }

  async getUserProfile(profileId: string): Promise<any> {
    try {
      const token = await this.getToken();

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const url = `${this.PROFILE_BASE_URL}/v1/profile/${profileId}`;

      const result = await this.httpService.get(url, {}, headers);

      return (result.data as any).result;
    } catch (e) {
      throw e;
    }
  }

  async getAllUsers(data: any) {
    const token = await this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const url = `${this.PROFILE_BASE_URL}/v1/profile/query?page=1&limit=10&search=&sortBy=createdAt&sortType=desc`;
    try {
      const result = await this.httpService.get(url, {}, headers);

      return (result.data as any).result;
    } catch (e) {
      throw e;
    }
  }
}
