import { Controller, Post } from '@nestjs/common';

import { I18nContext } from 'nestjs-i18n';

import { EmailService } from './email.service';
import { TemplateEnum } from './enum/template.enum';
import { TEMPLATE_TRANSLATIONS } from './i18n';

const i18n = I18nContext.current();
const language = i18n?.lang || 'en';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  async sendMail() {
    await this.emailService.sendMail({
      to: 'lionnard@live.com',
      subject: TEMPLATE_TRANSLATIONS[language].proposal.subject,
      template: TemplateEnum.PROPOSAL,
      context: {
        data: {
          name: 'example',
          url: 'http://localhost:4200/reset-password?Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjczLCJpYXQiOjE2ODQ4NzA3NjgsImV4cCI6MTY4NDg3NDM2OH0.A8mw5DPe4ZimfqmQDGhWAyYKlbYb6F5D_YCzrp9g2Ow',
        },
        templateConfig: {
          paragraph1: 'Por favor, valide seu e-mail para continuar.',
          paragraph2: 'Clique no link abaixo para verificar seu endereço de e-mail.',
          paragraph3: 'Se você não solicitou esta verificação, por favor ignore este e-mail.',
          paragraph4: 'Obrigado por usar nossos serviços.',
          button: 'Verificar E-mail',
          copyright: {
            developedBy: 'Desenvolvido por Fake Company',
            copyright: '© 2024 Fake Company. Todos os direitos reservados.',
            developedURL: 'https://www.fakecompany.com',
          },
        },
      },
    });
  }
}
