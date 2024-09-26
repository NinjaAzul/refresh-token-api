import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.PRODUCT, permission: PermissionEnum.PRODUCT.CAN_READ })
  async findAll() {
    return await this.productsService.findAll();
  }
}
