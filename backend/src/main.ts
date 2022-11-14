import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('main.ts - server');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:7778',
  });
  app.use(cookieParser());
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']); // TODO rm for prod
  const port: number = (process.env.PORT_SERVER ? parseInt(process.env.PORT_SERVER) : 3000);
  await app.listen(port);
  logger.log(`Server start on port ${port}`);
}

bootstrap();
