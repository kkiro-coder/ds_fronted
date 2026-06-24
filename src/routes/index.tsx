import { lazy, Suspense } from 'react'
import { PERMISSIONS } from '@/constants/permissions'

const WorkplacePage = lazy(() => import('@/pages/dashboard/workplace'))
const CertOrderPage = lazy(() => import('@/pages/cert/order'))
const CertScanPage = lazy(() => import('@/pages/cert/scan'))
const NodeListPage = lazy(() => import('@/pages/node/list'))
const NodeMonitorPage = lazy(() => import('@/pages/node/monitor'))
const SystemAuthPage = lazy(() => import('@/pages/system/auth'))
const OrganizationPage = lazy(() => import('@/pages/system/organization'))
const DnsConfigPage = lazy(() => import('@/pages/system/dns-config'))
const SchedulerPage = lazy(() => import('@/pages/system/scheduler'))
const LogConfigPage = lazy(() => import('@/pages/system/log-config'))
const ConnectionConfigPage = lazy(() => import('@/pages/system/connection-config'))
const LoginLogPage = lazy(() => import('@/pages/log/login-log'))
const OperationLogPage = lazy(() => import('@/pages/log/operation-log'))
const NotificationLogPage = lazy(() => import('@/pages/log/notification-log'))
const SystemLogPage = lazy(() => import('@/pages/log/system-log'))
const UserSettingPage = lazy(() => import('@/pages/user/setting'))
const OrgTreePage = lazy(() => import('@/pages/org/tree'))

function LazyLoad(children: JSX.Element) {
  return (
    <Suspense
      fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: 200,
          color: '#94A3B8',
        }}>
          加载中...
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export interface AppRoute {
  path: string
  element: JSX.Element
  requiredPermissions?: string[]
}

export const routeConfig: AppRoute[] = [
  {
    path: '/dashboard/workplace',
    element: LazyLoad(<WorkplacePage />),
    requiredPermissions: [PERMISSIONS.DASHBOARD.VIEW],
  },
  {
    path: '/cert/order',
    element: LazyLoad(<CertOrderPage />),
    requiredPermissions: [PERMISSIONS.CERT.ORDER],
  },
  {
    path: '/cert/scan',
    element: LazyLoad(<CertScanPage />),
    requiredPermissions: [PERMISSIONS.CERT.SCAN],
  },
  {
    path: '/node/list',
    element: LazyLoad(<NodeListPage />),
    requiredPermissions: [PERMISSIONS.NODE.LIST],
  },
  {
    path: '/node/monitor',
    element: LazyLoad(<NodeMonitorPage />),
    requiredPermissions: [PERMISSIONS.NODE.MONITOR],
  },
  {
    path: '/system/auth',
    element: LazyLoad(<SystemAuthPage />),
    requiredPermissions: [PERMISSIONS.SYSTEM.AUTH],
  },
  {
    path: '/system/organization',
    element: LazyLoad(<OrganizationPage />),
    requiredPermissions: [PERMISSIONS.SYSTEM.ORGANIZATION],
  },
  {
    path: '/system/dns-config',
    element: LazyLoad(<DnsConfigPage />),
    requiredPermissions: [PERMISSIONS.SYSTEM.DNS_CONFIG],
  },
  {
    path: '/system/scheduler',
    element: LazyLoad(<SchedulerPage />),
    requiredPermissions: [PERMISSIONS.SYSTEM.SCHEDULER],
  },
  {
    path: '/system/log-config',
    element: LazyLoad(<LogConfigPage />),
    requiredPermissions: [PERMISSIONS.SYSTEM.LOG_CONFIG],
  },
  {
    path: '/system/connection-config',
    element: LazyLoad(<ConnectionConfigPage />),
    requiredPermissions: [PERMISSIONS.SYSTEM.CONNECTION_CONFIG],
  },
  {
    path: '/log/login-log',
    element: LazyLoad(<LoginLogPage />),
    requiredPermissions: [PERMISSIONS.LOG.LOGIN],
  },
  {
    path: '/log/operation-log',
    element: LazyLoad(<OperationLogPage />),
    requiredPermissions: [PERMISSIONS.LOG.OPERATION],
  },
  {
    path: '/log/notification-log',
    element: LazyLoad(<NotificationLogPage />),
    requiredPermissions: [PERMISSIONS.LOG.NOTIFICATION],
  },
  {
    path: '/log/system-log',
    element: LazyLoad(<SystemLogPage />),
    requiredPermissions: [PERMISSIONS.LOG.SYSTEM],
  },
  {
    path: '/user/setting',
    element: LazyLoad(<UserSettingPage />),
    requiredPermissions: [PERMISSIONS.USER.SETTING],
  },
  {
    path: '/org/tree',
    element: LazyLoad(<OrgTreePage />),
    requiredPermissions: [PERMISSIONS.ORG.TREE],
  },
]
