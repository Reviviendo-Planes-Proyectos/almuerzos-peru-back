// src/tools/scripts/check-db.ts
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { GetAllUsersUseCase } from 'src/core/use-cases/authentication/get-all-users.use-case';

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

    // 🔽 Agregado: ejecutar el caso de uso
    const getAllUsersUseCase = app.get(GetAllUsersUseCase);
    const allUsers = await getAllUsersUseCase.execute();

    logger.log(`🙋 Usuarios encontrados: ${allUsers.length}`);
    allUsers.forEach((user, index) => logger.log(`   ${index + 1}. ${user.username} - ${user.email}`));

    await app.close();
    logger.log('✅ Verificación completada');
    return true;
  } catch (error: any) {
    logger.error('❌ Error: ' + error.message);
    return false;
  }
}

// Ejecutar directamente si se corre el archivo
if (require.main === module) {
  checkDatabaseConnection().then((success) => {
    if (!success) process.exit(1);
  });
}
