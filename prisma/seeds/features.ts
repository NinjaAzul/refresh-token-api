/* eslint-disable no-console */
import { PrismaClient, Feature, FeatureEnum } from '@prisma/client';

const features: Feature[] = [
  { id: 1, name: 'Produção', feature: FeatureEnum.PRODUCTION },
  { id: 2, name: 'Usuários', feature: FeatureEnum.USER },
  { id: 3, name: 'Ordem de serviço', feature: FeatureEnum.SERVICE_ORDER },
  { id: 4, name: 'Produtos', feature: FeatureEnum.PRODUCT },
  { id: 5, name: 'Máquinas', feature: FeatureEnum.MACHINE },
  { id: 6, name: 'Clientes', feature: FeatureEnum.CUSTOMER },
  { id: 7, name: 'Cargos', feature: FeatureEnum.ROLE_PERMISSION },
];

export const insertFeatures = async (client: PrismaClient) => {
  try {
    const batch = [];

    for (const feature of features) {
      batch.push(
        client.feature.upsert({
          create: feature,
          update: feature,
          where: { id: feature.id },
        }),
      );
    }

    await client.$transaction(batch);

    console.warn('Features created: %d\n', features.length);
  } catch (error) {
    console.error('Error seeding features', error);
  }
};
