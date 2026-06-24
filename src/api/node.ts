import request from './request'
import type { ApiResponse, PageParams, PageResult } from '@/types/api'

export interface NodeInfo {
  id: number
  name: string
  host: string
  port: number
  status: 'online' | 'offline' | 'error'
  cpu: number
  memory: number
  disk: number
  uptime: string
}

export interface NodeMetric {
  time: string
  cpu: number
  memory: number
  network: number
}

export function getNodeList(params: PageParams) {
  return request.get<ApiResponse<PageResult<NodeInfo>>>('/nodes', { params })
}

export function getNodeDetail(id: number) {
  return request.get<ApiResponse<NodeInfo>>(`/nodes/${id}`)
}

export function getNodeMetrics(id: number, duration?: string) {
  return request.get<ApiResponse<NodeMetric[]>>(`/nodes/${id}/metrics`, {
    params: { duration: duration ?? '1h' },
  })
}
