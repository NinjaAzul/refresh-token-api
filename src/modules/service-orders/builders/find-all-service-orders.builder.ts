import { FeatureEnum, Prisma, StatusEnum } from '@prisma/client';

import { PrismaBuilder } from 'src/@shared/builders';
import { PermissionEnum } from 'src/@shared/constants';
import { checkPermission } from 'src/@shared/helpers';

// import { FilterServiceOrdersDto } from '../dto';

export class ServiceOrdersFilterBuilder extends PrismaBuilder<
  Prisma.ServiceOrderWhereInput,
  Prisma.ServiceOrderOrderByWithRelationInput
> {
  private constructor(whereInput: Prisma.ServiceOrderWhereInput = {}) {
    super(whereInput);
  }

  // filters: FilterServiceOrdersDto
  static fromDto() {
    return new ServiceOrdersFilterBuilder({});
  }

  async addPermissionsForUser(userId: number) {
    const hasCustomPermission = await checkPermission(
      userId,
      FeatureEnum.SERVICE_ORDER,
      PermissionEnum.SERVICE_ORDER.CUSTOM_RULES.CAN_SEE_ONLY_SERVICE_ORDERS_IN_WAITING_PRODUCTION,
    );

    if (hasCustomPermission) {
      this.addWhereInput({ status: StatusEnum.WAITING });
    }

    return this;
  }
}
