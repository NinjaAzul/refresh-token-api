/* eslint-disable no-console */
import { PrismaClient, Role } from '@prisma/client';

const roles: Omit<Role, 'createdAt' | 'updatedAt'>[] = [
  { id: 1, name: 'Administrador' },
  { id: 2, name: 'Operador' },
];

export const insertRoles = async (client: PrismaClient) => {
  try {
    const batch = [];

    for (const role of roles) {
      batch.push(
        client.role.upsert({
          create: role,
          update: role,
          where: { id: role.id },
        }),
      );
    }

    await client.$transaction(batch);

    console.warn('Roles created: %d\n', roles.length);
  } catch (error) {
    console.error('Error seeding roles', error);
  }
};
