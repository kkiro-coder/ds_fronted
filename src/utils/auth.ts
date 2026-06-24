import { useAuthStore } from '@/stores/authStore'

export function hasPermission(permission: string): boolean {
  const perms = useAuthStore.getState().permissions
  if (perms.length === 0 || perms.includes('*')) return true
  return perms.includes(permission)
}

export function hasAnyPermission(permissions: string[]): boolean {
  const perms = useAuthStore.getState().permissions
  if (perms.length === 0 || perms.includes('*')) return true
  return permissions.some((p) => perms.includes(p))
}

export function hasAllPermissions(permissions: string[]): boolean {
  const perms = useAuthStore.getState().permissions
  if (perms.length === 0 || perms.includes('*')) return true
  return permissions.every((p) => perms.includes(p))
}

export function getToken(): string | null {
  return useAuthStore.getState().token
}

export function isAuthenticated(): boolean {
  return !!useAuthStore.getState().token
}
