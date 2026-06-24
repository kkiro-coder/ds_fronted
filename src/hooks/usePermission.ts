import { useMemo } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function usePermission() {
  const { permissions, hasPermission, hasAnyPermission, hasAllPermissions } = useAuthStore()

  const isAdmin = useMemo(() => permissions.length === 0 || permissions.includes('*'), [permissions])

  function canAccess(required?: string | string[]): boolean {
    if (isAdmin) return true
    if (!required) return true
    if (typeof required === 'string') return hasPermission(required)
    if (Array.isArray(required) && required.length === 0) return true
    return hasAnyPermission(required)
  }

  return {
    permissions,
    isAdmin,
    canAccess,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }
}
