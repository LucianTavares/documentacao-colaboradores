import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API de Gerenciamento de Documentação de Colaboradores')
    .setDescription('API RESTful para gerenciamento de documentação obrigatória de colaboradores')
    .setVersion('1.0')
    .addTag('employees', 'Gerenciamento de colaboradores')
    .addTag('document-types', 'Gerenciamento de tipos de documento')
    .addTag('documents', 'Gerenciamento de documentos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Aplicação rodando na porta ${port}`);
  console.log(`📚 Documentação disponível em http://localhost:${port}/api`);
}
bootstrap();
