import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './domain/dto/create-profile.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as uuidv4 } from 'uuid';
import { ListProfilesDto } from './domain/dto/list-profile.dto';

@Injectable()
export class SampleService {
  constructor(
    @InjectQueue('profile-queue')
    private profileQueue: Queue,
  ) {}

  async createNewProfile(data: CreateProfileDto): Promise<any> {
    const jobId = uuidv4();
    const job = await this.profileQueue.add('create-new-profile-job', data, {
      jobId,
    });

    return [
      {
        job_id: job.id,
        status: 'processing',
      },
    ];
  }

  async getJobStatus(jobId: string) {
    const job = await this.profileQueue.getJob(jobId);

    if (!job) {
      throw new NotFoundException(`Job ${jobId} not found`);
    }

    if (!job.returnvalue) {
      throw new BadRequestException(job.failedReason);
    }

    return job.returnvalue; // format is returned by the worker
  }

  async getUserProfile(profileId: string) {
    const jobId = uuidv4();
    const job = await this.profileQueue.add(
      'get-user-profile-job',
      { profileId },
      {
        jobId,
      },
    );

    return [
      {
        job_id: job.id,
        status: 'processing',
      },
    ];
  }

  async getAllUsers(queryParams: ListProfilesDto) {
    const jobId = uuidv4();
    const job = await this.profileQueue.add('get-all-users-job', queryParams, {
      jobId,
    });

    return [
      {
        job_id: job.id,
        status: 'processing',
      },
    ];
  }
}
