import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SampleServiceLayerApi } from '../data/sample-service-api.service';

@Processor('profile-queue')
export class SampleQueueWorkerService {
  constructor(private serviceApi: SampleServiceLayerApi) {}

  @Process('create-new-profile-job')
  async handleCreateNewProfileJob(job: Job<any>) {
    const result = await this.serviceApi.createNewProfile(job.data);

    return result;
  }

  @Process('get-user-profile-job')
  async handleGetUserProfile(job: Job<any>) {
    const { profileId } = job.data;
    const result = await this.serviceApi.getUserProfile(profileId);
    return result;
  }

  @Process('get-all-users-job')
  async handleGetAllUsers(job: Job<any>) {
    const result = await this.serviceApi.getAllUsers(job.data);
    return result;
  }
}
