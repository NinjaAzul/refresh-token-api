import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FeatureEnum, Prisma } from '@prisma/client';

import { I18nContext } from 'nestjs-i18n';
import { FeaturesAndPermissions, PermissionEnum } from 'src/@shared/constants';
import { I18n } from 'src/i18n';

import { CreateRoleDTO, UpdateRoleDTO } from './dto';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(createRoleDTO: CreateRoleDTO, i18nContext: I18nContext) {
    const { name } = createRoleDTO;

    const roleAlreadyExists = await this.rolesRepository.findOneByName(name);

    if (roleAlreadyExists)
      throw new BadRequestException(
        i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_ALREADY_EXISTS.KEY),
      );

    const inputRoleCreate: Prisma.RoleCreateInput = {
      name,
      Permission: {
        create: await this.createAllPermissions(),
      },
    };

    const { id } = await this.rolesRepository.create(inputRoleCreate);

    return {
      message: i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_CREATED_SUCCESSFULLY.KEY),
      id,
    };
  }

  async findAll() {
    return await this.rolesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.rolesRepository.findOne(id);
  }

  async update(roleId: number, updateRoleDTO: UpdateRoleDTO, i18nContext: I18nContext) {
    const { name, permissions } = updateRoleDTO;

    const hasRoleData = await this.rolesRepository.findOne(roleId);

    if (!hasRoleData)
      throw new BadRequestException(
        i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_NOT_FOUND.KEY),
      );

    if (name) {
      const nameAlreadyExists = await this.rolesRepository.findOneByName(name);

      if (nameAlreadyExists && nameAlreadyExists.id !== roleId)
        throw new BadRequestException(
          i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_ALREADY_EXISTS.KEY),
        );
    }

    const inputUpdateRoleDTO: Prisma.RoleUpdateInput = {
      name,
      Permission: {
        updateMany: permissions?.map((permission) => ({
          where: { featureId: permission.featureId },
          data: {
            canCreate: permission.canCreate,
            canRead: permission.canRead,
            canUpdate: permission.canUpdate,
            canDelete: permission.canDelete,
            canFilter: permission.canFilter,
            canCustom: permission.canCustom,
            customRules: permission.customRules ? JSON.stringify(permission.customRules) : '{}',
          },
        })),
      },
    };

    const { id } = await this.rolesRepository.update(roleId, inputUpdateRoleDTO);

    return {
      message: i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_UPDATED_SUCCESSFULLY.KEY),
      id,
    };
  }

  async remove(id: number, i18nContext: I18nContext) {
    const role = await this.findOne(id);

    if (!role) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_NOT_FOUND.KEY),
      );
    }

    const { id: roleId } = await this.rolesRepository.remove(id);

    return {
      message: i18nContext.translate(I18n.MODULES.ROLES_SERVICE.ROLE_DELETED_SUCCESSFULLY.KEY, {}),
      id: roleId,
    };
  }

  async findPermissionByFeatureName(feature: FeatureEnum, userId: number) {
    return await this.rolesRepository.findPermissionByFeatureName(feature, userId);
  }

  async syncCustomRules(feature: FeatureEnum) {
    return await this.rolesRepository.syncCustomRules(feature);
  }

  private async createAllPermissions(): Promise<Prisma.PermissionCreateWithoutRoleInput[]> {
    const features = await this.rolesRepository.findAllFeatures();
    return features.map((feature) => {
      const featurePermissions = FeaturesAndPermissions[feature.feature];
      const featureEnum = feature.feature as FeatureEnum;
      return {
        feature: { connect: { id: feature.id } },
        canCreate: featurePermissions[PermissionEnum[featureEnum].CAN_CREATE],
        canRead: featurePermissions[PermissionEnum[featureEnum].CAN_READ],
        canUpdate: featurePermissions[PermissionEnum[featureEnum].CAN_UPDATE],
        canDelete: featurePermissions[PermissionEnum[featureEnum].CAN_DELETE],
        canFilter: featurePermissions[PermissionEnum[featureEnum].CAN_FILTER],
        canCustom: featurePermissions[PermissionEnum[featureEnum].CAN_CUSTOM],
        customRules: featurePermissions.customRules,
      };
    });
  }
}
