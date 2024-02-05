import { Inject, Injectable, Logger } from '@nestjs/common';
import { AddMessageQueueDto } from './domain/dto/add-message-queue.dto';
import { IMessageQueueService } from './domain/interfaces/imessage-queue-service.interface';
import { ListMessageQueueDto } from './domain/dto/list-message-queue.dto';
import { MessageQueueEntity } from './entities/message-queue.entity';
import { UpdateMessageQueueDto } from './domain/dto/update-message-queue';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UiService {
  private readonly logger = new Logger(UiService.name);

  constructor(
    @Inject('MessageQueueService')
    private messageService: IMessageQueueService,
  ) {}

  async createMessageQueue(params: AddMessageQueueDto) {
    try {
      const result = await this.messageService.addMessageQueue(params);
      return result;
    } catch (e) {
      this.logger.error('CreateMessageQueue:Error', e);
      throw e;
    }
  }

  async getMessageQueue(id: string) {
    return await this.messageService.getMessageQueue(id);
  }

  async listMessageQueues(
    params: ListMessageQueueDto,
  ): Promise<[MessageQueueEntity[], totalRows: number] | []> {
    return await this.messageService.listMessageQueue(params);
  }

  async updateMessageQueue(id: string, params: UpdateMessageQueueDto) {
    return await this.messageService.updateMessageQueue(id, params);
  }

  async deleteMessageQueue(id: string): Promise<UpdateResult> {
    return await this.messageService.deleteMessageQueue(id);
  }
}
