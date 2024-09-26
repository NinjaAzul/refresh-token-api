import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { MachinesController } from './machines.controller';
import { MachinesRepository } from './machines.repository';
import { MachinesService } from './machines.service';

@Module({
  controllers: [MachinesController],
  providers: [MachinesService, MachinesRepository],
  exports: [MachinesService, MachinesRepository],
  imports: [PrismaClientModule],
})
export class MachinesModule {}
