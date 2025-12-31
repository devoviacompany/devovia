import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { NatsClientModule } from './common/nats-client/nats-client.module';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { BotProtectionMiddleware } from './common/middleware/bot-protection.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    // Nats Client
    NatsClientModule,
    //* App Services
    //? Builder Services
    //! Generative AI Services
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
        { path: 'app/health', method: RequestMethod.GET },
        { path: 'builder/health', method: RequestMethod.GET },
        { path: 'all_servers/health', method: RequestMethod.GET },
        { path: 'generative_ai/health', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
