import request from './request'
import type { ApiResponse } from '@/types/api'

export interface StaffInfo {
  id: number
  staffNo: string
  staffName: string
  department: string
  companyName: string
  departCode: string
  jobStation: string
  teamId: string | null
  orgId: string
  ctId: string | null
  teamName: string
  center: string
  phoneNum: string
  email: string
  enabled: number
}

export interface OrgNode {
  id: number
  orgId: string
  ctId: string | null
  title: string
  type: number
  leader1: string
  leader2: string
  centerName: string
  centerHead: string
  deptName: string
  status: number
  director: string
  companyName: string
  children: OrgNode[] | null
  staffList: StaffInfo[] | null
}

export function getOrgTree() {
  return request.get<ApiResponse<OrgNode[]>>('/staff/org/tree')
}
