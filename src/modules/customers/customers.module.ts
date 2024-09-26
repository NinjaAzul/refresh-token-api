import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository],
  exports: [CustomersService, CustomersRepository],
  imports: [PrismaClientModule],
})
export class CustomersModule {}
