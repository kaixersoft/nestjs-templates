import { IRepository } from 'src/core/interface/repository/irespository.interface';
import { MessageQueueEntity } from 'src/ui/entities/message-queue.entity';
import { AddMessageQueueDto } from '../dto/add-message-queue.dto';
import { UpdateMessageQueueDto } from '../dto/update-message-queue';
import { Repository, UpdateResult, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ListMessageQueueDto } from '../dto/list-message-queue.dto';

@Injectable()
export class MessageQueueRepository
  implements
    IRepository<MessageQueueEntity, AddMessageQueueDto, UpdateMessageQueueDto>
{
  constructor(
    @InjectRepository(MessageQueueEntity)
    private messageQueueRepo: Repository<MessageQueueEntity>,
  ) {}

  async create(params: AddMessageQueueDto): Promise<MessageQueueEntity> {
    try {
      const newMessageQueue = this.messageQueueRepo.create(params);
      return await this.messageQueueRepo.save(newMessageQueue);
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: string,
    params: UpdateMessageQueueDto,
  ): Promise<MessageQueueEntity> {
    try {
      await this.messageQueueRepo.update({ id }, { ...params });
      return await this.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async findById(id: string): Promise<MessageQueueEntity> {
    try {
      return await this.messageQueueRepo.findOne({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll(
    params: ListMessageQueueDto,
  ): Promise<[MessageQueueEntity[], totalRows: number] | []> {
    const { page, pageSize, sortCol, sortDir, search, searchCol } = params;
    const skip = (page - 1) * pageSize;

    const searchCols = searchCol ? searchCol.split(',') : [];

    const where = search
      ? searchCols.map((col) => ({ [col.trim()]: Like(`%${search}%`) }))
      : {};

    try {
      return await this.messageQueueRepo.findAndCount({
        where,
        order: { [sortCol]: sortDir },
        skip: skip,
        take: pageSize,
      });
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<UpdateResult> {
    try {
      return await this.messageQueueRepo.softDelete(id);
    } catch (e) {
      throw e;
    }
  }
}
