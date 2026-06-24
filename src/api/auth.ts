import request from './request'
import type { ApiResponse, LoginRequest, LoginResult, UserProfile } from '@/types/api'

export function login(data: LoginRequest) {
  return request.post<ApiResponse<LoginResult>>('/auth/login', data)
}

export function logout() {
  return request.post<ApiResponse<null>>('/auth/logout')
}

export function getUserProfile() {
  return request.get<ApiResponse<UserProfile>>('/auth/profile')
}

export function refreshToken() {
  return request.post<ApiResponse<{ token: string }>>('/auth/refresh')
}
