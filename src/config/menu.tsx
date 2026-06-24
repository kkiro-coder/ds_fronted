import { PERMISSIONS } from '@/constants/permissions'

export interface NavChild {
  id: string
  label: string
  path: string
  permission?: string
}

export interface NavGroup {
  id: string
  label: string
  path?: string
  permission?: string
  icon: JSX.Element
  children?: NavChild[]
}

const Icon: Record<string, JSX.Element> = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  cert: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  node: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  system: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  log: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  org: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
}

export const menuConfig: NavGroup[] = [
  {
    id: 'dashboard',
    label: '控制台',
    path: '/dashboard/workplace',
    permission: PERMISSIONS.DASHBOARD.VIEW,
    icon: Icon.dashboard,
  },
  {
    id: 'cert',
    label: '证书管理',
    permission: PERMISSIONS.CERT.VIEW,
    icon: Icon.cert,
    children: [
      { id: 'cert-order', label: '证书订单', path: '/cert/order', permission: PERMISSIONS.CERT.ORDER },
      { id: 'cert-scan', label: '证书扫描', path: '/cert/scan', permission: PERMISSIONS.CERT.SCAN },
    ],
  },
  {
    id: 'node',
    label: '节点管理',
    permission: PERMISSIONS.NODE.VIEW,
    icon: Icon.node,
    children: [
      { id: 'node-list', label: '节点列表', path: '/node/list', permission: PERMISSIONS.NODE.LIST },
      { id: 'node-monitor', label: '节点监控', path: '/node/monitor', permission: PERMISSIONS.NODE.MONITOR },
    ],
  },
  {
    id: 'system',
    label: '系统管理',
    permission: PERMISSIONS.SYSTEM.VIEW,
    icon: Icon.system,
    children: [
      { id: 'system-auth', label: '认证管理', path: '/system/auth', permission: PERMISSIONS.SYSTEM.AUTH },
      { id: 'system-org', label: '组织管理', path: '/system/organization', permission: PERMISSIONS.SYSTEM.ORGANIZATION },
      { id: 'system-dns', label: 'DNS 配置', path: '/system/dns-config', permission: PERMISSIONS.SYSTEM.DNS_CONFIG },
      { id: 'system-scheduler', label: '定时任务', path: '/system/scheduler', permission: PERMISSIONS.SYSTEM.SCHEDULER },
      { id: 'system-log-config', label: '日志配置', path: '/system/log-config', permission: PERMISSIONS.SYSTEM.LOG_CONFIG },
      { id: 'system-connection', label: '连接配置', path: '/system/connection-config', permission: PERMISSIONS.SYSTEM.CONNECTION_CONFIG },
    ],
  },
  {
    id: 'log',
    label: '日志管理',
    permission: PERMISSIONS.LOG.VIEW,
    icon: Icon.log,
    children: [
      { id: 'log-login', label: '登录日志', path: '/log/login-log', permission: PERMISSIONS.LOG.LOGIN },
      { id: 'log-operation', label: '操作日志', path: '/log/operation-log', permission: PERMISSIONS.LOG.OPERATION },
      { id: 'log-notification', label: '通知日志', path: '/log/notification-log', permission: PERMISSIONS.LOG.NOTIFICATION },
      { id: 'log-system', label: '系统日志', path: '/log/system-log', permission: PERMISSIONS.LOG.SYSTEM },
    ],
  },
  {
    id: 'org',
    label: '人员管理',
    permission: PERMISSIONS.ORG.VIEW,
    icon: Icon.org,
    children: [
      { id: 'org-tree', label: '组织关系', path: '/org/tree', permission: PERMISSIONS.ORG.TREE },
    ],
  },
  {
    id: 'user',
    label: '用户设置',
    path: '/user/setting',
    permission: PERMISSIONS.USER.SETTING,
    icon: Icon.user,
  },
]
