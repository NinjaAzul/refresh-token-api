import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { VALIDATE_PASSWORD_REGEX } from 'src/@shared/regex';
import { polyglot, I18n } from 'src/i18n';

export class ResetPasswordDTO {
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @Length(8, 50, polyglot(I18n.MESSAGES.LENGTH_MESSAGE, { min: 8, max: 50 }))
  @Matches(VALIDATE_PASSWORD_REGEX, polyglot(I18n.MESSAGES.VALIDATE_PASSWORD_MESSAGE))
  Password: string;

  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  Token: string;
}
