import { Logger } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { NoteEntity } from '../entities/note.entity';
import { INoteRepository } from '../interfaces/inote-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class NoteRepository implements INoteRepository {
  constructor(
    @InjectRepository(NoteEntity)
    private noteEntity: Repository<NoteEntity>,
  ) {}

  async create(data: CreateNoteDto): Promise<NoteEntity> {
    try {
      const newNote = this.noteEntity.create(data);
      return await this.noteEntity.save(newNote);
    } catch (e) {
      Logger.error('create note error: ', e);
      throw e;
    }
  }

  async find(): Promise<[] | NoteEntity[]> {
    return await this.noteEntity.find();
  }

  async findById(id: string): Promise<NoteEntity> {
    return await this.noteEntity.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, data: UpdateNoteDto): Promise<NoteEntity> {
    try {
      await this.noteEntity.update(
        {
          id: id,
        },
        {
          ...data,
        },
      );
      return this.findById(id);
    } catch (e) {
      Logger.error('update note error', e);
      throw e;
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.noteEntity.delete(id);
    } catch (e) {
      Logger.error('delete note error', e);
      throw e;
    }
  }
}
