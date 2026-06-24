import { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, Tree, Table, Tag, Spin, Empty, Tabs, Popover, Checkbox, Button, Input } from '@arco-design/web-react'
import Request from '@/api/request'
import type { OrgNode, StaffInfo } from '@/api/org'
import './index.css'

const TabPane = Tabs.TabPane

interface TreeNodeData {
  key: string
  title: string
  children?: TreeNodeData[]
  nodeData: OrgNode
}

function buildTreeData(nodes: OrgNode[]): TreeNodeData[] {
  return nodes.map((node) => ({
    key: node.orgId,
    title: node.title,
    children: node.children ? buildTreeData(node.children) : undefined,
    nodeData: node,
  }))
}

function collectAllKeys(nodes: TreeNodeData[]): string[] {
  const keys: string[] = []
  function walk(list: TreeNodeData[]) {
    for (const n of list) {
      keys.push(n.key)
      if (n.children) walk(n.children)
    }
  }
  walk(nodes)
  return keys
}

function collectAllStaff(nodes: OrgNode[]): StaffInfo[] {
  const result: StaffInfo[] = []
  function walk(list: OrgNode[]) {
    for (const n of list) {
      if (n.staffList) result.push(...n.staffList)
      if (n.children) walk(n.children)
    }
  }
  walk(nodes)
  return result
}

function collectNodeStaff(node: OrgNode): StaffInfo[] {
  const result: StaffInfo[] = []
  if (node.staffList) result.push(...node.staffList)
  if (node.children) {
    for (const child of node.children) {
      result.push(...collectNodeStaff(child))
    }
  }
  return result
}

function findNodeByOrgId(nodes: OrgNode[], orgId: string): OrgNode | null {
  for (const n of nodes) {
    if (n.orgId === orgId) return n
    if (n.children) {
      const found = findNodeByOrgId(n.children, orgId)
      if (found) return found
    }
  }
  return null
}

interface ColumnConfig {
  key: string
  title: string
  dataIndex: string
  width: number
  ellipsis?: boolean
  render?: (v: unknown) => JSX.Element
}

const COLUMN_CONFIG: ColumnConfig[] = [
  { key: 'staffNo', title: '工号', dataIndex: 'staffNo', width: 110 },
  { key: 'staffName', title: '姓名', dataIndex: 'staffName', width: 90 },
  { key: 'department', title: '部门', dataIndex: 'department', width: 160, ellipsis: true },
  { key: 'center', title: '中心', dataIndex: 'center', width: 120, ellipsis: true },
  { key: 'teamName', title: '团队', dataIndex: 'teamName', width: 160, ellipsis: true },
  { key: 'jobStation', title: '岗位', dataIndex: 'jobStation', width: 120 },
  { key: 'phoneNum', title: '手机号', dataIndex: 'phoneNum', width: 130 },
  { key: 'email', title: '邮箱', dataIndex: 'email', width: 180, ellipsis: true },
  {
    key: 'enabled',
    title: '状态',
    dataIndex: 'enabled',
    width: 70,
    render: (v: unknown) => (
      <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '启用' : '禁用'}</Tag>
    ),
  },
]

const ALL_COLUMN_KEYS = COLUMN_CONFIG.map((c) => c.key)

const PAGE_SIZE = 15

function HrOrgPanel() {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([])
  const [orgData, setOrgData] = useState<OrgNode[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrgId, setSelectedOrgId] = useState<string>('')
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleKeys, setVisibleKeys] = useState<string[]>(
    ALL_COLUMN_KEYS.filter((k) => k !== 'center' && k !== 'teamName'),
  )
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    Request.get('/staff/org/tree')
      .then((res) => {
        const data = (res.data as { code: number; data: OrgNode[] }).data
        const tree = buildTreeData(data)
        setOrgData(data)
        setTreeData(tree)
        setExpandedKeys(collectAllKeys(tree))
        if (data.length > 0) {
          setSelectedOrgId(data[0].orgId)
        }
      })
      .catch(() => {
        setTreeData([])
      })
      .finally(() => setLoading(false))
  }, [])

  const selectedNode = useMemo(
    () => findNodeByOrgId(orgData, selectedOrgId),
    [orgData, selectedOrgId],
  )

  const staffList = useMemo(() => {
    if (selectedOrgId && !selectedNode) return []
    if (!selectedNode) return collectAllStaff(orgData)
    return collectNodeStaff(selectedNode)
  }, [selectedNode, selectedOrgId, orgData])

  const filteredStaffList = useMemo(() => {
    if (!searchText.trim()) return staffList
    const kw = searchText.trim().toLowerCase()
    return staffList.filter(
      (s) =>
        s.staffNo.toLowerCase().includes(kw) ||
        s.staffName.toLowerCase().includes(kw) ||
        s.department.toLowerCase().includes(kw),
    )
  }, [staffList, searchText])

  const totalStaff = filteredStaffList.length

  const pagedStaff = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredStaffList.slice(start, start + PAGE_SIZE)
  }, [filteredStaffList, currentPage])

  const handleSelect = useCallback((keys: string[]) => {
    if (keys.length > 0) {
      setSelectedOrgId(keys[0])
      setCurrentPage(1)
    }
  }, [])

  const handleSearch = useCallback((value: string) => {
    setSearchText(value)
    setCurrentPage(1)
  }, [])

  const visibleColumns = useMemo(
    () => COLUMN_CONFIG.filter((c) => visibleKeys.includes(c.key)),
    [visibleKeys],
  )

  const scrollX = useMemo(
    () => visibleColumns.reduce((sum, c) => sum + c.width, 0),
    [visibleColumns],
  )

  const selectedKeys = selectedOrgId ? [selectedOrgId] : []

  if (loading) {
    return (
      <div className="org-tree-loading">
        <Spin tip="加载组织架构..." />
      </div>
    )
  }

  return (
    <div className="org-tree-body">
      <Card className="org-tree-left" bodyStyle={{ padding: 12 }}>
        {treeData.length === 0 ? (
          <Empty description="暂无组织数据" />
        ) : (
          <Tree
            treeData={treeData}
            selectedKeys={selectedKeys}
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            onSelect={handleSelect}
            blockNode
            size="small"
          />
        )}
      </Card>

      <Card className="org-tree-right" bodyStyle={{ padding: 0 }}>
        <div className="org-tree-right-header">
          <span className="org-tree-node-title">
            {selectedNode ? selectedNode.title : '全部人员'}
          </span>
          <div className="org-tree-right-header-right">
            <Input.Search
              placeholder="搜索工号/姓名/部门"
              value={searchText}
              onChange={handleSearch}
              onSearch={handleSearch}
              onClear={() => handleSearch('')}
              allowClear
              size="small"
              style={{ width: 220 }}
            />
            <span className="org-tree-staff-count">共 {totalStaff} 人</span>
            <Popover
              trigger="click"
              position="br"
              content={
                <div style={{ minWidth: 120 }}>
                  <Checkbox.Group
                    value={visibleKeys}
                    onChange={(vals) => setVisibleKeys(vals as string[])}
                    direction="vertical"
                  >
                    {COLUMN_CONFIG.map((c) => (
                      <Checkbox key={c.key} value={c.key}>
                        {c.title}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </div>
              }
            >
              <Button size="small" icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              }>
                列显隐
              </Button>
            </Popover>
          </div>
        </div>
        {pagedStaff.length === 0 ? (
          <div style={{ padding: 48, display: 'flex', justifyContent: 'center' }}>
            <Empty description="该节点暂无人员" />
          </div>
        ) : (
          <Table
            columns={visibleColumns}
            data={pagedStaff}
            rowKey="id"
            size="small"
            scroll={{ x: scrollX }}
            pagination={{
              current: currentPage,
              pageSize: PAGE_SIZE,
              total: totalStaff,
              showTotal: true,
              sizeCanChange: false,
              onChange: (page) => setCurrentPage(page),
            }}
          />
        )}
      </Card>
    </div>
  )
}

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <div className="org-tree-body">
      <Card style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          gap: 12,
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#64748B' }}>{title}</p>
          <p style={{ fontSize: 13, color: '#94A3B8' }}>模块建设中</p>
        </div>
      </Card>
    </div>
  )
}

export default function OrgTreePage() {
  const [activeTab, setActiveTab] = useState('hr-org')

  return (
    <div className="org-tree-page">
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        type="card-gutter"
        style={{ marginBottom: 0 }}
      >
        <TabPane key="hr-org" title="HR组织">
          {activeTab === 'hr-org' && <HrOrgPanel />}
        </TabPane>
        <TabPane key="rule-config" title="规则配置">
          {activeTab === 'rule-config' && <PlaceholderPanel title="规则配置" />}
        </TabPane>
        <TabPane key="std-org" title="标准组织">
          {activeTab === 'std-org' && <PlaceholderPanel title="标准组织" />}
        </TabPane>
      </Tabs>
    </div>
  )
}
