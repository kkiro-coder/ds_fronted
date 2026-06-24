export const PERMISSIONS = {
  DASHBOARD: {
    VIEW: 'dashboard:view',
  },
  CERT: {
    VIEW: 'cert:view',
    ORDER: 'cert:order',
    SCAN: 'cert:scan',
  },
  NODE: {
    VIEW: 'node:view',
    LIST: 'node:list',
    MONITOR: 'node:monitor',
  },
  SYSTEM: {
    VIEW: 'system:view',
    AUTH: 'system:auth',
    ORGANIZATION: 'system:organization',
    DNS_CONFIG: 'system:dns-config',
    SCHEDULER: 'system:scheduler',
    LOG_CONFIG: 'system:log-config',
    CONNECTION_CONFIG: 'system:connection-config',
  },
  LOG: {
    VIEW: 'log:view',
    LOGIN: 'log:login-log',
    OPERATION: 'log:operation-log',
    NOTIFICATION: 'log:notification-log',
    SYSTEM: 'log:system-log',
  },
  USER: {
    VIEW: 'user:view',
    SETTING: 'user:setting',
  },
  ORG: {
    VIEW: 'org:view',
    TREE: 'org:tree',
  },
} as const

export type Permission = string

export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS).flatMap(
  (group) => Object.values(group),
)
