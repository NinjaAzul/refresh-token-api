import { IsDecimal, IsInt, IsString, IsOptional } from 'class-validator';
import { I18n, polyglot } from 'src/i18n';

export class UpdateProductionDTO {
  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  itemNumber?: number;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  deliveredDate?: Date;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  mp?: string;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  numberBS?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' }, polyglot(I18n.MESSAGES.ONLY_DECIMAL_MESSAGE))
  producedLineQty?: number;

  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  producedBobbinQty?: number;
}
