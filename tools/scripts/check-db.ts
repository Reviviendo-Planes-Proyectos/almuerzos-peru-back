import '../../src/crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';

export async function checkDatabaseConnection(): Promise<boolean> {
  const logger = new Logger('DBCheck');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log']
    });

    const dataSource = app.get(DataSource);

    if (!dataSource.isInitialized) {
      logger.error('❌ Conexión fallida');
      await app.close();
      return false;
    }

    logger.log('✅ Conexión exitosa');
    logger.log(`📊 Base de datos: ${(dataSource.options as any).database}`);
    logger.log(`🏠 Host: ${(dataSource.options as any).host}`);

    const result = await dataSource.query('SELECT NOW() as current_time');
    logger.log(`⏰ Tiempo servidor: ${result[0].current_time}`);

    await app.close();
    logger.log('✅ Verificación completada');
    return true;
  } catch (error: any) {
    logger.error('❌ Error: ' + error.message);
    return false;
  }
}

if (require.main === module) {
  checkDatabaseConnection().then((success) => {
    if (!success) process.exit(1);
  });
}
