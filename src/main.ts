import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })

    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('server is running on PORT 3000');
}
bootstrap();
