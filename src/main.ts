import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { EmployeesModule } from './employees/employees.module';

async function bootstrap() {
  const app = await NestFactory.create(EmployeesModule);

  const config = new DocumentBuilder()
    .setTitle('Employees API')
    .setDescription('APIs for CRUD operations')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
bootstrap();
