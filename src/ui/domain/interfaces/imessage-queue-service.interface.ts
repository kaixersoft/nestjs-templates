import { MessageQueueEntity } from 'src/ui/entities/message-queue.entity';
import { AddMessageQueueDto } from '../dto/add-message-queue.dto';
import { UpdateMessageQueueDto } from '../dto/update-message-queue';
import { ListMessageQueueDto } from '../dto/list-message-queue.dto';
import { UpdateResult } from 'typeorm';

export abstract class IMessageQueueService {
  abstract addMessageQueue(
    params: AddMessageQueueDto,
  ): Promise<MessageQueueEntity>;

  abstract updateMessageQueue(
    id: string,
    params: UpdateMessageQueueDto,
  ): Promise<MessageQueueEntity>;

  abstract getMessageQueue(id: string): Promise<MessageQueueEntity>;

  abstract deleteMessageQueue(id: string): Promise<UpdateResult>;

  abstract listMessageQueue(
    params: ListMessageQueueDto,
  ): Promise<[MessageQueueEntity[], totalRows: number] | []>;
}
