import { IsNotEmpty, IsString } from 'class-validator';
import { polyglot, I18n } from 'src/i18n';

export class ValidateRecoverPasswordTokenDTO {
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  Token: string;
}
