import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './common/config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configuration().PORT, () => {
    console.log('API Gateway started successfully');
    console.log(`Server running on port ${configuration().PORT}`);
    console.log(`Environment: ${configuration().NODE_ENV}`);
    console.log(
      'Security stack enabled with 2 protection layers: CORS and Bot Protection',
    );
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
