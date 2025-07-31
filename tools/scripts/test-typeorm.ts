import '../../src/crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { GetAllUsersUseCase } from 'src/core/use-cases/authentication/get-all-users.use-case';

const logger = new Logger('TypeORMTest');

export async function runUserTests(): Promise<boolean> {
  logger.log('🧪 Iniciando prueba de TypeORM...\n');

  try {
    const app = await NestFactory.create(AppModule, { logger: false });

    const getAllUsersUseCase = app.get(GetAllUsersUseCase);

    logger.log('1️⃣ Listando usuarios con GetAllUsersUseCase...');
    const allUsers = await getAllUsersUseCase.execute();
    logger.log(`   📊 Usuarios encontrados: ${allUsers.length}`);

    allUsers.forEach((user, i) =>
      logger.log(`   ${i + 1}. ${user.username} - ${user.email} (Provider: ${user.providerId})`)
    );

    await app.close();
    logger.log('\n✅ Prueba de TypeORM completada exitosamente! 🎉');
    return true;
  } catch (error: any) {
    logger.error('\n❌ Error en la prueba:', error.message);
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
