import { SetMetadata } from '@nestjs/common';
import { FeatureEnum } from '@prisma/client';

import { PermissionEnum } from '../constants';

export const PERMISSIONS_KEY = 'permissions';

export type PermissionDecorators = {
  feature: FeatureEnum;
  permission: (typeof PermissionEnum)[keyof typeof PermissionEnum][keyof (typeof PermissionEnum)[keyof typeof PermissionEnum]];
};

export const Permissions = (permission: PermissionDecorators) =>
  SetMetadata(PERMISSIONS_KEY, [permission]);
