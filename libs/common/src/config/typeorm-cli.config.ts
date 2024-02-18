import { DataSource, DataSourceOptions } from 'typeorm';
import { configService as config } from './service.config';

export const connectionSource = new DataSource({
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
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/**/migrations/*.ts'],
} as DataSourceOptions);
