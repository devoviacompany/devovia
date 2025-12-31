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
    //? All Backend Services Modules
    // Database Module - MongoDB
    // Database Module - PostgreSQL
    //! App modules
    // Auth Module
    // Account Module
    // Billing Module
    // Blogs Module
    // Chat Module
    // Community Module
    // Feedback Module
    // Marketplace Module
    // Notification Module
    // Payment Module
    // Search Module
    // Settings Module
    // Support Module
    // Tutorial Module
    //! Builder modules
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
        { path: 'all_servers/health', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
