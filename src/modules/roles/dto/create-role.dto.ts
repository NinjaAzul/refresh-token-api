import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ONLY_LETTERS_WITH_SPACE_REGEX } from 'src/@shared/regex';
import { I18n, polyglot } from 'src/i18n';

export class CreateRoleDTO {
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @Matches(ONLY_LETTERS_WITH_SPACE_REGEX, polyglot(I18n.MESSAGES.ONLY_LETTERS_WITH_SPACE_MESSAGE))
  @Length(3, 50, polyglot(I18n.MESSAGES.LENGTH_MESSAGE, { min: 3, max: 50 }))
  name: string;
}
