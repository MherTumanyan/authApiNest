import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./src/config/.env.dev`],
      validationSchema: configValidationSchema,
      cache: true,
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
    //database url
    'mongodb://localhost/mOneTask'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


