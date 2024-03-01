import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullboardModule } from './bullboard/bullboard.module';
import { SampleModule } from './sample/sample.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [BullboardModule, SampleModule, ProfileModule],
  controllers: [AppController],
})
export class AppModule {}
