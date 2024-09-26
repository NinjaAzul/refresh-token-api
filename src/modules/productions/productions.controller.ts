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
} from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { I18n, I18nContext } from 'nestjs-i18n';
import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { UpdateProductionDTO, CreateProductionDTO } from './dto';
import { ProductionsService } from './productions.service';

@Controller('productions')
@UseGuards(AuthGuard)
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) {}

  @Post('/')
  @Permissions({
    feature: FeatureEnum.PRODUCTION,
    permission: PermissionEnum.PRODUCTION.CAN_CREATE,
  })
  create(@Body() createProductionDTO: CreateProductionDTO, @I18n() i18nContext: I18nContext) {
    return this.productionsService.create(createProductionDTO, i18nContext);
  }

  @Get('/')
  @Permissions({ feature: FeatureEnum.PRODUCTION, permission: PermissionEnum.PRODUCTION.CAN_READ })
  findAll() {
    return this.productionsService.findAll();
  }

  @Get('/:id')
  @Permissions({ feature: FeatureEnum.PRODUCTION, permission: PermissionEnum.PRODUCTION.CAN_READ })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productionsService.findOne(id);
  }

  @Put('/:id')
  @Permissions({
    feature: FeatureEnum.PRODUCTION,
    permission: PermissionEnum.PRODUCTION.CAN_UPDATE,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductionDTO: UpdateProductionDTO,
    @I18n() i18nContext: I18nContext,
  ) {
    return this.productionsService.update(id, updateProductionDTO, i18nContext);
  }

  @Delete('/:id')
  @Permissions({
    feature: FeatureEnum.PRODUCTION,
    permission: PermissionEnum.PRODUCTION.CAN_DELETE,
  })
  remove(@Param('id', ParseIntPipe) id: number, @I18n() i18nContext: I18nContext) {
    return this.productionsService.remove(id, i18nContext);
  }
}
