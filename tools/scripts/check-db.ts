import '../../src/common/polyfills/crypto-polyfill';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { logger } from '../../src/infrastructure/logger/logger';

// Cargar variables de entorno
dotenv.config();

logger.log('🚀 Verificación de base de datos iniciada');

export async function checkDatabaseConnection(): Promise<boolean> {
  logger.log('🔥 Conectando directamente a la base de datos...');

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: false
  });

  try {
    await dataSource.initialize();
    logger.log('✅ Conexión exitosa');
    logger.log(`📊 Base de datos: ${String(dataSource.options.database)}`);
    logger.log(`🏠 Host: ${(dataSource.options as any).host}`);

    const result = await dataSource.query('SELECT NOW() as current_time');
    logger.log(`⏰ Tiempo servidor: ${result[0].current_time}`);

    // Consultar usuarios directamente
    const users = await dataSource.query('SELECT id, username, email FROM users ORDER BY id');
    logger.log(`🙋 Usuarios encontrados: ${users.length}`);
    users.forEach((user: any, index: number) => {
      logger.log(`   ${index + 1}. ${user.username} - ${user.email}`);
    });

    await dataSource.destroy();
    logger.log('✅ Verificación completada');
    return true;
  } catch (error: any) {
    logger.error('❌ Error:', error.message);
    return false;
  }
}

// Ejecutar directamente si se corre el archivo
if (require.main === module) {
  checkDatabaseConnection().then((success) => {
    if (!success) process.exit(1);
  });
}
