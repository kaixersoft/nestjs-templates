import { DeleteResult } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { NoteEntity } from '../entities/note.entity';
import { INoteRepository } from '../interfaces/inote-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonalNoteService {
  constructor(private readonly noteRepo: INoteRepository) {}

  async writePersonalNote(data: CreateNoteDto): Promise<NoteEntity> {
    return await this.noteRepo.create(data);
  }

  async updatePersonalNote(
    id: string,
    data: UpdateNoteDto,
  ): Promise<NoteEntity> {
    return await this.noteRepo.update(id, data);
  }

  async findPersonalNote(id: string): Promise<NoteEntity> {
    return await this.noteRepo.findById(id);
  }

  async listPersonalNote(): Promise<NoteEntity[] | []> {
    return await this.noteRepo.find();
  }

  async deletePersonalNote(id: string): Promise<DeleteResult> {
    return await this.noteRepo.delete(id);
  }
}
