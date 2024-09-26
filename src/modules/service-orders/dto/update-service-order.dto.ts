import { StatusEnum } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { IsString, IsNumber, IsOptional, IsInt, IsEnum } from 'class-validator';
import { I18n, polyglot } from 'src/i18n';

export class UpdateServiceOrderDTO {
  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  orderNumber?: string;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  internalCode?: string;

  @IsOptional()
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  plannedLineQty?: Decimal;

  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  plannedBobbinQty?: number;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  deliveryDate?: Date;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  dateSolicitadeByCustomer?: Date;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  newDateByCustomer?: Date;

  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  leadTimeXDateRequestDateSolicitatedByCustomer?: number;

  @IsOptional()
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  metersByPL?: Decimal;

  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.ONLY_INTEGER_MESSAGE))
  PLQty?: number;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  dateEstimatedToDelivery?: Date;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  newDateEstimatedToDeliveryLiner?: Date;

  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.STRING_MESSAGE))
  invoiceNumber?: string;

  @IsOptional()
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  productionMetersQuantity?: Decimal;

  @IsOptional()
  @IsEnum(StatusEnum, polyglot(I18n.MESSAGES.IS_ENUM_MESSAGE))
  status?: StatusEnum;

  @IsOptional()
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  customerId?: number;

  @IsOptional()
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  machineId?: number;

  @IsOptional()
  @IsNumber({}, polyglot(I18n.MESSAGES.ONLY_NUMBER_MESSAGE))
  productId?: number;
}
