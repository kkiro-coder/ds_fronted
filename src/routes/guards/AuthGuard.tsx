import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { hasAllPermissions } from '@/utils/auth'

interface AuthGuardProps {
  children: JSX.Element
  requiredPermissions?: string[]
}

export default function AuthGuard({ children, requiredPermissions }: AuthGuardProps) {
  const { token } = useAuthStore()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (
    requiredPermissions &&
    requiredPermissions.length > 0 &&
    !hasAllPermissions(requiredPermissions)
  ) {
    return <Navigate to="/exception/403" replace />
  }

  return children
}
