import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { BotProtectionMiddleware } from './common/middleware/bot-protection.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    // Database Module - MongoDB
    // Database Module - PostgreSQL
    // Analytics Module
    // Dashboard Module
    // Planning Module
    // Design Module
    // Development Module
    // Testing Module
    // Deployment Module
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');

    consumer
      .apply(BotProtectionMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'builder/health', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
