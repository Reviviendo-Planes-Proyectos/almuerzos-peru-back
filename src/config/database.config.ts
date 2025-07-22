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

console.log('📦 DB CONFIG:', {
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: '***' + String(process.env.DB_PASSWORD).slice(-3),
  database: dbConfig.database
});

export const databaseConfig = dbConfig;
