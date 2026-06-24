import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '@/components/dashboard/Sidebar'
import { useAuthStore } from '@/stores/authStore'

export default function DashboardLayout() {
  const { username, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const pageTitles: Record<string, string> = {
    '/dashboard/workplace': '控制台',
    '/cert/order': '证书订单',
    '/cert/scan': '证书扫描',
    '/node/list': '节点列表',
    '/node/monitor': '节点监控',
    '/system/auth': '认证管理',
    '/system/organization': '组织管理',
    '/system/dns-config': 'DNS 配置',
    '/system/scheduler': '定时任务',
    '/system/log-config': '日志配置',
    '/system/connection-config': '连接配置',
    '/log/login-log': '登录日志',
    '/log/operation-log': '操作日志',
    '/log/notification-log': '通知日志',
    '/log/system-log': '系统日志',
    '/user/setting': '用户设置',
    '/org/tree': '组织关系',
  }

  const currentTitle = pageTitles[location.pathname] || '控制台'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="db-layout">
      <Sidebar
        activeNav={location.pathname}
        onNavChange={(nav) => navigate(nav)}
        onLogout={handleLogout}
        username={username}
      />

      <div className="db-main">
        <header className="db-header">
          <div className="db-header-left">
            <h2 className="db-page-title">{currentTitle}</h2>
            <span className="db-page-time">{timeStr}</span>
          </div>
          <div className="db-header-right">
            <div className="db-search-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="快捷搜索..." className="db-search-input" />
            </div>
            <button className="db-icon-btn" title="通知">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="db-badge">3</span>
            </button>
            <div className="db-header-avatar">{username ? username.charAt(0).toUpperCase() : '?'}</div>
          </div>
        </header>

        <div className="db-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
