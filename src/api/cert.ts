import request from './request'
import type { ApiResponse, PageParams, PageResult } from '@/types/api'

export interface CertOrder {
  id: number
  domain: string
  type: string
  status: string
  expireDate: string
  createdAt: string
}

export interface CertScanResult {
  id: number
  domain: string
  score: number
  issues: number
  scanTime: string
}

export function getCertOrders(params: PageParams) {
  return request.get<ApiResponse<PageResult<CertOrder>>>('/cert/orders', { params })
}

export function getCertScans(params: PageParams) {
  return request.get<ApiResponse<PageResult<CertScanResult>>>('/cert/scans', { params })
}

export function createCertOrder(data: Partial<CertOrder>) {
  return request.post<ApiResponse<CertOrder>>('/cert/orders', data)
}

export function startCertScan(domain: string) {
  return request.post<ApiResponse<CertScanResult>>('/cert/scans', { domain })
}
