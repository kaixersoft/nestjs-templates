import { Injectable } from '@nestjs/common';
import { ServiceLayerApi } from 'src/common/services/service-layer-api';
import { ListProfilesDto } from '../dto/list-profile.dto';

@Injectable()
export class SampleServiceLayerApi extends ServiceLayerApi {
  protected PROFILE_BASE_URL = process.env.PROFILE_SERVICE_API;

  async createNewProfile(data: any): Promise<void> {
    try {
      const url = `${this.PROFILE_BASE_URL}/v1/profile`;

      const result = await this.apiCall('POST', url, data);

      return (result.data as any).result;
    } catch (e) {
      this.logger.error('createNewProfile', e);
      throw e;
    }
  }

  async getUserProfile(profileId: string): Promise<any> {
    try {
      const url = `${this.PROFILE_BASE_URL}/v1/profile/${profileId}`;

      const result = await this.apiCall('GET', url);

      return (result.data as any).result;
    } catch (e) {
      throw e;
    }
  }

  async getAllUsers(data: ListProfilesDto) {
    try {
      const url = `${this.PROFILE_BASE_URL}/v1/profile/query`;

      const result = await this.apiCall('GET', url, {}, data);

      return (result.data as any).result;
    } catch (e) {
      throw e;
    }
  }
}
