import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const config = (name: string) => process.env[name];

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: config('POSTGRES_HOST'),
  port: parseInt(config('POSTGRES_PORT')),
  username: config('POSTGRES_USER'),
  password: config('POSTGRES_PASSWORD'),
  database: config('POSTGRES_DATABASE'),
  logging: true,
  synchronize: false,
  autoLoadEntities: true,
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/**/migrations/*.ts'],
} as DataSourceOptions);

/** USAGE
 ## Add this on you package.json script block
  
  "typeorm": "typeorm-ts-node-commonjs -d ./src/database/config/postgres/postgres-cli.config.ts",
  "typeorm:migration:generate": "npm run typeorm migration:generate -n ",
  "typeorm:migration:run": "npm run typeorm migration:run",
  "typeorm:migration:revert": "npm run typeorm migration:revert"

## Generate migration from your entities
  
  > npm run typeorm:migration:generate "MigrationName"

## Run migration to reflect changes to your database tables
- This will run all new migration that haven't been run

  > npm run typeorm:migration:run


## Rollback previous migration

  > npm run typeorm:migration:revert

 ***/
