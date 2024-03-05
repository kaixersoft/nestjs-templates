import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullboardModule } from './bullboard/bullboard.module';
import { SampleModule } from './sample/sample.module';
import { RbacModule } from './common/rbac-module/rbac.module';

@Module({
  imports: [
    BullboardModule, // BullBoard Dashboard UI
    RbacModule.register(), // RBAC
    SampleModule, // Sample module
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
