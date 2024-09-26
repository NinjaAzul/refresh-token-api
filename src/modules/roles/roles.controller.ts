import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { CreateRoleDTO, UpdateRoleDTO } from './dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CAN_CREATE,
  })
  async create(@Body() createRoleDTO: CreateRoleDTO, @I18n() i18n: I18nContext) {
    return this.rolesService.create(createRoleDTO, i18n);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CAN_READ,
  })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CAN_READ,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.findOne(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CAN_UPDATE,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDTO: UpdateRoleDTO,
    @I18n() i18nContext: I18nContext,
  ) {
    return await this.rolesService.update(id, updateRoleDTO, i18nContext);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CAN_DELETE,
  })
  async remove(@Param('id', ParseIntPipe) id: number, @I18n() i18nContext: I18nContext) {
    return await this.rolesService.remove(id, i18nContext);
  }

  @Get('/find-permission/by-feature-name/:feature')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CAN_READ,
  })
  async findPermissionByFeatureName(@Param('feature') feature: FeatureEnum, @Req() req: Request) {
    return await this.rolesService.findPermissionByFeatureName(feature, req.user.id);
  }

  @Put('/sync/custom/rules/:feature')
  @UseGuards(AuthGuard)
  @Permissions({
    feature: FeatureEnum.ROLE_PERMISSION,
    permission: PermissionEnum.ROLE_PERMISSION.CUSTOM_RULES.CAN_SYNC_CUSTOM_RULES,
  })
  async syncCustomRules(@Param('feature') feature: FeatureEnum) {
    return await this.rolesService.syncCustomRules(feature);
  }
}
