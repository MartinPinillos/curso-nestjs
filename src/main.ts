import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina propiedades extra en la request
      forbidNonWhitelisted: true, //lanza un error si hay propiedades extra en la request
      transform: true, //transforma los payloads a los tipos de los DTOs
      transformOptions: {
        enableImplicitConversion: true, //habilita la conversión implícita de tipos, por ejemplo, convierte strings a números si el DTO lo especifica
      },
    }),
  );
  //Habilito la serialización global para que se apliquen los decoradores de class-transformer en todas las respuestas de la aplicación, como @Exclude() para ocultar campos sensibles como la contraseña.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
