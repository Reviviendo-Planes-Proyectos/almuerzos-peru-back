import '../crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

async function checkDatabaseConnection() {
  console.log('🔍 Verificando conexión a la base de datos...');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    const dataSource = app.get(DataSource);

    if (dataSource.isInitialized) {
      console.log('✅ Conexión exitosa');
      console.log(`📊 Base de datos: ${(dataSource.options as any).database}`);
      console.log(`🏠 Host: ${(dataSource.options as any).host}`);

      // Consulta de prueba
      const result = await dataSource.query('SELECT NOW() as current_time');
      console.log(`⏰ Tiempo servidor: ${result[0].current_time}`);
    } else {
      console.log('❌ Conexión fallida');
    }

    await app.close();
    console.log('✅ Verificación completada');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabaseConnection();
