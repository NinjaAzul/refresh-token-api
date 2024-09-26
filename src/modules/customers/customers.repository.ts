import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma-client';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.customer.findMany({});
  }
}
