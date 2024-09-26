import { Injectable } from '@nestjs/common';
import { Prisma, StatusEnum } from '@prisma/client';

import { PrismaService } from '@libs/prisma-client';
import { ServiceOrdersFilterBuilder } from 'src/modules/service-orders/builders/find-all-service-orders.builder';

@Injectable()
export class ServiceOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: Prisma.ServiceOrderCreateInput) {
    return this.prismaService.serviceOrder.create({
      data: input,
      select: {
        id: true,
      },
    });
  }

  async findAll(filterBuilder: ServiceOrdersFilterBuilder) {
    const { where, pagination, orderBy } = filterBuilder.build();

    return this.prismaService.serviceOrder.findMany({
      where,
      orderBy,
      skip: pagination.skip,
      take: pagination.take,
      select: {
        id: true,
        deliveryDate: true,
        plannedLineQty: true,
        plannedBobbinQty: true,
        orderNumber: true,
        status: true,
        machine: {
          select: {
            name: true,
          },
        },
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
            code: true,
          },
        },
        operator: {
          select: {
            name: true,
          },
        },
        production: {
          select: {
            id: true,
            itemNumber: true,
            numberBS: true,
            mp: true,
            producedBobbinQty: true,
            producedLineQty: true,
            deliveredDate: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.serviceOrder.findUnique({
      where: { id },
    });
  }

  async update(id: number, input: Prisma.ServiceOrderUpdateInput) {
    return this.prismaService.serviceOrder.update({
      where: { id },
      data: input,
      select: {
        id: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.serviceOrder.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }

  async findAllWithProductions() {
    return this.prismaService.serviceOrder.findMany({
      where: {
        status: StatusEnum.IN_PROGRESS,
      },
      select: {
        id: true,
        deliveryDate: true,
        plannedLineQty: true,
        plannedBobbinQty: true,
        orderNumber: true,
        status: true,
        machine: {
          select: {
            name: true,
          },
        },
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
            code: true,
          },
        },
        operator: {
          select: {
            name: true,
          },
        },
        production: {
          select: {
            id: true,
            itemNumber: true,
            numberBS: true,
            mp: true,
            producedBobbinQty: true,
            producedLineQty: true,
            deliveredDate: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
