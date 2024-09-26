import { FeatureEnum } from '@prisma/client';

export const PermissionEnum = {
  [FeatureEnum.SERVICE_ORDER]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {
      CAN_SEE_ONLY_SERVICE_ORDERS_IN_WAITING_PRODUCTION:
        'canSeeOnlyServiceOrdersInWaitingProduction',
    },
  },
  [FeatureEnum.PRODUCT]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {},
  },
  [FeatureEnum.CUSTOMER]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {},
  },
  [FeatureEnum.USER]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {},
  },
  [FeatureEnum.MACHINE]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {},
  },
  [FeatureEnum.ROLE_PERMISSION]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {
      CAN_SYNC_CUSTOM_RULES: 'canSyncCustomRules',
    },
  },
  [FeatureEnum.PRODUCTION]: {
    CAN_CREATE: 'canCreate',
    CAN_READ: 'canRead',
    CAN_UPDATE: 'canUpdate',
    CAN_DELETE: 'canDelete',
    CAN_FILTER: 'canFilter',
    CAN_CUSTOM: 'canCustom',
    CUSTOM_RULES: {},
  },
} as const;
