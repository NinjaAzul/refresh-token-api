/* eslint-disable no-console */
import { PrismaClient, User } from '@prisma/client';

import { hash } from 'bcrypt';

const getUsers = async (): Promise<Omit<User, 'createdAt' | 'updatedAt'>[]> => {
  return [
    {
      id: 1,
      name: 'Administrador',
      email: 'admin@exemplo.com',
      password: await hash('admin', 10),
      roleId: 1,
      isActive: true,
    },
  ];
};

export const insertUsers = async (client: PrismaClient) => {
  const users = await getUsers();

  try {
    const batch = [];

    for (const user of users) {
      batch.push(
        client.user.upsert({
          create: user,
          update: user,
          where: { id: user.id },
        }),
      );
    }

    await client.$transaction(batch);

    console.warn('Usuários criados: %d\n', users.length);
  } catch (error) {
    console.error('Erro ao criar usuários', error);
  }
};
