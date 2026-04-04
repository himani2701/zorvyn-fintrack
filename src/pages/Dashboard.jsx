import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingPie from '../components/dashboard/SpendingPie'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import WeeklyBars from '../components/dashboard/WeeklyBars'

export default function Dashboard() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto animate-fade-in">
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3"><BalanceTrend /></div>
        <div className="lg:col-span-2"><SpendingPie /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2"><WeeklyBars /></div>
        <div className="lg:col-span-3"><RecentTransactions /></div>
      </div>
    </div>
  )
}
