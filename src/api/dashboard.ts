import request from './request'
import type {
  ApiResponse,
  DashboardStats,
  SearchTrend,
  HitTrend,
  SearchRecord,
  HotWord,
  PageParams,
  PageResult,
} from '@/types/api'

export function getStats() {
  return request.get<ApiResponse<DashboardStats>>('/dashboard/stats')
}

export function getSearchTrend(days?: number) {
  return request.get<ApiResponse<SearchTrend[]>>('/dashboard/search-trend', {
    params: { days: days ?? 7 },
  })
}

export function getHitTrend(days?: number) {
  return request.get<ApiResponse<HitTrend[]>>('/dashboard/hit-trend', {
    params: { days: days ?? 7 },
  })
}

export function getSearchRecords(params: PageParams) {
  return request.get<ApiResponse<PageResult<SearchRecord>>>('/dashboard/records', {
    params,
  })
}

export function getHotWords(limit?: number) {
  return request.get<ApiResponse<HotWord[]>>('/dashboard/hot-words', {
    params: { limit: limit ?? 10 },
  })
}
