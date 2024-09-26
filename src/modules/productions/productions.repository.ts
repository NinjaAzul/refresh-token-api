import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class ProductionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: Prisma.ProductionCreateManyInput) {
    return this.prismaService.production.create({
      data: input,
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return this.prismaService.production.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.production.findUnique({
      where: { id },
    });
  }

  async update(id: number, input: Prisma.ProductionUpdateInput) {
    return this.prismaService.production.update({
      where: { id },
      data: input,
      select: {
        id: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.production.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
