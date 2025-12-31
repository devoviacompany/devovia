import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/v1')
export class AppController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get()
  getHealth(): object {
    return {
      status: 'Healthy!',
      service: 'API Gateway Service',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  // Backend Services
  @Get('app/health')
  getAppHealth() {
    return this.natsClient.send({ cmd: 'getAppHealth' }, {});
  }

  @Get('builder/health')
  getBuilderHealth() {
    return this.natsClient.send({ cmd: 'getBuilderHealth' }, {});
  }

  @Get('all_servers/health')
  getAllServersHealth() {
    return this.natsClient.send({ cmd: 'getAllServersHealth' }, {});
  }

  // AI Services
  @Get('generative_ai/health')
  getGenerativeAIHealth() {
    return this.natsClient.send({ cmd: 'getGenerativeAIHealth' }, {});
  }
}
