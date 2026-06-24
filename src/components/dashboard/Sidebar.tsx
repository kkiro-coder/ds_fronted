import { useMemo } from 'react'
import { Menu } from '@arco-design/web-react'
import { menuConfig } from '@/config/menu'
import { usePermission } from '@/hooks/usePermission'
import type { NavGroup, NavChild } from '@/config/menu'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

function getOpenKeys(path: string, config: NavGroup[]): string[] {
  const keys: string[] = []
  for (const group of config) {
    if (group.children?.some((c) => path.startsWith(c.path))) {
      keys.push(group.id)
    }
  }
  return keys
}

function getSelectedKey(path: string, config: NavGroup[]): string {
  for (const group of config) {
    if (group.children) {
      const child = group.children.find((c) => c.path === path)
      if (child) return child.id
    }
  }
  const group = config.find((g) => g.path === path)
  return group ? group.id : ''
}

function findPathByKey(key: string, config: NavGroup[]): string | null {
  for (const group of config) {
    if (group.id === key && group.path) return group.path
    if (group.children) {
      const child = group.children.find((c) => c.id === key)
      if (child) return child.path
    }
  }
  return null
}

interface SidebarProps {
  activeNav: string
  onNavChange: (path: string) => void
  onLogout: () => void
  username: string
}

export default function Sidebar({ activeNav, onNavChange, onLogout, username }: SidebarProps) {
  const { canAccess } = usePermission()

  const visibleMenu = useMemo(() => {
    return menuConfig
      .filter((group) => {
        if (group.children) {
          const visibleChildren = group.children.filter((child) => canAccess(child.permission))
          if (visibleChildren.length === 0) return false
          return canAccess(group.permission)
        }
        return canAccess(group.permission)
      })
      .map((group) => {
        if (group.children) {
          const visibleChildren = group.children.filter((child) => canAccess(child.permission))
          return { ...group, children: visibleChildren }
        }
        return group
      })
  }, [canAccess])

  const handleClick = (key: string) => {
    const path = findPathByKey(key, visibleMenu)
    if (path) onNavChange(path)
  }

  return (
    <aside className="db-sidebar">
      <div className="db-sidebar-logo">
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.9)" />
          <line x1="14" y1="2" x2="14" y2="8" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="20" x2="14" y2="26" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="14" x2="8" y2="14" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="14" x2="26" y2="14" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>DailySearch</span>
      </div>

      <nav className="db-nav">
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[getSelectedKey(activeNav, visibleMenu)]}
          defaultOpenKeys={getOpenKeys(activeNav, visibleMenu)}
          onClickMenuItem={handleClick}
          style={{ background: 'transparent' }}
        >
          {visibleMenu.map((group) =>
            group.children ? (
              <SubMenu
                key={group.id}
                title={
                  <>
                    <span className="db-nav-icon">{group.icon}</span>
                    {group.label}
                  </>
                }
              >
                {group.children.map((child: NavChild) => (
                  <MenuItem key={child.id}>{child.label}</MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem key={group.id}>
                <span className="db-nav-icon">{group.icon}</span>
                {group.label}
              </MenuItem>
            ),
          )}
        </Menu>
      </nav>

      <div className="db-sidebar-user">
        <div className="db-user-avatar">{username ? username.charAt(0).toUpperCase() : '?'}</div>
        <div className="db-user-info">
          <div className="db-user-name">{username || '未登录'}</div>
          <div className="db-user-role">管理员</div>
        </div>
        <button className="db-logout-btn" onClick={onLogout} title="退出登录">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
