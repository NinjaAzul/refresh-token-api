import { IsEmail, IsInt, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ONLY_LETTERS_WITH_SPACE_REGEX, VALIDATE_PASSWORD_REGEX } from 'src/@shared/regex';
import { I18n, polyglot } from 'src/i18n';

export class UpdateUserDTO {
  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @Matches(ONLY_LETTERS_WITH_SPACE_REGEX, polyglot(I18n.MESSAGES.ONLY_LETTERS_WITH_SPACE_MESSAGE))
  @Length(3, 50, polyglot(I18n.MESSAGES.LENGTH_MESSAGE, { min: 3, max: 50 }))
  name: string;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsEmail({}, polyglot(I18n.MESSAGES.EMAIL_IS_VALID_MESSAGE))
  @Length(3, 50, polyglot(I18n.MESSAGES.LENGTH_MESSAGE, { min: 3, max: 50 }))
  email: string;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @Length(8, 50, polyglot(I18n.MESSAGES.LENGTH_MESSAGE, { min: 8, max: 50 }))
  @Matches(VALIDATE_PASSWORD_REGEX, polyglot(I18n.MESSAGES.VALIDATE_PASSWORD_MESSAGE))
  password: string;

  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  roleId: number;
}
