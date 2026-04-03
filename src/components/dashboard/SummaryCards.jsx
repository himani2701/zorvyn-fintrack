import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import useStore from '../../store/useStore'

const rupee = (n) => '₹' + Math.abs(Math.round(n)).toLocaleString('en-IN')

// pulls this month's income + expense totals
function thisMonthStats(txns) {
  const now = new Date()
  const slice = txns.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  return {
    income:   slice.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    expenses: slice.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
  }
}

// also get last month's expenses so we can show a trend arrow
function lastMonthExpenses(txns) {
  const now = new Date()
  const lm = now.getMonth() === 0 ? 11 : now.getMonth() - 1
  const ly = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
  return txns
    .filter(t => {
      const d = new Date(t.date)
      return t.type === 'expense' && d.getMonth() === lm && d.getFullYear() === ly
    })
    .reduce((s, t) => s + t.amount, 0)
}

export default function SummaryCards() {
  const { transactions: txns } = useStore()

  const { income, expenses } = thisMonthStats(txns)
  const lastExp = lastMonthExpenses(txns)
  const expChange = lastExp > 0 ? Math.round(((expenses - lastExp) / lastExp) * 100) : 0

  const totalBalance = txns.reduce(
    (s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0
  )
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0

  const cards = [
    {
      label:   'Net Balance',
      value:   rupee(totalBalance),
      sub:     'All-time net',
      icon:    Wallet,
      style:   'card-purple',
      iconBg:  'bg-brand-500',
      textClr: 'text-brand-700 dark:text-brand-400',
    },
    {
      label:   'Income',
      value:   rupee(income),
      sub:     'This month',
      icon:    TrendingUp,
      style:   'card-green',
      iconBg:  'bg-emerald-500',
      textClr: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      label:   'Expenses',
      value:   rupee(expenses),
      sub:     expChange !== 0
                 ? `${Math.abs(expChange)}% ${expChange > 0 ? '↑ vs last month' : '↓ vs last month'}`
                 : 'This month',
      icon:    TrendingDown,
      style:   'card-red',
      iconBg:  'bg-rose-500',
      textClr: 'text-rose-700 dark:text-rose-400',
      subClr:  expChange > 0 ? 'text-rose-500' : expChange < 0 ? 'text-emerald-500' : '',
    },
    {
      label:   'Savings Rate',
      value:   savingsRate + '%',
      sub:     savingsRate >= 20 ? '🎉 Doing well!' : savingsRate >= 10 ? 'Room to grow' : 'Needs attention',
      icon:    PiggyBank,
      style:   'card-amber',
      iconBg:  'bg-amber-500',
      textClr: 'text-amber-700 dark:text-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div key={c.label}
               className={`${c.style} rounded-2xl p-4 sm:p-5 border border-white/80
                           dark:border-white/5 shadow-sm animate-slide-up`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 ${c.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                <Icon size={16} className="text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-500 pt-0.5">
                {c.label}
              </span>
            </div>
            <p className={`text-xl sm:text-2xl font-bold ${c.textClr} leading-none`}>
              {c.value}
            </p>
            <p className={`text-xs mt-1.5 ${c.subClr || 'text-slate-500 dark:text-slate-500'}`}>
              {c.sub}
            </p>
          </div>
        )
      })}
    </div>
  )
}
