import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullboardModule } from './bullboard/bullboard.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [BullboardModule, SampleModule],
  controllers: [AppController],
})
export class AppModule {}
