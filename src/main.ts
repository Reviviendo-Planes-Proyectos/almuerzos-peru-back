import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('🚀 Iniciando aplicación NestJS...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    });

    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3001',
      credentials: true
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    );

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1'
    });

    app.setGlobalPrefix('api');

    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0'); // ← clave para Fly.io

    console.log(`🌟 Aplicación corriendo en: http://0.0.0.0:${port}`);
    console.log(`📚 API disponible en: http://0.0.0.0:${port}/api/v1`);
  } catch (error) {
    console.error('❌ Error iniciando la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();
