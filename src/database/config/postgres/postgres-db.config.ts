import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      migrationsTableName: 'migrations',
      type: 'postgres',
      host: this.configService.getOrThrow('POSTGRES_HOST'),
      port: parseInt(this.configService.getOrThrow('POSTGRES_PORT')),
      username: this.configService.getOrThrow('POSTGRES_USER'),
      password: this.configService.getOrThrow('POSTGRES_PASSWORD'),
      database: this.configService.getOrThrow('POSTGRES_DATABASE'),
      logging: true,
      synchronize: false,
      autoLoadEntities: true,
    };
  }
}
