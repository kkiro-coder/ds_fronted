export type AppPage = 'login' | 'dashboard'

export interface UserInfo {
  username: string
  avatar: string
}

export type ToastType = 'success' | 'error'

export interface ToastState {
  visible: boolean
  message: string
  type: ToastType
}
