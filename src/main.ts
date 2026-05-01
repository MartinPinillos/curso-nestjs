import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina propiedades extra en la request
      forbidNonWhitelisted: true, //lanza un error si hay propiedades extra en la request
      transform: true, //transforma los payloads a los tipos de los DTOs
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
