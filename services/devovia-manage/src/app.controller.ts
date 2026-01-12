import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'getDevoviaManageHealth' })
  getHealth(): object {
    return {
      status: 'Healthy!',
      service: 'Devovia Manage Service',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
