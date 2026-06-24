import axios, { AxiosError } from 'axios'
import { Message } from '@arco-design/web-react'
import { useAuthStore } from '@/stores/authStore'
import type { ApiResponse } from '@/types/api'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

function onTokenRefreshed(newToken: string) {
  pendingRequests.forEach((cb) => cb(newToken))
  pendingRequests = []
}

request.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse
    if (data.code !== 0 && data.code !== 200) {
      Message.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
    return response
  },
  (error: AxiosError<ApiResponse>) => {
    const status = error.response?.status
    const msg = error.response?.data?.message

    switch (status) {
      case 401: {
        if (!isRefreshing) {
          isRefreshing = true
          useAuthStore.getState().logout()
          isRefreshing = false
          onTokenRefreshed('')
          window.location.href = '/login'
        }
        break
      }
      case 403:
        Message.error('没有访问权限')
        break
      case 404:
        Message.error('请求的资源不存在')
        break
      case 500:
        Message.error(msg || '服务器内部错误')
        break
      default:
        if (error.message?.includes('Network Error')) {
          Message.error('网络连接失败，请检查网络')
        } else if (error.message?.includes('timeout')) {
          Message.error('请求超时，请重试')
        } else {
          Message.error(msg || '请求失败')
        }
    }

    return Promise.reject(error)
  },
)

export default request
