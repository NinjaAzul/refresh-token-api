import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
  Req,
  Query,
} from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { CreateServiceOrderDTO, FilterServiceOrdersDto, UpdateServiceOrderDTO } from './dto';
import { ServiceOrdersService } from './service-orders.service';

@Controller('service-orders')
@UseGuards(AuthGuard)
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Post('/')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_CREATE,
  })
  create(@Body() createServiceOrderDTO: CreateServiceOrderDTO, @I18n() i18nContext: I18nContext) {
    return this.serviceOrdersService.create(createServiceOrderDTO, i18nContext);
  }

  @Get('/')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_READ,
  })
  findAll(@Query() filters: FilterServiceOrdersDto, @Req() req: Request) {
    return this.serviceOrdersService.findAll(filters, req.user.id);
  }

  @Get('/:id')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_READ,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceOrdersService.findOne(id);
  }

  @Put('/:id')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_UPDATE,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceOrderDTO: UpdateServiceOrderDTO,
    @I18n() i18nContext: I18nContext,
  ) {
    return this.serviceOrdersService.update(id, updateServiceOrderDTO, i18nContext);
  }

  @Delete('/:id')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_DELETE,
  })
  remove(@Param('id', ParseIntPipe) id: number, @I18n() i18nContext: I18nContext) {
    return this.serviceOrdersService.remove(id, i18nContext);
  }

  @Get('/find-all/with-productions')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_READ,
  })
  findAllWithProductions() {
    return this.serviceOrdersService.findAllWithProductions();
  }

  @Put('/:id/send-to-production')
  @Permissions({
    feature: FeatureEnum.SERVICE_ORDER,
    permission: PermissionEnum.SERVICE_ORDER.CAN_UPDATE,
  })
  sendToProduction(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @I18n() i18nContext: I18nContext,
  ) {
    return this.serviceOrdersService.sendToProduction(id, req.user.id, i18nContext);
  }
}
