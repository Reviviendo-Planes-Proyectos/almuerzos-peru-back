import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../../../core/services/HealthService.service';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: HealthService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): object {
    return this.appService.getHealth();
  }
}
