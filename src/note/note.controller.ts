import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './domain/dto/create-note.dto';
import { UpdateNoteDto } from './domain/dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('/personal')
  async newPersonalNote(@Body() data: CreateNoteDto) {
    return await this.noteService.createNewPersonalNote(data);
  }

  @Put('/personal/:personalId')
  async updatePersonalNote(
    @Param('personalId') personalId: string,
    @Body() data: UpdateNoteDto,
  ) {
    return await this.noteService.updatePersonalNote(personalId, data);
  }

  @Get('/personal/:personalId')
  async getPersonalNote(@Param('personalId') personalId: string) {
    return await this.noteService.getPersonalNote(personalId);
  }

  @Get('/personal')
  async listPersonalNote() {
    return await this.noteService.getListsOfPersonalNotes();
  }

  @Delete('/personal/:personalId')
  async deletePersonalNote(@Param('personalId') personalId: string) {
    return await this.noteService.deletePersonalNote(personalId);
  }
}
