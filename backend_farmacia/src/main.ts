import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Agregar prefijo global para todas las rutas
  app.enableVersioning({type:VersioningType.URI, defaultVersion:'1'});
  app.enableCors(); // Habilitar CORS para permitir solicitudes desde el frontend

  // Habilitar validación global de DTOs
  const config = new DocumentBuilder()
    .setTitle('API REST Farmacia -SIS257')
    .setDescription('API REST PARA LA GEASTION DE FARMACIA DE LA MATERIA SIS257')
    .setVersion('1.0')
    .addTag('MEDICAMENTO ,USUARIOS, LOTES, VENTAS, DETALLE VENTAS')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en el puerto ${await app.getUrl()}`);
}
bootstrap();
