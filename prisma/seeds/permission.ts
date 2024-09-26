/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

import { FeaturesAndPermissions, PermissionEnum } from '../../src/@shared/constants';

export const insertPermissions = async (client: PrismaClient) => {
  try {
    const rolesAndFeatures = await client.roleFeature.findMany({
      include: {
        feature: true,
      },
    });
    if (rolesAndFeatures.length === 0) {
      console.log('Nenhum Role-Feature encontrado. Abortando.');
      return;
    }

    const batch = [];

    for (const roleFeature of rolesAndFeatures) {
      const featurePermissions = FeaturesAndPermissions[roleFeature.feature.feature];
      const customRules = featurePermissions.customRules;

      const existingPermission = await client.permission.findUnique({
        where: {
          featureId_roleId: {
            featureId: roleFeature.featureId,
            roleId: roleFeature.roleId,
          },
        },
      });

      if (!existingPermission) {
        batch.push(
          client.permission.create({
            data: {
              canCreate: featurePermissions[PermissionEnum[roleFeature.feature.feature].CAN_CREATE],
              canRead: featurePermissions[PermissionEnum[roleFeature.feature.feature].CAN_READ],
              canUpdate: featurePermissions[PermissionEnum[roleFeature.feature.feature].CAN_UPDATE],
              canDelete: featurePermissions[PermissionEnum[roleFeature.feature.feature].CAN_DELETE],
              canFilter: featurePermissions[PermissionEnum[roleFeature.feature.feature].CAN_FILTER],
              canCustom: featurePermissions[PermissionEnum[roleFeature.feature.feature].CAN_CUSTOM],
              customRules: JSON.stringify(customRules),
              featureId: roleFeature.featureId,
              roleId: roleFeature.roleId,
            },
          }),
        );
      }
    }

    if (batch.length > 0) {
      await client.$transaction(batch);
      console.warn('Permissões criadas: %d\n', batch.length);
    } else {
      console.warn('Nenhuma nova permissão criada. Todas as permissões já existem.');
    }
  } catch (error) {
    console.error('Erro ao criar permissões:', error);
  }
};
