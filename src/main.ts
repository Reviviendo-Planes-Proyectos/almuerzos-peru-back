import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    logger.log('🚀 Iniciando aplicación NestJS...');
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

    logger.log(`🌟 Aplicación corriendo en: http://0.0.0.0:${port}`);
    logger.log(`📚 API disponible en: http://0.0.0.0:${port}/api/v1`);
  } catch (error) {
    const logger = new Logger('BootstrapError');
    logger.error('❌ Error iniciando la aplicación', error.stack || error.message);
    process.exit(1);
  }
}

bootstrap();
