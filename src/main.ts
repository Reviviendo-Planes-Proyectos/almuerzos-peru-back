import './common/polyfills/crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { DataSource } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from 'src/infrastructure/logger/logger';

async function bootstrap() {
  try {
    logger.log('🚀 Iniciando aplicación NestJS...', 'Bootstrap');
    const app = await NestFactory.create(AppModule, {
      logger: logger
    });

    const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [];
    logger.log(`process.env.FRONTEND_URL: ${process.env.FRONTEND_URL}`, 'Bootstrap');

    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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

    // Swagger config
    const config = new DocumentBuilder()
      .setTitle('Almuerzos Perú API')
      .setDescription('Documentación de la API REST de Almuerzos Perú')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

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
    logger.log(`📝 Swagger UI: http://0.0.0.0:${port}/api/docs`, 'Bootstrap');
  } catch (error) {
    logger.error('❌ Error iniciando la aplicación', error.stack || error.message, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();
