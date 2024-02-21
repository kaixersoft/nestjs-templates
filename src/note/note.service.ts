import { Injectable } from '@nestjs/common';
import { PersonalNoteService } from './domain/services/personal-note.service';
import { CreateNoteDto } from './domain/dto/create-note.dto';
import { NoteEntity } from './domain/entities/note.entity';
import { UpdateNoteDto } from './domain/dto/update-note.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(private readonly personalNoteService: PersonalNoteService) {}

  async createNewPersonalNote(data: CreateNoteDto): Promise<NoteEntity> {
    return await this.personalNoteService.writePersonalNote(data);
  }

  async updatePersonalNote(
    id: string,
    data: UpdateNoteDto,
  ): Promise<NoteEntity> {
    return await this.personalNoteService.updatePersonalNote(id, data);
  }

  async getPersonalNote(id: string): Promise<NoteEntity> {
    return await this.personalNoteService.findPersonalNote(id);
  }

  async getListsOfPersonalNotes(): Promise<NoteEntity[] | []> {
    return await this.personalNoteService.listPersonalNote();
  }

  async deletePersonalNote(id: string): Promise<DeleteResult> {
    return await this.personalNoteService.deletePersonalNote(id);
  }
}
