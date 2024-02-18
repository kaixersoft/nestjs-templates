import { NestFactory } from '@nestjs/core';
import { BullboardModule } from './bullboard.module';

async function bootstrap() {
  const app = await NestFactory.create(BullboardModule);
  await app.listen(3100);
}
bootstrap();
