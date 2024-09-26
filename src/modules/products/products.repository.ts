import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.product.findMany({});
  }
}
