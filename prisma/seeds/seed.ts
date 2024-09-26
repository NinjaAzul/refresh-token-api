/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

import { insertCustomers } from './customers';
import { insertFeatures } from './features';
import { insertMachines } from './machines';
import { insertPermissions } from './permission';
import { insertProducts } from './products';
import { insertRoles } from './roles';
import { insertRolesAndFeatures } from './roles.features';
import { insertUsers } from './users';

const client = new PrismaClient();

async function main() {}

main()
  .then(async () => {
    await client.$disconnect();

    console.warn('Start seeding ...');

    console.warn('-----------------------------');
    console.warn('Seeding users 📦');
    await insertUsers(client);
    console.warn('Users seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding machines 📦');
    await insertMachines(client);
    console.warn('Machines seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding products 📦');
    await insertProducts(client);
    console.warn('Products seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding customers 📦');
    await insertCustomers(client);
    console.warn('Customers seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding roles 📦');
    await insertRoles(client);
    console.warn('Roles seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding features 📦');
    await insertFeatures(client);
    console.warn('Features seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding permissions 📦');
    await insertRolesAndFeatures(client);
    console.warn('Permissions seeded  🎉');
    console.warn('-----------------------------');

    console.warn('-----------------------------');
    console.warn('Seeding permissions 📦');
    await insertPermissions(client);
    console.warn('Permissions seeded  🎉');
    console.warn('-----------------------------');

    console.warn('Finish seeding ✅');
    process.exit(0);
  })
  .catch(async (err) => {
    await client.$disconnect();
    console.error(err);
    process.exit(1);
  });
