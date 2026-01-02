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
export class AppModule {}
