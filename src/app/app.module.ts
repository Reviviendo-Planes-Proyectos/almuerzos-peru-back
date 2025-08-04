import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';
import { HealthService } from '../core/services/health.service';
import { logger } from 'src/infrastructure/logger/logger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { AppController } from 'src/interfaces/controllers/app/app.controller';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';

// Environment file paths
const nodeEnv = process.env.NODE_ENV || 'development';
const envLocalPath = join(process.cwd(), 'config', 'environments', `${nodeEnv}.local.env`);
const envTemplatePath = join(process.cwd(), 'config', 'environments', `${nodeEnv}.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        envLocalPath, // Local file with real data
        envTemplatePath // Template file as fallback
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const sslEnabled = configService.get('DB_SSL') === 'true';

        const config = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          ssl: sslEnabled
            ? {
                rejectUnauthorized: false,
                require: true
              }
            : false,
          synchronize: configService.get('NODE_ENV') !== 'production',
          autoLoadEntities: true
        };

        logger.log(`🔧 Conectando a DB: ${config.host}:${config.port} - ${config.database}`);
        return config;
      },
      inject: [ConfigService]
    }),
    AuthenticationModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    HealthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
