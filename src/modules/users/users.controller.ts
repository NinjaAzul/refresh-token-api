import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { I18n, I18nContext } from 'nestjs-i18n';
import { PermissionEnum } from 'src/@shared/constants';
import { Permissions } from 'src/@shared/decorators';
import { AuthGuard } from 'src/@shared/guards';

import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.USER, permission: PermissionEnum.USER.CAN_CREATE })
  async create(@Body() createUserDTO: CreateUserDTO, @I18n() i18nContext: I18nContext) {
    return this.usersService.create(createUserDTO, i18nContext);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.USER, permission: PermissionEnum.USER.CAN_READ })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.USER, permission: PermissionEnum.USER.CAN_READ })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.USER, permission: PermissionEnum.USER.CAN_UPDATE })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDTO: UpdateUserDTO,
    @I18n() i18nContext: I18nContext,
  ) {
    return await this.usersService.update(id, updateUserDTO, i18nContext);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @Permissions({ feature: FeatureEnum.USER, permission: PermissionEnum.USER.CAN_DELETE })
  async remove(@Param('id', ParseIntPipe) id: number, @I18n() i18nContext: I18nContext) {
    return await this.usersService.remove(id, i18nContext);
  }
}
