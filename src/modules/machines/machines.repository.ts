import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class MachinesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.machine.findMany({});
  }
}
