import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.CUSTOMER, permission: PermissionEnum.CUSTOMER.CAN_READ })
  async findAll() {
    return await this.customersService.findAll();
  }
}
