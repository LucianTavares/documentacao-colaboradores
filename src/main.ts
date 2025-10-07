import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração de CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Aplicação rodando na porta ${port}`);
}
bootstrap();
