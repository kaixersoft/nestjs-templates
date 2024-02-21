import { DeleteResult } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { NoteEntity } from '../entities/note.entity';

export abstract class INoteRepository {
  abstract create(data: CreateNoteDto): Promise<NoteEntity>;

  abstract find(): Promise<NoteEntity[] | []>;

  abstract findById(id: string): Promise<NoteEntity>;

  abstract update(id: string, data: UpdateNoteDto): Promise<NoteEntity>;

  abstract delete(id: string): Promise<DeleteResult>;
}
