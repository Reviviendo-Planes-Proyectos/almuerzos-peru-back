import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { logger } from './common/logger/logger';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  try {
    logger.log('🚀 Iniciando aplicación NestJS...', 'Bootstrap');
    const app = await NestFactory.create(AppModule, {
      logger: logger
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
    const dataSource = app.get(DataSource);

    await app.listen(port, '0.0.0.0');

    if (dataSource.isInitialized) {
      logger.log(`✅ Base de datos conectada: ${String(dataSource.options.database)}`, 'Bootstrap');
    } else {
      logger.error('❌ Base de datos NO conectada', undefined, 'Bootstrap');
    }

    logger.log(`🌟 Aplicación corriendo en: http://0.0.0.0:${port}`, 'Bootstrap');
    logger.log(`📚 API disponible en: http://0.0.0.0:${port}/api/v1`, 'Bootstrap');
  } catch (error) {
    logger.error('❌ Error iniciando la aplicación', error.stack || error.message, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();
