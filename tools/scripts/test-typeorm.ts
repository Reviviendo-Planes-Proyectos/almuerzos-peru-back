import './../../src/common/polyfills/crypto-polyfill';
import { DataSource } from 'typeorm';
import { logger } from '../../src/infrastructure/logger/logger';
import { loadEnvironment, getDatabaseConfig } from '../utils/env-loader';

// Cargar variables de entorno
loadEnvironment();

export async function runUserTests(): Promise<boolean> {
  logger.log('🧪 Iniciando prueba de TypeORM...');

  // Configuración directa de TypeORM sin NestJS
  const dataSource = new DataSource(getDatabaseConfig());

  try {
    await dataSource.initialize();
    logger.log('✅ Conexión a base de datos establecida');

    logger.log('1️⃣ Listando usuarios directamente desde la base de datos...');
    const allUsers = await dataSource.query(`
      SELECT id, username, email, "providerId"
      FROM users
      ORDER BY id
    `);

    logger.log(`   📊 Usuarios encontrados: ${allUsers.length}`);

    allUsers.forEach((user: any, i: number) =>
      logger.log(`   ${i + 1}. ${user.username} - ${user.email} (Provider: ${user.providerId || 'N/A'})`)
    );

    const tableInfo = await dataSource.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);

    logger.log('📋 Estructura de la tabla users:');
    tableInfo.forEach((col: any) => {
      logger.log(`   - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });

    await dataSource.destroy();
    logger.log('✅ Prueba de TypeORM completada exitosamente! 🎉');
    return true;
  } catch (error: any) {
    logger.error('❌ Error en la prueba:', error.message);
    if (error.code) logger.error(`   🔍 Código de error: ${error.code}`);
    logger.error(`   📝 Detalles: ${error.detail || 'No disponible'}`);

    return false;
  }
}

// Si se ejecuta directamente, corre la prueba
if (require.main === module) {
  runUserTests().then((ok) => {
    if (!ok) process.exit(1);
  });
}
