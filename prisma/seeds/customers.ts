/* eslint-disable no-console */

import { Customer, PrismaClient } from '@prisma/client';

const customers: Omit<Customer, 'createdAt' | 'updatedAt'>[] = [
  { id: 1, name: 'P&G' },
  { id: 2, name: 'ALGODONEIRA' },
  { id: 3, name: 'J&J BRASIL PKS' },
  { id: 4, name: 'FAMILIA DEL PACIFICO' },
  { id: 5, name: 'SANTHER' },
  { id: 6, name: 'HIGIE TOPP' },
  { id: 7, name: 'J&J PARAGUAY' },
];

export const insertCustomers = async (client: PrismaClient) => {
  try {
    const batch = [];

    for (const customer of customers) {
      batch.push(
        client.customer.upsert({
          create: customer,
          update: customer,
          where: { id: customer.id },
        }),
      );
    }

    await client.$transaction(batch);

    console.warn('Customers created: %d\n', customers.length);
  } catch (error) {
    console.error('Error seeding customers', error);
  }
};
