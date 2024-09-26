import { FeatureEnum } from '@prisma/client';

import { PermissionEnum } from './Permissions';

export const FeaturesAndPermissions = {
  [FeatureEnum.SERVICE_ORDER]: {
    [PermissionEnum[FeatureEnum.SERVICE_ORDER].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.SERVICE_ORDER].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.SERVICE_ORDER].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.SERVICE_ORDER].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.SERVICE_ORDER].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.SERVICE_ORDER].CAN_CUSTOM]: true,
    customRules: {
      [PermissionEnum[FeatureEnum.SERVICE_ORDER].CUSTOM_RULES
        .CAN_SEE_ONLY_SERVICE_ORDERS_IN_WAITING_PRODUCTION]: true,
    },
  },
  [FeatureEnum.PRODUCT]: {
    [PermissionEnum[FeatureEnum.PRODUCT].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.PRODUCT].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.PRODUCT].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.PRODUCT].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.PRODUCT].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.PRODUCT].CAN_CUSTOM]: true,
    customRules: {},
  },
  [FeatureEnum.CUSTOMER]: {
    [PermissionEnum[FeatureEnum.CUSTOMER].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.CUSTOMER].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.CUSTOMER].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.CUSTOMER].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.CUSTOMER].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.CUSTOMER].CAN_CUSTOM]: true,
    customRules: {},
  },
  [FeatureEnum.USER]: {
    [PermissionEnum[FeatureEnum.USER].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.USER].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.USER].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.USER].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.USER].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.USER].CAN_CUSTOM]: true,
    customRules: {},
  },
  [FeatureEnum.MACHINE]: {
    [PermissionEnum[FeatureEnum.MACHINE].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.MACHINE].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.MACHINE].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.MACHINE].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.MACHINE].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.MACHINE].CAN_CUSTOM]: true,
    customRules: {},
  },
  [FeatureEnum.PRODUCTION]: {
    [PermissionEnum[FeatureEnum.PRODUCTION].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.PRODUCTION].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.PRODUCTION].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.PRODUCTION].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.PRODUCTION].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.PRODUCTION].CAN_CUSTOM]: true,
    customRules: {},
  },
  [FeatureEnum.ROLE_PERMISSION]: {
    [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CAN_CREATE]: true,
    [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CAN_READ]: true,
    [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CAN_UPDATE]: true,
    [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CAN_DELETE]: true,
    [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CAN_FILTER]: true,
    [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CAN_CUSTOM]: true,
    customRules: {
      [PermissionEnum[FeatureEnum.ROLE_PERMISSION].CUSTOM_RULES.CAN_SYNC_CUSTOM_RULES]: true,
    },
  },
} as const;
