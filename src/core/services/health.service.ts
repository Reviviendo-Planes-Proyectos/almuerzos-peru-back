import { Injectable } from '@nestjs/common';
import { HealthResponse } from '../use-cases/health/health-response.interface';
import { HelloResponse } from '../use-cases/hello/hello-response.interface';

@Injectable()
export class HealthService {
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
