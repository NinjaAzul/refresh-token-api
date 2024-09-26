import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { I18nContext } from 'nestjs-i18n';
import { I18n } from 'src/i18n';

import { CreateProductionDTO, UpdateProductionDTO } from './dto';
import { ProductionsRepository } from './productions.repository';

@Injectable()
export class ProductionsService {
  constructor(private readonly productionsRepository: ProductionsRepository) {}

  async create(createProductionDTO: CreateProductionDTO, i18nContext: I18nContext) {
    const {
      deliveredDate,
      itemNumber,
      mp,
      numberBS,
      producedBobbinQty,
      producedLineQty,
      serviceOrderId,
    } = createProductionDTO;

    const input: Prisma.ProductionCreateManyInput = {
      deliveredDate,
      itemNumber,
      mp,
      numberBS,
      producedBobbinQty,
      producedLineQty,
      serviceOrderId,
    };

    const { id } = await this.productionsRepository.create(input);

    return {
      message: i18nContext.translate(
        I18n.MODULES.PRODUCTIONS_SERVICE.PRODUCTION_CREATED_SUCCESSFULLY.KEY,
      ),
      id,
    };
  }

  async findAll() {
    return this.productionsRepository.findAll();
  }

  async findOne(id: number) {
    const production = await this.productionsRepository.findOne(id);
    if (!production) {
      throw new NotFoundException(I18n.MODULES.PRODUCTIONS_SERVICE.PRODUCTION_NOT_FOUND.KEY);
    }
    return production;
  }

  async update(id: number, updateProductionDTO: UpdateProductionDTO, i18nContext: I18nContext) {
    const { deliveredDate, itemNumber, mp, numberBS, producedBobbinQty, producedLineQty } =
      updateProductionDTO;

    const production = await this.findOne(id);

    if (!production) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.PRODUCTIONS_SERVICE.PRODUCTION_NOT_FOUND.KEY),
      );
    }

    const input: Prisma.ProductionUpdateInput = {
      deliveredDate,
      itemNumber,
      mp,
      numberBS,
      producedBobbinQty,
      producedLineQty,
    };

    const { id: productionId } = await this.productionsRepository.update(id, input);

    return {
      message: i18nContext.translate(
        I18n.MODULES.PRODUCTIONS_SERVICE.PRODUCTION_UPDATED_SUCCESSFULLY.KEY,
      ),
      id: productionId,
    };
  }

  async remove(id: number, i18nContext: I18nContext) {
    const production = await this.findOne(id);

    if (!production) {
      throw new NotFoundException(
        i18nContext.translate(I18n.MODULES.PRODUCTIONS_SERVICE.PRODUCTION_NOT_FOUND.KEY),
      );
    }

    const { id: productionId } = await this.productionsRepository.remove(id);

    return {
      message: i18nContext.translate(
        I18n.MODULES.PRODUCTIONS_SERVICE.PRODUCTION_DELETED_SUCCESSFULLY.KEY,
      ),
      id: productionId,
    };
  }
}
