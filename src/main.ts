import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('🚀 Iniciando aplicación NestJS...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Configurar CORS
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3001',
      credentials: true,
    });

    // Configurar validaciones globales
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Elimina propiedades que no están en el DTO
        forbidNonWhitelisted: true, // Arroja error si hay propiedades no permitidas
        transform: true, // Transforma automáticamente los tipos
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Configurar versionado de API
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    // Prefijo global para las rutas
    app.setGlobalPrefix('api');

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🌟 Aplicación corriendo en: http://localhost:${port}`);
    console.log(`📚 API disponible en: http://localhost:${port}/api/v1`);
  } catch (error) {
    console.error('❌ Error iniciando la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();
