import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

import { validate } from './environments/env.validation';
import {
  UsersModule,
  AuthModule,
  EmailModule,
  SessionModule,
  SchedulesModule,
  CustomersModule,
  MachinesModule,
  ProductsModule,
  RolesModule,
  ProductionsModule,
  ServiceOrdersModule,
} from './modules';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'pt-BR',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    SessionModule,
    SchedulesModule,
    CustomersModule,
    MachinesModule,
    ProductsModule,
    RolesModule,
    ServiceOrdersModule,
    ProductionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
