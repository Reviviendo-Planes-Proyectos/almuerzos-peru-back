import { Injectable } from '@nestjs/common';
import { HelloResponse } from './common/interfaces/app/hello-response.interface';
import { HealthResponse } from './common/interfaces/app/health-response.interface';

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    return {
      message: '🍽️ API de Almuerzos Perú',
      version: '1.0.0',
      status: 'active',
      timestamp: new Date().toISOString()
    };
  }

  getHealth(): HealthResponse {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  }
}
