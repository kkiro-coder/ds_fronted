import BrandPanel from '@/components/BrandPanel'
import LoginForm from '@/components/LoginForm'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate, useLocation } from 'react-router-dom'
import { Message } from '@arco-design/web-react'
import { ALL_PERMISSIONS } from '@/constants/permissions'

export default function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginSuccess = (username: string) => {
    login(username, 'mock-token', ALL_PERMISSIONS, '', 'admin')
    const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard/workplace'
    navigate(from, { replace: true })
  }

  const handleShowToast = (msg: string, type: 'success' | 'error') => {
    Message[type]({ content: msg, duration: 3000 })
  }

  return (
    <>
      <BrandPanel />
      <LoginForm onShowToast={handleShowToast} onLoginSuccess={handleLoginSuccess} />
    </>
  )
}
