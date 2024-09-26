import { Injectable } from '@nestjs/common';
import { FeatureEnum, Prisma } from '@prisma/client';

import { PrismaService } from '@libs/prisma-client';
import { FeaturesAndPermissions } from 'src/@shared/constants';

@Injectable()
export class RolesRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByName(name: string) {
    return this.prisma.role.findUnique({ where: { name } });
  }

  async create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data });
  }

  async findAll() {
    return this.prisma.role.findMany({
      include: { Permission: { include: { feature: true } } },
    });
  }

  async findOne(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
      include: { Permission: { include: { feature: true } } },
    });
  }

  async update(id: number, data: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }

  async findAllFeatures() {
    return this.prisma.feature.findMany();
  }

  async findPermissionByFeatureName(feature: FeatureEnum, userId: number) {
    return this.prisma.permission.findFirst({
      where: {
        feature: {
          feature,
        },
        role: {
          User: {
            some: {
              id: userId,
            },
          },
        },
      },
    });
  }

  async syncCustomRules(feature: FeatureEnum) {
    const featurePermissions = FeaturesAndPermissions[feature];

    const permissions = await this.prisma.permission.findMany({
      where: {
        feature: {
          feature,
        },
      },
      select: {
        roleId: true,
        featureId: true,
        customRules: true,
      },
    });

    const updatePromises = permissions.map((permission) => {
      let currentCustomRules = {};
      try {
        currentCustomRules =
          typeof permission.customRules === 'string'
            ? JSON.parse(permission.customRules)
            : permission.customRules || {};
      } catch (error) {
        console.error('Erro ao analisar customRules existentes:', error);
      }

      let newCustomRules = {};
      try {
        newCustomRules = featurePermissions.customRules || {};
      } catch (error) {
        console.error('Erro ao obter novas customRules:', error);
      }

      const mergedCustomRules = {
        ...currentCustomRules,
        ...newCustomRules,
      };

      return this.prisma.permission.updateMany({
        where: {
          featureId: permission.featureId,
          roleId: permission.roleId,
        },
        data: {
          customRules: mergedCustomRules,
        },
      });
    });

    await Promise.all(updatePromises);
  }
}
