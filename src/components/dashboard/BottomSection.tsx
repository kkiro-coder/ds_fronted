import { Card, Table, Tag } from '@arco-design/web-react'

interface Record {
  keyword: string
  user: string
  time: string
  count: number
  status: 'success' | 'partial' | 'miss'
}

const records: Record[] = [
  { keyword: 'React 18 hooks 教程', user: 'admin', time: '13:42', count: 1842, status: 'success' },
  { keyword: 'TypeScript 类型体操', user: 'user01', time: '13:38', count: 1204, status: 'success' },
  { keyword: 'Vite 构建优化', user: 'user02', time: '13:31', count: 963, status: 'partial' },
  { keyword: '前端性能监控方案', user: 'user03', time: '13:24', count: 741, status: 'success' },
  { keyword: 'Next.js 服务端渲染', user: 'user04', time: '13:17', count: 628, status: 'success' },
  { keyword: 'CSS Grid 布局指南', user: 'user05', time: '13:09', count: 512, status: 'miss' },
]

const statusMap = {
  success: { label: '命中', color: 'green' as const },
  partial: { label: '部分', color: 'orange' as const },
  miss: { label: '未命中', color: 'red' as const },
}

const columns = [
  {
    title: '关键词',
    dataIndex: 'keyword',
    render: (v: string) => <span className="db-keyword-tag">{v}</span>,
  },
  { title: '用户', dataIndex: 'user' },
  { title: '时间', dataIndex: 'time' },
  {
    title: '次数',
    dataIndex: 'count',
    render: (v: number) => v.toLocaleString(),
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (v: 'success' | 'partial' | 'miss') => {
      const s = statusMap[v]
      return <Tag color={s.color}>{s.label}</Tag>
    },
  },
]

const hotwords = [
  { rank: 1, word: 'React 18', count: '128k' },
  { rank: 2, word: 'TypeScript', count: '96k' },
  { rank: 3, word: 'Vue 3', count: '84k' },
  { rank: 4, word: 'Vite 打包', count: '61k' },
  { rank: 5, word: 'Next.js', count: '54k' },
  { rank: 6, word: 'Tailwind CSS', count: '47k' },
  { rank: 7, word: 'Node.js 18', count: '39k' },
  { rank: 8, word: 'pnpm workspace', count: '31k' },
]

export default function BottomSection() {
  return (
    <div className="db-bottom-section">
      <Card title="最近搜索记录" className="db-table-card">
        <Table
          columns={columns}
          data={records}
          rowKey="keyword"
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="热词榜单" className="db-hotwords-card">
        <div className="db-hotwords-list">
          {hotwords.map((h) => (
            <div key={h.rank} className="db-hotword-item">
              <span className={`db-rank ${h.rank <= 3 ? 'top' : ''}`}>{h.rank}</span>
              <span className="db-hotword-text">{h.word}</span>
              <span className="db-hotword-count">{h.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
