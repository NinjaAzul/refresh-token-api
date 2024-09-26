declare namespace NodeJS {
  enum NODE_ENV_ENUM {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    QAS = 'qas',
  }

  export interface ProcessEnv {
    NODE_ENV: NODE_ENV_ENUM;
    PORT: number;
    BASE_URL: string;
    DATABASE_URL: string;
    SHADOW_DATABASE_URL: string;
    TZ: string | 'utc';
    DISABLE_ERD: boolean;
    ERD_DEBUG: boolean;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DEFAULT_USER: string;
    DEFAULT_PASSWORD: string;
    DEFAULT_EMAIL: string;
    NEST_DEBUG: boolean;
    EMAIL_FROM_ADDRESS: string;
    EMAIL_FROM_NAME: string;
    EMAIL_USER_NAME: string;
    EMAIL_PASSWORD: string;
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    RECOVER_PASSWORD_TOKEN_EXPIRES_IN: string;
    RECOVER_PASSWORD_TOKEN_SECRET: string;
    FRONTEND_URL: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
  }
}
