import InsightCards from '../components/insights/InsightCards'
import MonthlyComparison from '../components/insights/MonthlyComparison'
import CategoryBreakdown from '../components/insights/CategoryBreakdown'
import TopMerchants from '../components/insights/TopMerchants'
import useStore from '../store/useStore'

function savingsTip(txns) {
  const income   = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const rate = income > 0 ? ((income - expenses) / income) * 100 : 0

  if (rate >= 30) return { msg: "You're saving over 30% of your income. That's genuinely solid — most people don't get here.", emoji: '🟢' }
  if (rate >= 15) return { msg: "Savings rate is between 15–30%. Not bad, but there's definitely room to push further.", emoji: '🟡' }
  return { msg: "Savings rate is below 15%. Worth taking a closer look at recurring discretionary spend.", emoji: '🔴' }
}

export default function Insights() {
  const { transactions: txns } = useStore()
  const tip = savingsTip(txns)

  return (
    <div className="space-y-4 max-w-7xl mx-auto animate-fade-in">
      <InsightCards />

      {/* savings nudge */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl px-5 py-4
                      border border-slate-100 dark:border-surface-600/40 shadow-sm
                      flex items-start gap-3">
        <span className="text-xl leading-none mt-0.5">{tip.emoji}</span>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{tip.msg}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyComparison />
        <CategoryBreakdown />
      </div>

      <TopMerchants />
    </div>
  )
}
