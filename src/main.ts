import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

import { AllExceptionsFilter } from './@shared/filtersErrors/allExceptions.filter';
import { formatValidationError } from './@shared/helpers';
import { AppModule } from './app.module';
import { createLogInstance } from './log.setup';

async function bootstrap() {
  const DEVELOPMENT = process.env.NODE_ENV === 'development';

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: createLogInstance(DEVELOPMENT),
    }),
  });

  const origin = DEVELOPMENT ? ['http://localhost:3000'] : ['https://seu-outro-dominio.com'];

  app.enableCors({
    origin,
    credentials: true,
  });

  const logger = new Logger('bootstrap');

  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorFormatter: (error) => formatValidationError(error),
    }),
  );

  const port = Number(configService.get<string>('PORT', '3000'));

  await app.listen(port);

  logger.log(`Server running on port ${port} 🚀...`);
}

bootstrap();
