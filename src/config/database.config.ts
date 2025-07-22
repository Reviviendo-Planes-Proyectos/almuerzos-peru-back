import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true
};

export const databaseConfig = dbConfig;
