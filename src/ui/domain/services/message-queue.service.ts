import { MessageQueueEntity } from 'src/ui/entities/message-queue.entity';
import { AddMessageQueueDto } from '../dto/add-message-queue.dto';
import { UpdateMessageQueueDto } from '../dto/update-message-queue';
import { IMessageQueueService } from '../interfaces/imessage-queue-service.interface';
import { Inject, Logger } from '@nestjs/common';
import { IRepository } from '@core/interface/repository/irespository.interface';
import { ListMessageQueueDto } from '../dto/list-message-queue.dto';
import { UpdateResult } from 'typeorm';

export class MessageQueueService implements IMessageQueueService {
  private readonly logger = new Logger(MessageQueueService.name);

  constructor(
    @Inject('MessageQueueRepository')
    private messageQueueRepo: IRepository<
      MessageQueueEntity,
      AddMessageQueueDto,
      UpdateMessageQueueDto
    >,
  ) {}

  async addMessageQueue(
    params: AddMessageQueueDto,
  ): Promise<MessageQueueEntity> {
    try {
      const result = await this.messageQueueRepo.create(params);
      return result;
    } catch (e) {
      this.logger.error('CreateMessageQueue:Error', e);
      throw e;
    }
  }

  async updateMessageQueue(
    id: string,
    params: UpdateMessageQueueDto,
  ): Promise<MessageQueueEntity> {
    return await this.messageQueueRepo.update(id, params);
  }

  async getMessageQueue(id: string): Promise<MessageQueueEntity> {
    return await this.messageQueueRepo.findById(id);
  }

  async deleteMessageQueue(id: string): Promise<UpdateResult> {
    return await this.messageQueueRepo.delete(id);
  }

  async listMessageQueue(
    params: ListMessageQueueDto,
  ): Promise<[MessageQueueEntity[], totalRows: number] | []> {
    return await this.messageQueueRepo.findAll(params);
  }
}
