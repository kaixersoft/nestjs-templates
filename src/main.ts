import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './common/configs/main-app.config';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiVersion = 'v1';
  configureApp(app, apiVersion);

  const apiPort = parseInt(process.env.PORT) | 3000;
  await app.listen(apiPort);
  Logger.log(`Application running on port ${apiPort}`);
}
bootstrap();
