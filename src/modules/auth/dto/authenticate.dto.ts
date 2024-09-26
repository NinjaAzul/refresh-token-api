import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { polyglot, I18n } from 'src/i18n';

export class AuthenticateDTO {
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsEmail({}, polyglot(I18n.MESSAGES.EMAIL_IS_VALID_MESSAGE))
  @Length(3, 50, polyglot(I18n.MESSAGES.LENGTH_MESSAGE, { min: 3, max: 50 }))
  email: string;

  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  password: string;
}
