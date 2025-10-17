import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);

  const config = new DocumentBuilder()
    .setTitle('Minha API NestJS')
    .setDescription('API desenvolvida com NestJS e Sequelize')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth() // Para autenticação JWT
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log('Documentação disponível em: http://localhost:3000/api');



}
bootstrap();
