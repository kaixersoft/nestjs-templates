import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { UiService } from './ui.service';
import { AddMessageQueueDto } from './domain/dto/add-message-queue.dto';
import { MessageQueueEntity } from './entities/message-queue.entity';
import { GetMessageQueueDto } from './domain/dto/get-message-queue.dto';
import { ListMessageQueueDto } from './domain/dto/list-message-queue.dto';
import { UpdateMessageQueueDto } from './domain/dto/update-message-queue';
import { UpdateResult } from 'typeorm';

@Controller('ui')
export class UiController {
  constructor(private uiService: UiService) {}

  @Post('/queue')
  async createQueue(
    @Body() params: AddMessageQueueDto,
  ): Promise<MessageQueueEntity> {
    return await this.uiService.createMessageQueue(params);
  }

  @Get('/queue/list')
  async listAllQueues(
    @Query() params: ListMessageQueueDto,
  ): Promise<[MessageQueueEntity[], totalRows: number] | []> {
    return await this.uiService.listMessageQueues(params);
  }

  @Get('/queue/:queueId')
  async getQueues(
    @Param() params: GetMessageQueueDto,
  ): Promise<MessageQueueEntity> {
    const { queueId } = params;
    return await this.uiService.getMessageQueue(queueId);
  }

  @Put('/queue/:queueId')
  async updateQueue(
    @Param() queryParams: GetMessageQueueDto,
    @Body() bodyParams: UpdateMessageQueueDto,
  ): Promise<MessageQueueEntity> {
    const { queueId } = queryParams;
    return await this.uiService.updateMessageQueue(queueId, bodyParams);
  }

  @Delete('/queue/:queueId')
  async deleteQueue(
    @Param() queryParams: GetMessageQueueDto,
  ): Promise<UpdateResult> {
    const { queueId } = queryParams;
    return await this.uiService.deleteMessageQueue(queueId);
  }
}
