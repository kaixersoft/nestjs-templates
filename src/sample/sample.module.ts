import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { JobQueueModule } from 'src/common/job-queue/job-queue.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpService } from 'src/common/utils/http-service.utils';
import { SampleServiceLayerApi } from './domain/data/sample-service-api.service';
import { SampleQueueWorkerService } from './domain/services/sample-queue-workder';
import { RbacController } from './rbac/rbac.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // Mandatory
    JobQueueModule.registerQueue(
      ['profile-queue'], // this will be your Feature Queue
      [
        HttpService, // Mandatory
        SampleServiceLayerApi, // your Service API integration class
        SampleQueueWorkerService, // your Queue Worker
      ],
      new ConfigService(), // Mandatory
    ),
  ],
  controllers: [
    // Register here all your feature routes
    SampleController,
    RbacController,
  ],
  providers: [
    // Register here all your custom classes eg. Repository, Services
    SampleService,
  ],
})
export class SampleModule {}
