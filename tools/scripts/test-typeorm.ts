import '../../src/crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { UserUseCases } from 'src/core/use-cases/user/user.use-cases';

const logger = new Logger('TypeORMTest');

export async function runUserTests(): Promise<boolean> {
  logger.log('🧪 Iniciando prueba de TypeORM...\n');

  try {
    const app = await NestFactory.create(AppModule, { logger: false });
    const usersUseCases = app.get(UserUseCases);

    logger.log('1️⃣ Verificando usuarios existentes...');
    const existingUsers = await usersUseCases.getAllUsers();
    logger.log(`   📊 Usuarios encontrados: ${existingUsers.length}`);

    logger.log('\n2️⃣ Creando usuario de prueba...');
    const newUser = await usersUseCases.createUser({
      name: 'Usuario Prueba',
      email: `test_${Date.now()}@ejemplo.com`,
      phone: '+51 999 888 777'
    });
    logger.log(`   ✅ Usuario creado: ${newUser.name} (ID: ${newUser.id})`);

    logger.log('\n3️⃣ Buscando usuario por ID...');
    const foundUser = await usersUseCases.getUserById(newUser.id);
    logger.log(`   🔎 Usuario encontrado: ${foundUser.name} - ${foundUser.email}`);

    logger.log('\n4️⃣ Actualizando usuario...');
    const updatedUser = await usersUseCases.updateUser(newUser.id, {
      name: 'Usuario Actualizado',
      phone: '+51 111 222 333'
    });
    logger.log(`   ✏️ Usuario actualizado: ${updatedUser.name}`);

    logger.log('\n5️⃣ Listando todos los usuarios...');
    const allUsers = await usersUseCases.getAllUsers();
    allUsers.forEach((user, i) => logger.log(`   ${i + 1}. ${user.name} - ${user.email} (Activo: ${user.isActive})`));

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
