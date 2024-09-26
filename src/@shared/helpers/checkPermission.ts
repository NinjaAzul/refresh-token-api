import { FeatureEnum, Permission, PrismaClient } from '@prisma/client';

export async function checkPermission(
  userId: number,
  feature: FeatureEnum,
  permission: string,
): Promise<boolean> {
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: {
        select: {
          id: true,
          name: true,
          Permission: {
            select: {
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              canFilter: true,
              canCustom: true,
              customRules: true,
              feature: {
                select: {
                  name: true,
                  feature: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const userPermission = user.role.Permission.find((p) => p.feature.feature === feature);
  if (!userPermission) return false;

  let customRules: Record<string, boolean> = {};
  if (typeof userPermission.customRules === 'object') {
    customRules = userPermission.customRules as Record<string, boolean>;
  } else if (typeof userPermission.customRules === 'string') {
    try {
      customRules = JSON.parse(userPermission.customRules);
    } catch (error) {
      console.error('Erro ao analisar customRules:', error);
      customRules = {};
    }
  }

  return (
    userPermission[permission as keyof Permission] === true ||
    customRules[permission as keyof typeof customRules] === true
  );
}
