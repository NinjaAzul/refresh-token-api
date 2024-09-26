/* eslint-disable no-console */
import { Machine, PrismaClient } from '@prisma/client';

const machines: Omit<Machine, 'createdAt' | 'updatedAt'>[] = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  name: `MAQ Nº ${i + 1}`,
}));

export const insertMachines = async (client: PrismaClient) => {
  try {
    const batch = [];

    for (const machine of machines) {
      batch.push(
        client.machine.upsert({
          create: machine,
          update: machine,
          where: { id: machine.id },
        }),
      );
    }

    await client.$transaction(batch);

    console.warn('Machines created: %d\n', machines.length);
  } catch (error) {
    console.error('Error seeding machines', error);
  }
};
