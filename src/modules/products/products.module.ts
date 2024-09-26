import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
  imports: [PrismaClientModule],
})
export class ProductsModule {}
