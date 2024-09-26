import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { ServiceOrdersController } from './service-orders.controller';
import { ServiceOrdersRepository } from './service-orders.repository';
import { ServiceOrdersService } from './service-orders.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [ServiceOrdersController],
  providers: [ServiceOrdersService, ServiceOrdersRepository],
  exports: [ServiceOrdersService],
})
export class ServiceOrdersModule {}
