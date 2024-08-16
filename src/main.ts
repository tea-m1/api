import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const app = await NestFactory.create(AppModule, {
    cors: true,
    headers: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
