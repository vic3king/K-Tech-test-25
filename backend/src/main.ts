import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { setupSwaggerDocs } from './setupSwagger';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main Application');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // For Class Validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (process.env.NODE_ENV != 'production') {
    setupSwaggerDocs(app);
  }

  await app.listen(process.env.PORT || 4000);

  logger.log(
    `Test API is running on: http://127.0.0.1:${process.env.PORT || 4000}/v1`,
  );

  logger.log(
    `Test API Docs is running on: http://127.0.0.1:${process.env.PORT || 4000}/docs`,
  );
}
bootstrap();
