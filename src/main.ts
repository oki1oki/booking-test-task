import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const { apiReference } = await import('@scalar/nestjs-api-reference');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Тестовое задание')
    .setDescription('Тестовое задание на бронирование событий')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/openapi',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
