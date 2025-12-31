import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return health check', () => {
      const result = appController.getHealth();
      expect(result).toEqual({
        status: 'Healthy!',
        service: 'API Gateway Service',
        version: '1.0.0',
        timestamp: expect.any(String) as unknown as string,
      });
    });
  });

  it('should call getAppHealth', () => {
    const result = appController.getAppHealth();
    expect(result).toBeDefined();
  });

  it('should call getBuilderHealth', () => {
    const result = appController.getBuilderHealth();
    expect(result).toBeDefined();
  });

  it('should call getAllServersHealth', () => {
    const result = appController.getAllServersHealth();
    expect(result).toBeDefined();
  });

  it('should call getGenerativeAIHealth', () => {
    const result = appController.getGenerativeAIHealth();
    expect(result).toBeDefined();
  });
});
