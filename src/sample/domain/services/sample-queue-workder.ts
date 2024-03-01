import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { QueueEvents } from 'bullmq';
import { SampleServiceLayerApi } from '../data/sample-service-api.service';

@Processor('profile-queue')
export class SampleQueueWorkerService {
  private logger = new Logger(SampleQueueWorkerService.name);
  private queueEvents;

  constructor(private serviceApi: SampleServiceLayerApi) {
    this.queueEvents = new QueueEvents('profile-queue');
  }

  @Process('create-new-profile-job')
  async handleCreateNewProfileJob(job: Job<any>) {
    const result = await this.serviceApi.createNewProfile(job.data);

    return {
      status: 'completed',
      result,
    };
  }

  @Process('get-user-profile-job')
  async handleGetUserProfile(job: Job<any>) {
    const { profileId } = job.data;
    const result = await this.serviceApi.getUserProfile(profileId);
    return {
      status: 'completed',
      result,
    };
  }

  @Process('get-all-users-job')
  async handleGetAllUsers(job: Job<any>) {
    const result = await this.serviceApi.getAllUsers(job.data);
    return {
      status: 'completed',
      result,
    };
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data:`,
      job.data,
    );
  }
}
