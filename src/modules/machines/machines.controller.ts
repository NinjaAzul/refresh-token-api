import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { MachinesService } from './machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.PRODUCTION, permission: PermissionEnum.MACHINE.CAN_READ })
  async findAll() {
    return await this.machinesService.findAll();
  }
}
