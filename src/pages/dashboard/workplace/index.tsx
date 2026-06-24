import StatsRow from '@/components/dashboard/StatsRow'
import ChartPanel from '@/components/dashboard/ChartPanel'
import BottomSection from '@/components/dashboard/BottomSection'
import DataOverviewBar from '@/components/dashboard/DataOverviewBar'

export default function WorkplacePage() {
  return (
    <>
      <DataOverviewBar />
      <StatsRow />
      <ChartPanel />
      <BottomSection />
    </>
  )
}
