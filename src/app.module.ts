import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NoteModule } from './note/note.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, NoteModule],
  controllers: [AppController],
})
export class AppModule {}
