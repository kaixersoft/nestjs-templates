import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullboardModule } from './bullboard/bullboard.module';
import { SampleModule } from './sample/sample.module';
import { RbacModule } from './common/rbac-module/rbac.module';

@Module({
  imports: [
    // PLUG N PLAY MODULES
    BullboardModule, // BullBoard Dashboard UI
    RbacModule.register(), // RBAC

    // Register your new feature modules here...
    SampleModule, // Sample module
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
