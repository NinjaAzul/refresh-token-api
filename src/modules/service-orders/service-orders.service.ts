import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, StatusEnum } from '@prisma/client';

import { I18nContext } from 'nestjs-i18n';
import { I18n } from 'src/i18n';

import { ServiceOrdersFilterBuilder } from './builders/find-all-service-orders.builder';
import { CreateServiceOrderDTO, FilterServiceOrdersDto, UpdateServiceOrderDTO } from './dto';
import { ServiceOrdersRepository } from './service-orders.repository';

@Injectable()
export class ServiceOrdersService {
  constructor(private readonly serviceOrdersRepository: ServiceOrdersRepository) {}

  async create(createServiceOrderDTO: CreateServiceOrderDTO, i18nContext: I18nContext) {
    const {
      orderNumber,
      internalCode,
      plannedLineQty,
      plannedBobbinQty,
      deliveryDate,
      dateSolicitadeByCustomer,
      newDateByCustomer,
      leadTimeXDateRequestDateSolicitatedByCustomer,
      metersByPL,
      PLQty,
      dateEstimatedToDelivery,
      newDateEstimatedToDeliveryLiner,
      invoiceNumber,
      productionMetersQuantity,
      status,
      customerId,
      machineId,
      productId,
    } = createServiceOrderDTO;

    const input: Prisma.ServiceOrderCreateInput = {
      orderNumber,
      internalCode,
      plannedLineQty,
      plannedBobbinQty,
      deliveryDate,
      dateSolicitadeByCustomer,
      newDateByCustomer,
      leadTimeXDateRequestDateSolicitatedByCustomer,
      metersByPL,
      PLQty,
      dateEstimatedToDelivery,
      newDateEstimatedToDeliveryLiner,
      invoiceNumber,
      productionMetersQuantity,
      status,
      customer: { connect: { id: customerId } },
      machine: { connect: { id: machineId } },
      product: { connect: { id: productId } },
    };

    const { id } = await this.serviceOrdersRepository.create(input);

    return {
      message: i18nContext.translate(
        I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_CREATED_SUCCESSFULLY.KEY,
      ),
      id,
    };
  }

  async findAll(filters: FilterServiceOrdersDto, userId: number) {
    const builder = ServiceOrdersFilterBuilder.fromDto();

    await builder.addPermissionsForUser(userId);

    return this.serviceOrdersRepository.findAll(builder);
  }

  async findOne(id: number) {
    const serviceOrder = await this.serviceOrdersRepository.findOne(id);
    if (!serviceOrder) {
      throw new NotFoundException(I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_NOT_FOUND.KEY);
    }
    return serviceOrder;
  }

  async update(id: number, updateServiceOrderDTO: UpdateServiceOrderDTO, i18nContext: I18nContext) {
    const {
      orderNumber,
      internalCode,
      plannedLineQty,
      plannedBobbinQty,
      deliveryDate,
      dateSolicitadeByCustomer,
      newDateByCustomer,
      leadTimeXDateRequestDateSolicitatedByCustomer,
      metersByPL,
      PLQty,
      dateEstimatedToDelivery,
      newDateEstimatedToDeliveryLiner,
      invoiceNumber,
      productionMetersQuantity,
      status,
      customerId,
      machineId,
      productId,
    } = updateServiceOrderDTO;

    const serviceOrder = await this.findOne(id);

    if (!serviceOrder) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_NOT_FOUND.KEY),
      );
    }

    const input: Prisma.ServiceOrderUpdateInput = {
      orderNumber,
      internalCode,
      plannedLineQty,
      plannedBobbinQty,
      deliveryDate,
      dateSolicitadeByCustomer,
      newDateByCustomer,
      leadTimeXDateRequestDateSolicitatedByCustomer,
      metersByPL,
      PLQty,
      dateEstimatedToDelivery,
      newDateEstimatedToDeliveryLiner,
      invoiceNumber,
      productionMetersQuantity,
      status,
      customer: { connect: { id: customerId } },
      machine: { connect: { id: machineId } },
      product: { connect: { id: productId } },
    };

    const { id: serviceOrderId } = await this.serviceOrdersRepository.update(id, input);

    return {
      message: i18nContext.translate(
        I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_UPDATED_SUCCESSFULLY.KEY,
      ),
      id: serviceOrderId,
    };
  }

  async remove(id: number, i18nContext: I18nContext) {
    const serviceOrder = await this.findOne(id);

    if (!serviceOrder) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_NOT_FOUND.KEY),
      );
    }

    const { id: serviceOrderId } = await this.serviceOrdersRepository.remove(id);

    return {
      message: i18nContext.translate(
        I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_DELETED_SUCCESSFULLY.KEY,
      ),
      id: serviceOrderId,
    };
  }

  async findAllWithProductions() {
    return await this.serviceOrdersRepository.findAllWithProductions();
  }

  async sendToProduction(id: number, userId: number, i18nContext: I18nContext) {
    const serviceOrder = await this.findOne(id);

    if (!serviceOrder) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_NOT_FOUND.KEY),
      );
    }

    const input: Prisma.ServiceOrderUpdateInput = {
      status: StatusEnum.IN_PROGRESS,
      operator: { connect: { id: userId } },
    };

    const { id: serviceOrderId } = await this.serviceOrdersRepository.update(id, input);

    return {
      message: i18nContext.translate(
        I18n.MODULES.SERVICE_ORDERS_SERVICE.SERVICE_ORDER_UPDATED_SUCCESSFULLY.KEY,
      ),
      id: serviceOrderId,
    };
  }
}
