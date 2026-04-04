import { TrendingDown, Flame, BarChart2, Target } from 'lucide-react'
import useStore from '../../store/useStore'
import { CATEGORY_COLORS } from '../../data/mockData'

const rupee = n => '₹' + Math.round(n).toLocaleString('en-IN')

export default function InsightCards() {
  const { transactions: txns } = useStore()

  const expenses = txns.filter(t => t.type === 'expense')

  // top spending category all time
  const spendByCat = {}
  expenses.forEach(t => { spendByCat[t.category] = (spendByCat[t.category] || 0) + t.amount })
  const topCat = Object.entries(spendByCat).sort((a, b) => b[1] - a[1])[0]

  // biggest transaction ever
  const biggestTxn = [...expenses].sort((a, b) => b.amount - a.amount)[0]

  // month over month expense delta
  const now = new Date()
  const thisM = now.getMonth(), thisY = now.getFullYear()
  const lastM = thisM === 0 ? 11 : thisM - 1
  const lastY = thisM === 0 ? thisY - 1 : thisY

  const thisMonthAmt = expenses.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === thisM && d.getFullYear() === thisY
  }).reduce((s, t) => s + t.amount, 0)

  const lastMonthAmt = expenses.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === lastM && d.getFullYear() === lastY
  }).reduce((s, t) => s + t.amount, 0)

  const momDelta = lastMonthAmt > 0 ? Math.round(((thisMonthAmt - lastMonthAmt) / lastMonthAmt) * 100) : 0

  // avg monthly spend
  const allIncome = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const allExpenses = expenses.reduce((s, t) => s + t.amount, 0)
  const savingsRate = allIncome > 0 ? Math.round(((allIncome - allExpenses) / allIncome) * 100) : 0

  const cards = [
    {
      label: 'Top Category',
      value: topCat ? topCat[0] : '—',
      detail: topCat ? `${rupee(topCat[1])} total` : '',
      icon: TrendingDown,
      color: topCat ? CATEGORY_COLORS[topCat[0]] || '#8b5cf6' : '#8b5cf6',
    },
    {
      label: 'Biggest Expense',
      value: biggestTxn ? biggestTxn.merchant : '—',
      detail: biggestTxn ? rupee(biggestTxn.amount) : '',
      icon: Flame,
      color: '#f43f5e',
    },
    {
      label: 'vs Last Month',
      value: momDelta === 0 ? 'Same spending' : `${Math.abs(momDelta)}% ${momDelta > 0 ? 'more' : 'less'}`,
      detail: `Last: ${rupee(lastMonthAmt)}`,
      icon: BarChart2,
      color: momDelta > 5 ? '#f97316' : momDelta < -5 ? '#22c55e' : '#8b5cf6',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      detail: savingsRate >= 25 ? '🎯 Great discipline' : savingsRate >= 15 ? '📈 Keep it up' : '⚠️ Needs attention',
      icon: Target,
      color: savingsRate >= 25 ? '#22c55e' : savingsRate >= 15 ? '#f59e0b' : '#f43f5e',
    },
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(c => {
        const Icon = c.icon
        return (
          <div key={c.label}
               className="bg-white dark:bg-surface-800 rounded-2xl p-5
                          border border-slate-100 dark:border-surface-600/40 shadow-sm animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">{c.label}</p>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                   style={{ background: c.color + '20' }}>
                <Icon size={15} style={{ color: c.color }} />
              </div>
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-100 text-base truncate leading-tight">
              {c.value}
            </p>
            <p className="text-xs text-slate-400 mt-1 truncate">{c.detail}</p>
          </div>
        )
      })}
    </div>
  )
}
