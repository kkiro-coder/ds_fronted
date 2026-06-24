import { useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DataOverviewBar from '../components/dashboard/DataOverviewBar'

interface DashboardProps {
  username: string
  onLogout: () => void
}

const pageTitles: Record<string, string> = {
  overview: '控制台',
  settings: '系统设置',
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
  const [activeNav, setActiveNav] = useState('overview')

  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="db-layout">
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onLogout={onLogout}
        username={username}
      />

      <div className="db-main">
        {/* Header */}
        <header className="db-header">
          <div className="db-header-left">
            <h2 className="db-page-title">{pageTitles[activeNav]}</h2>
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
            <div className="db-header-avatar">{username.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        {/* Content */}
        <div className="db-content">
          {activeNav === 'overview' && <DataOverviewBar />}

          {activeNav !== 'overview' && (
            <div className="db-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <p>{pageTitles[activeNav]} — 建设中</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
