import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { HealthService } from '../../../../core/services/health.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [HealthService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API information', () => {
      const result = appController.getHello();
      expect(result).toHaveProperty('message', '🍽️ API de Almuerzos Perú');
      expect(result).toHaveProperty('version', '1.0.0');
      expect(result).toHaveProperty('status', 'active');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('health', () => {
    it('should return health status', () => {
      const result = appController.getHealth();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('version', '1.0.0');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('environment fallback', () => {
    it('should default to development if NODE_ENV is undefined', () => {
      const originalEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;

      const appService = new HealthService();
      const result = appService.getHealth();

      expect(result.environment).toBe('development');

      process.env.NODE_ENV = originalEnv;
    });
  });
});
