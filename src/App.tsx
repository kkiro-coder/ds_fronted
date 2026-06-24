import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from '@arco-design/web-react'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import '@arco-design/web-react/dist/css/arco.css'
import LoginLayout from '@/layouts/LoginLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AuthGuard from '@/routes/guards/AuthGuard'
import { routeConfig } from '@/routes'
import './index.css'

const LoginPage = lazy(() => import('@/pages/login'))
const ForbiddenPage = lazy(() => import('@/pages/exception/403'))
const NotFoundPage = lazy(() => import('@/pages/exception/404'))

export default function App() {
  const fallback = (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%', minHeight: 200, color: '#94A3B8',
    }}>
      加载中...
    </div>
  )

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        primaryColor: '#4F46E5',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/workplace" replace />} />
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<Suspense fallback={fallback}><LoginPage /></Suspense>} />
          </Route>
          <Route
            path="/"
            element={
              <AuthGuard>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            {routeConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AuthGuard requiredPermissions={route.requiredPermissions}>
                    {route.element}
                  </AuthGuard>
                }
              />
            ))}
          </Route>
          <Route path="/exception/403" element={<Suspense fallback={fallback}><ForbiddenPage /></Suspense>} />
          <Route path="/exception/404" element={<Suspense fallback={fallback}><NotFoundPage /></Suspense>} />
          <Route path="*" element={<Navigate to="/exception/404" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
