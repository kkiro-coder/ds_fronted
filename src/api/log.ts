import request from './request'
import type { ApiResponse, PageParams, PageResult } from '@/types/api'

export interface LogEntry {
  id: number
  user: string
  action: string
  detail: string
  ip: string
  createdAt: string
}

export function getLoginLogs(params: PageParams) {
  return request.get<ApiResponse<PageResult<LogEntry>>>('/logs/login', { params })
}

export function getOperationLogs(params: PageParams) {
  return request.get<ApiResponse<PageResult<LogEntry>>>('/logs/operation', { params })
}

export function getNotificationLogs(params: PageParams) {
  return request.get<ApiResponse<PageResult<LogEntry>>>('/logs/notification', { params })
}

export function getSystemLogs(params: PageParams) {
  return request.get<ApiResponse<PageResult<LogEntry>>>('/logs/system', { params })
}
