import { Logger, BadRequestException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
  IsNotEmpty,
} from 'class-validator';

enum NODE_ENV_ENUM {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  QAS = 'qas',
}

class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(NODE_ENV_ENUM)
  NODE_ENV: NODE_ENV_ENUM;

  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  @IsOptional()
  @IsString()
  SHADOW_DATABASE_URL: string;

  @IsOptional()
  @IsString()
  TZ: string | 'utc';

  @IsOptional()
  @IsBoolean()
  DISABLE_ERD: boolean;

  @IsOptional()
  @IsBoolean()
  ERD_DEBUG: boolean;

  @IsOptional()
  @IsBoolean()
  NEST_DEBUG: boolean;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  DEFAULT_USER: string;

  @IsNotEmpty()
  @IsString()
  DEFAULT_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DEFAULT_EMAIL: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_FROM_ADDRESS: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_FROM_NAME: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_USER_NAME: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  EMAIL_PORT: number;

  @IsNotEmpty()
  @IsString()
  RECOVER_PASSWORD_TOKEN_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  RECOVER_PASSWORD_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  REFRESH_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  FRONTEND_URL: string;

  @IsNotEmpty()
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const logger = new Logger('EnvironmentVariables');

  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    errors.map((error) => {
      logger.warn(error.toString());
    });
    throw new BadRequestException('Environment variables validation failed');
  }
  return validatedConfig;
}
