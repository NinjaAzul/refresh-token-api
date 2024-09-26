import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@libs/prisma-client';

import { SchedulesService } from './schedule.service';
import { SchedulesRepository } from './schedules.repository';

@Module({
  providers: [SchedulesService, SchedulesRepository],
  exports: [SchedulesService],
  imports: [PrismaClientModule],
})
export class SchedulesModule {}
