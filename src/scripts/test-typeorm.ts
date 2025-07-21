import '../crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersUseCases } from '../modules/users/application/users.use-cases';

async function testTypeORM() {
  console.log('🧪 Iniciando prueba de TypeORM...\n');

  try {
    // Crear aplicación
    const app = await NestFactory.create(AppModule, {
      logger: false,
    });

    const usersUseCases = app.get(UsersUseCases);

    // 🔍 Paso 1: Verificar tabla vacía
    console.log('1️⃣ Verificando usuarios existentes...');
    const existingUsers = await usersUseCases.getAllUsers();
    console.log(`   📊 Usuarios encontrados: ${existingUsers.length}`);
    if (existingUsers.length > 0) {
      console.log(
        '   👥 Usuarios:',
        existingUsers.map((u) => `${u.name} (${u.email})`),
      );
    }

    // 🆕 Paso 2: Crear un usuario de prueba
    console.log('\n2️⃣ Creando usuario de prueba...');
    const newUser = await usersUseCases.createUser({
      name: 'Usuario Prueba',
      email: `test_${Date.now()}@ejemplo.com`,
      phone: '+51 999 888 777',
    });
    console.log(`   ✅ Usuario creado: ${newUser.name} (ID: ${newUser.id})`);

    // 🔍 Paso 3: Buscar el usuario creado
    console.log('\n3️⃣ Buscando usuario por ID...');
    const foundUser = await usersUseCases.getUserById(newUser.id);
    console.log(
      `   🔎 Usuario encontrado: ${foundUser.name} - ${foundUser.email}`,
    );

    // ✏️ Paso 4: Actualizar el usuario
    console.log('\n4️⃣ Actualizando usuario...');
    const updatedUser = await usersUseCases.updateUser(newUser.id, {
      name: 'Usuario Actualizado',
      phone: '+51 111 222 333',
    });
    console.log(`   ✏️ Usuario actualizado: ${updatedUser.name}`);

    // 📋 Paso 5: Listar todos los usuarios
    console.log('\n5️⃣ Listando todos los usuarios...');
    const allUsers = await usersUseCases.getAllUsers();
    console.log(`   📊 Total de usuarios: ${allUsers.length}`);
    allUsers.forEach((user, index) => {
      console.log(
        `   ${index + 1}. ${user.name} - ${user.email} (Activo: ${user.isActive})`,
      );
    });

    // 🧹 Paso 6: Limpiar datos de prueba (opcional)
    console.log(
      '\n6️⃣ ¿Desea eliminar el usuario de prueba? (Por ahora lo dejamos)',
    );
    console.log(
      `   💡 Para eliminarlo manualmente: DELETE FROM users WHERE id = ${newUser.id};`,
    );

    await app.close();
    console.log('\n✅ Prueba de TypeORM completada exitosamente! 🎉');
  } catch (error) {
    console.error('\n❌ Error en la prueba:', error.message);
    if (error.code) {
      console.error(`   🔍 Código de error: ${error.code}`);
    }
    console.error(`   📝 Detalles: ${error.detail || 'No disponible'}`);
    process.exit(1);
  }
}

testTypeORM();
