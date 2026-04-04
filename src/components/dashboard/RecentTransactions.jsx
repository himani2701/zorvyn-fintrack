import { format } from 'date-fns'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import useStore from '../../store/useStore'
import { CATEGORY_COLORS } from '../../data/mockData'

export default function RecentTransactions() {
  const { transactions: txns } = useStore()
  const recent = [...txns].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5
                    border border-slate-100 dark:border-surface-600/40 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-0.5">Latest activity</p>
        </div>
      </div>

      {recent.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-8">No transactions yet</p>
      ) : (
        <div className="space-y-0.5">
          {recent.map(txn => {
            const color = CATEGORY_COLORS[txn.category] || '#8b5cf6'
            return (
              <div key={txn.id}
                className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                {/* icon pill */}
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                     style={{ background: color + '20' }}>
                  {txn.type === 'income'
                    ? <ArrowUpRight size={14} style={{ color }} />
                    : <ArrowDownLeft size={14} style={{ color }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate leading-snug">
                    {txn.merchant}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {format(new Date(txn.date), 'dd MMM')} · {txn.category}
                  </p>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${
                  txn.type === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {txn.type === 'income' ? '+' : '−'}₹{txn.amount.toLocaleString('en-IN')}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
