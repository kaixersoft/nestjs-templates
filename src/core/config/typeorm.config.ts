import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configService as config } from './service.config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      migrationsTableName: 'migrations',
      type: 'postgres',
      host: config.get('POSTGRES_HOST'),
      port: parseInt(config.get('POSTGRES_PORT')),
      username: config.get('POSTGRES_USER'),
      password: config.get('POSTGRES_PASSWORD'),
      database: config.get('POSTGRES_DATABASE'),
      logging: true,
      synchronize: false,
      autoLoadEntities: true,
    };
  }
}
