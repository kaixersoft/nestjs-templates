import { Module } from '@nestjs/common';
import { UiController } from './ui.controller';
import { UiService } from './ui.service';
import { MessageQueueRepository } from './domain/repositories/message-queue.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageQueueEntity } from './entities/message-queue.entity';
import { MessageQueueService } from './domain/services/message-queue.service';
import { IMessageQueueService } from './domain/interfaces/imessage-queue-service.interface';
import { IRepository } from '@core/interface/repository/irespository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Add all model you will use in your repository for this module
      MessageQueueEntity,
    ]),
  ],
  controllers: [UiController],
  providers: [
    {
      provide: 'MessageQueueRepository',
      useClass: MessageQueueRepository,
      useExisting: IRepository,
    },
    {
      provide: 'MessageQueueService',
      useClass: MessageQueueService,
      useExisting: IMessageQueueService,
    },
    UiService,
  ],
})
export class UiModule {}
