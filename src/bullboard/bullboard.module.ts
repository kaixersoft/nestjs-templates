import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Logger,
  Inject,
} from '@nestjs/common';
import { BullboardController } from './bullboard.controller';
import { ConfigModule } from '@nestjs/config';
import { createBullBoard } from 'bull-board';
import { BullMQAdapter } from 'bull-board/dist/queueAdapters/bullMQ';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname + '../../.env'),
    }),
  ],
  controllers: [BullboardController],
  providers: [],
})
export class BullboardModule implements NestModule {
  private readonly logger = new Logger(BullboardModule.name);

  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  async configure(consumer: MiddlewareConsumer) {
    const connectionOpts = {
      host: this.configService.getOrThrow('REDIS_HOST'),
      port: parseInt(this.configService.getOrThrow('REDIS_PORT')),
    };

    this.logger.debug('REDIS CONNECTION', connectionOpts);

    // Register QueueName here
    const queueName = this.configService.getOrThrow('QUEUE_NAMES');
    const DBqueueNames = queueName.split(',').map((item) => item.trim());

    this.logger.debug('DBqueueNames', DBqueueNames);

    const bullAdapters = DBqueueNames.map(
      (queueName) =>
        new BullMQAdapter(
          new Queue(queueName, {
            connection: connectionOpts,
          }),
        ),
    );

    const { router } = createBullBoard(bullAdapters);

    consumer.apply(router).forRoutes('dashboard');
  }
}
