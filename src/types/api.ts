export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PageParams {
  page: number
  pageSize: number
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  username: string
  avatar?: string
  permissions: string[]
}

export interface UserProfile {
  id: number
  username: string
  avatar: string
  email: string
  role: string
  permissions: string[]
  createdAt: string
}

export interface DashboardStats {
  todaySearch: number
  hitRate: number
  activeUsers: number
  avgResponseTime: number
}

export interface SearchTrend {
  date: string
  count: number
}

export interface HitTrend {
  date: string
  rate: number
}

export interface SearchRecord {
  id: number
  keyword: string
  user: string
  time: string
  count: number
  status: 'success' | 'partial' | 'miss'
}

export interface HotWord {
  rank: number
  word: string
  count: number
}
