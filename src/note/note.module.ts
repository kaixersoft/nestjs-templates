import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { PersonalNoteService } from './domain/services/personal-note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './domain/entities/note.entity';
import { INoteRepository } from './domain/interfaces/inote-repository.interface';
import { NoteRepository } from './domain/repositories/note.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteController],
  providers: [
    NoteService,
    PersonalNoteService,
    {
      provide: INoteRepository,
      useClass: NoteRepository,
    },
  ],
})
export class NoteModule {}
