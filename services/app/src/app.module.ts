import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    // Database Module - MongoDB
    // Database Module - PostgreSQL
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
