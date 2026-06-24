import request from './request'
import type { ApiResponse, UserProfile } from '@/types/api'

export interface UpdateProfileData {
  avatar?: string
  email?: string
}

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export function getProfile() {
  return request.get<ApiResponse<UserProfile>>('/user/profile')
}

export function updateProfile(data: UpdateProfileData) {
  return request.put<ApiResponse<UserProfile>>('/user/profile', data)
}

export function changePassword(data: ChangePasswordData) {
  return request.put<ApiResponse<null>>('/user/password', data)
}
