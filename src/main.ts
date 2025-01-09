import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  //Initialize new NestJS application instance. 
  const app = await NestFactory.create(AppModule);
  //global validation pipe. Only expected and validated data is passed to app
  //Validation pipe transforms and validates input data
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Pino Logger is used as a global logger
  app.useLogger(app.get(Logger));
  //Cookie parser middleware
  app.use(cookieParser());
  //helmet middleware to prevent wellknown vulnerabilities
  app.use(helmet());
  //application is listening at configured PORT
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
