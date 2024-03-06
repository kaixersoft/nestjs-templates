import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { SampleServiceLayerApi } from '../data/sample-service-api.service';

@Processor('profile-queue')
export class SampleQueueWorkerService {
  constructor(private serviceApi: SampleServiceLayerApi) {}

  @Process('create-new-profile-job')
  async handleCreateNewProfileJob(job: Job<any>) {
    const result = await this.serviceApi.createNewProfile(job.data);

    return [result]; // Any single item return should still be wrapped as an array to comply with our set standard response
  }

  @Process('get-user-profile-job')
  async handleGetUserProfile(job: Job<any>) {
    const { profileId } = job.data;
    const result = await this.serviceApi.getUserProfile(profileId);
    return [result]; // Any single item return should still be wrapped as an array to comply with our set standard response
  }

  @Process('get-all-users-job')
  async handleGetAllUsers(job: Job<any>) {
    const result = await this.serviceApi.getAllUsers(job.data);
    return result; // this already returns an array, no need to wrap as array
  }
}
