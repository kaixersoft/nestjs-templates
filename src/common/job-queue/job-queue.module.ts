import { Module, Global, DynamicModule } from '@nestjs/common';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class JobQueueModule {
  static registerQueue(
    queueNames: string[],
    processors: any[],
    configService: ConfigService,
  ): DynamicModule {
    const queues: BullModuleOptions[] = queueNames.map((name) => ({
      name,
      redis: {
        host: configService.get('REDIS_HOST'),
        port: parseInt(configService.get('REDIS_PORT')),
      },
    }));

    return {
      module: JobQueueModule,
      imports: [
        BullModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            redis: {
              host: configService.get<string>('REDIS_HOST'),
              port: parseInt(configService.get<string>('REDIS_PORT')),
            },
          }),
        }),
        BullModule.registerQueue(...queues),
      ],
      providers: [...processors],
      exports: [BullModule],
    };
  }
}
