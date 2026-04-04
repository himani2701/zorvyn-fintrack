import useStore from '../../store/useStore'
import { CATEGORY_COLORS } from '../../data/mockData'

// shows top 5 merchants by total spend — gives a "where does my money go" feel
export default function TopMerchants() {
  const { transactions: txns } = useStore()

  const byMerchant = {}
  txns
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!byMerchant[t.merchant]) byMerchant[t.merchant] = { total: 0, category: t.category, count: 0 }
      byMerchant[t.merchant].total += t.amount
      byMerchant[t.merchant].count += 1
    })

  const ranked = Object.entries(byMerchant)
    .map(([name, d]) => ({ name, ...d }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)

  const maxVal = ranked[0]?.total || 1

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5
                    border border-slate-100 dark:border-surface-600/40 shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Top Merchants</h3>
        <p className="text-xs text-slate-400 mt-0.5">Where most of your money goes</p>
      </div>

      <div className="space-y-3">
        {ranked.map((m, idx) => {
          const color = CATEGORY_COLORS[m.category] || '#8b5cf6'
          const barW = Math.round((m.total / maxVal) * 100)
          return (
            <div key={m.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-bold text-slate-400 w-4 shrink-0">#{idx + 1}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                    {m.name}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {m.count}x
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 shrink-0 ml-2">
                  ₹{m.total.toLocaleString('en-IN')}
                </span>
              </div>
              {/* progress bar */}
              <div className="h-1.5 bg-slate-100 dark:bg-surface-600/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                     style={{ width: `${barW}%`, background: color }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
