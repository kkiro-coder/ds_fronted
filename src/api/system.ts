import request from './request'
import type { ApiResponse } from '@/types/api'

export interface DnsConfig {
  id: number
  name: string
  server: string
  port: number
  enabled: boolean
}

export interface SchedulerTask {
  id: number
  name: string
  cron: string
  enabled: boolean
  lastRun?: string
  nextRun?: string
}

export interface LogConfig {
  level: string
  path: string
  maxSize: string
  maxAge: number
  compress: boolean
}

export interface ConnectionConfig {
  host: string
  port: number
  timeout: number
  maxRetries: number
  tls: boolean
}

export function getDnsConfigs() {
  return request.get<ApiResponse<DnsConfig[]>>('/system/dns-config')
}

export function updateDnsConfig(id: number, data: Partial<DnsConfig>) {
  return request.put<ApiResponse<DnsConfig>>(`/system/dns-config/${id}`, data)
}

export function getSchedulerTasks() {
  return request.get<ApiResponse<SchedulerTask[]>>('/system/scheduler')
}

export function toggleSchedulerTask(id: number, enabled: boolean) {
  return request.put<ApiResponse<SchedulerTask>>(`/system/scheduler/${id}`, { enabled })
}

export function getLogConfig() {
  return request.get<ApiResponse<LogConfig>>('/system/log-config')
}

export function updateLogConfig(data: Partial<LogConfig>) {
  return request.put<ApiResponse<LogConfig>>('/system/log-config', data)
}

export function getConnectionConfig() {
  return request.get<ApiResponse<ConnectionConfig>>('/system/connection-config')
}

export function updateConnectionConfig(data: Partial<ConnectionConfig>) {
  return request.put<ApiResponse<ConnectionConfig>>('/system/connection-config', data)
}
