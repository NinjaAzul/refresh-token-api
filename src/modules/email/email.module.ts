import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';

import path from 'path';

import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { helpers } from './templates/helpers';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          secure: true, // true for 465, false for other ports
          port: process.env.EMAIL_PORT,
          host: process.env.EMAIL_HOST,
          auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: process.env.EMAIL_FROM_ADDRESS,
        },
        template: {
          dir: path.resolve(process.cwd(), 'dist', 'modules', 'email', 'templates', 'pages'),
          adapter: new HandlebarsAdapter(helpers),
          options: {
            strict: true,
            extName: '.hbs',
          },
        },
        options: {
          partials: {
            dir: path.resolve(process.cwd(), 'dist', 'modules', 'email', 'templates', 'partials'),
            options: {
              strict: true,
              extname: '.hbs',
            },
          },
        },
      }),
    }),
  ],
})
export class EmailModule {}
