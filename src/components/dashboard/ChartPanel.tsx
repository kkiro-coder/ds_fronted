import ReactECharts from 'echarts-for-react'
import { Card } from '@arco-design/web-react'

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const searchData = [82000, 95000, 88000, 115000, 103000, 128000, 112000]
const hitData = [94.2, 95.1, 94.8, 96.3, 96.0, 96.8, 96.5]

function areaOption(data: number[], color: string) {
  return {
    grid: { top: 12, right: 8, bottom: 4, left: 8 },
    xAxis: {
      type: 'category' as const,
      data: days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
    },
    yAxis: {
      type: 'value' as const,
      show: false,
      min: (val: { min: number }) => Math.floor(val.min * 0.95),
    },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color, width: 2.5 },
        itemStyle: {
          color,
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: color + '40' },
              { offset: 1, color: color + '00' },
            ],
          },
        },
      },
    ],
  }
}

export default function ChartPanel() {
  return (
    <div className="db-chart-panel">
      <Card className="db-chart-card" title="搜索量趋势">
        <ReactECharts option={areaOption(searchData, '#4F46E5')} style={{ height: 180 }} />
      </Card>
      <Card className="db-chart-card" title="命中率趋势">
        <ReactECharts option={areaOption(hitData, '#10B981')} style={{ height: 180 }} />
      </Card>
    </div>
  )
}
