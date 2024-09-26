import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { ProductionsController } from './productions.controller';
import { ProductionsRepository } from './productions.repository';
import { ProductionsService } from './productions.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [ProductionsController],
  providers: [ProductionsService, ProductionsRepository],
  exports: [ProductionsService],
})
export class ProductionsModule {}
