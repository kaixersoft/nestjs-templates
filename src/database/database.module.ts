import { Module } from '@nestjs/common';
import PostgresConfig from './config/postgres/postgres-db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
