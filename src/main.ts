import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth api example')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addTag('NestJs')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  const PORT = configService.get('PORT');
  await app.listen(PORT);
}
bootstrap();
