import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  username: string
  avatar: string
  role: string
  permissions: string[]
  login: (username: string, token: string, permissions?: string[], avatar?: string, role?: string) => void
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: '',
      avatar: '',
      role: 'guest',
      permissions: [],
      login: (username, token, permissions = [], avatar = '', role = 'admin') =>
        set({ username, token, permissions, avatar, role }),
      logout: () =>
        set({ username: '', token: null, permissions: [], avatar: '', role: 'guest' }),
      hasPermission: (permission) => get().permissions.includes(permission),
      hasAnyPermission: (permissions) =>
        permissions.some((p) => get().permissions.includes(p)),
      hasAllPermissions: (permissions) =>
        permissions.every((p) => get().permissions.includes(p)),
    }),
    {
      name: 'ds-auth-storage',
      version: 2,
      partialize: (state) => ({
        token: state.token,
        username: state.username,
        avatar: state.avatar,
        role: state.role,
        permissions: state.permissions,
      }),
    },
  ),
)
