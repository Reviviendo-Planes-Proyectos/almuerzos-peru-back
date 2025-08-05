import '../../src/common/polyfills/crypto-polyfill';
import { DataSource } from 'typeorm';
import { logger } from '../../src/infrastructure/logger/logger';
import { loadEnvironment, getDatabaseConfig } from '../utils/env-loader';

// Cargar variables de entorno
loadEnvironment();

logger.log('🚀 Verificación de base de datos iniciada');

export async function checkDatabaseConnection(): Promise<boolean> {
  logger.log('🔥 Conectando directamente a la base de datos...');

  const dataSource = new DataSource(getDatabaseConfig());

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
    logger.error('🔍 Código de error:', error.code);
    logger.error('🔧 Configuración intentada:');
    logger.error(`   Host: ${(dataSource.options as any).host}`);
    logger.error(`   Puerto: ${(dataSource.options as any).port}`);
    logger.error(`   Usuario: ${(dataSource.options as any).username}`);
    logger.error(`   Base de datos: ${String(dataSource.options.database)}`);
    logger.error(`   SSL: ${JSON.stringify((dataSource.options as any).ssl)}`);
    return false;
  }
}

// Ejecutar directamente si se corre el archivo
if (require.main === module) {
  checkDatabaseConnection().then((success) => {
    if (!success) process.exit(1);
  });
}
