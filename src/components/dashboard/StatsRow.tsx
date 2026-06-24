import { Card } from '@arco-design/web-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  up: boolean
  icon: JSX.Element
  color: string
}

function StatCard({ title, value, change, up, icon, color }: StatCardProps) {
  return (
    <Card hoverable className="db-stat-card">
      <div className="db-stat-icon" style={{ background: color }}>
        {icon}
      </div>
      <div className="db-stat-body">
        <div className="db-stat-title">{title}</div>
        <div className="db-stat-value">{value}</div>
        <div className={`db-stat-change ${up ? 'up' : 'down'}`}>
          {up ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
          )}
          {change}
        </div>
      </div>
    </Card>
  )
}

export default function StatsRow() {
  const stats: StatCardProps[] = [
    {
      title: '今日搜索',
      value: '128,432',
      change: '+12.5% 较昨日',
      up: true,
      color: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: '搜索命中率',
      value: '96.8%',
      change: '+2.3% 较上周',
      up: true,
      color: 'linear-gradient(135deg, #10B981, #059669)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    {
      title: '活跃用户',
      value: '3,842',
      change: '+8.1% 较昨日',
      up: true,
      color: 'linear-gradient(135deg, #F59E0B, #D97706)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: '平均响应时间',
      value: '0.38s',
      change: '-5.2% 性能提升',
      up: false,
      color: 'linear-gradient(135deg, #EC4899, #BE185D)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <div className="db-stats-row">
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
    </div>
  )
}
