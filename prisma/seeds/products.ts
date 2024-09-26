/* eslint-disable no-console */
import { PrismaClient, Product } from '@prisma/client';

const products: Omit<Product, 'createdAt' | 'updatedAt'>[] = [
  { id: 1, code: 'LOMA30', name: 'Product LOMA30' },
  { id: 2, code: '10MA29', name: 'Product 10MA29' },
  { id: 3, code: '10M40', name: 'Product 10M40' },
  { id: 4, code: '10M35', name: 'Product 10M35' },
  { id: 5, code: '10M129', name: 'Product 10M129' },
  { id: 6, code: '10MIA30', name: 'Product 10MIA30' },
  { id: 7, code: '10M30', name: 'Product 10M30' },
  { id: 8, code: '10M25', name: 'Product 10M25' },
  { id: 9, code: '10MI30', name: 'Product 10MI30' },
  { id: 12, code: '10MIA35', name: 'Product 10MIA35' },
  { id: 13, code: '10MIA25', name: 'Product 10MIA25' },
  { id: 14, code: '10MIA27', name: 'Product 10MIA27' },
];

export const insertProducts = async (client: PrismaClient) => {
  try {
    const batch = [];

    for (const product of products) {
      batch.push(
        client.product.upsert({
          create: product,
          update: product,
          where: { id: product.id },
        }),
      );
    }

    await client.$transaction(batch);

    console.warn('Products created: %d\n', products.length);
  } catch (error) {
    console.error('Error seeding products', error);
  }
};
