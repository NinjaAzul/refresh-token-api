/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

export const insertRolesAndFeatures = async (client: PrismaClient) => {
  try {
    const roles = await client.role.findMany();
    const features = await client.feature.findMany();

    if (roles.length === 0 || features.length === 0) {
      console.log('Nenhuma role ou feature encontrada. Abortando.');
      return;
    }

    const batch = [];

    for (const role of roles) {
      for (const feature of features) {
        batch.push(
          client.roleFeature.upsert({
            where: {
              roleId_featureId: {
                roleId: role.id,
                featureId: feature.id,
              },
            },
            create: {
              roleId: role.id,
              featureId: feature.id,
            },
            update: {},
          }),
        );
      }
    }

    await client.$transaction(batch);

    console.warn('Role-Feature relations created or updated: %d\n', batch.length);
  } catch (error) {
    console.error('Error seeding role-feature relations:', error);
  }
};
