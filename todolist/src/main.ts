import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'//tz = time zone e esta colocando três horas a menos, ficando igual ao horario de brasilia

  app.useGlobalPipes(new ValidationPipe())//Habilitou as validações em todas as aplicações

  app.enableCors()// Permite que outros dominios consumam a API

  await app.listen(3000);
}
bootstrap();
