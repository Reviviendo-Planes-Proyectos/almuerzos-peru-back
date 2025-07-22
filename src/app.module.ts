import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Determinar configuración SSL
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
                // Especificar configuración SSL explícita para evitar problemas con crypto
                require: true
              }
            : false,
          synchronize: configService.get('NODE_ENV') !== 'production',
          autoLoadEntities: true
        };

        console.log('🔧 TypeORM Config:', {
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password ? '***' + config.password.slice(-3) : 'undefined',
          database: config.database
        });

        return config;
      },
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
