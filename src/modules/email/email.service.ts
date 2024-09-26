import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mail: ISendMailOptions): Promise<void> {
    await this.mailerService.sendMail({
      ...mail,
    });
  }
}
