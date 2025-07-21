import './crypto-polyfill';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('🚀 Iniciando aplicación NestJS...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🌟 Aplicación corriendo en: http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Error iniciando la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();
