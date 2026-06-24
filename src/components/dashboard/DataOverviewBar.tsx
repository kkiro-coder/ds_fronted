import ReactECharts from 'echarts-for-react'
import { Card } from '@arco-design/web-react'

const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
const data = [420, 280, 190, 350, 820, 1340, 1650, 1820, 1560, 1280, 950, 680]

const option = {
  grid: { top: 8, right: 16, bottom: 8, left: 16 },
  tooltip: { trigger: 'axis' as const },
  xAxis: {
    type: 'category' as const,
    data: hours,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94A3B8', fontSize: 11 },
  },
  yAxis: {
    type: 'value' as const,
    show: false,
  },
  series: [
    {
      data,
      type: 'bar',
      barWidth: 14,
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#818CF8' },
            { offset: 1, color: '#4F46E5' },
          ],
        },
      },
      emphasis: {
        itemStyle: {
          color: '#6366F1',
        },
      },
    },
  ],
}

export default function DataOverviewBar() {
  return (
    <Card
      className="db-overview-bar-card"
      title={
        <span style={{ fontSize: 16, fontWeight: 700 }}>求索</span>
      }
    >
      <div className="db-overview-bar-chart">
        <ReactECharts option={option} style={{ height: 260 }} />
      </div>
    </Card>
  )
}
