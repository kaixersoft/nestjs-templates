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
    ConfigModule.forRoot(),
    JobQueueModule.registerQueue(
      ['profile-queue'],
      [HttpService, SampleServiceLayerApi, SampleQueueWorkerService],
      new ConfigService(),
    ),
  ],
  controllers: [SampleController, RbacController],
  providers: [SampleService],
})
export class SampleModule {}
