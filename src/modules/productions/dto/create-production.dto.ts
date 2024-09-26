import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { I18n, polyglot } from 'src/i18n';

export class CreateProductionDTO {
  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  itemNumber: number;

  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  deliveredDate: Date;

  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  mp: string;

  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  numberBS: string;

  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  producedLineQty: number;

  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  producedBobbinQty: number;

  @IsNotEmpty(polyglot(I18n.MESSAGES.NOT_EMPTY_MESSAGE))
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  serviceOrderId: number;
}
