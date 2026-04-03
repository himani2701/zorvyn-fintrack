import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import useStore from '../../store/useStore'
import { CATEGORY_COLORS } from '../../data/mockData'

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0].payload
  return (
    <div className="bg-white dark:bg-surface-700 border border-slate-100 dark:border-surface-600/50
                    rounded-xl px-3 py-2 shadow-xl text-sm">
      <p className="font-medium text-slate-700 dark:text-slate-200">{name}</p>
      <p className="text-brand-600 dark:text-brand-400 font-bold">₹{value.toLocaleString('en-IN')}</p>
    </div>
  )
}

export default function SpendingPie() {
  const { transactions: txns } = useStore()

  const now = new Date()
  const byCategory = {}
  txns
    .filter(t => {
      const d = new Date(t.date)
      return t.type === 'expense' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .forEach(t => { byCategory[t.category] = (byCategory[t.category] || 0) + t.amount })

  const slices = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const total = slices.reduce((s, x) => s + x.value, 0)

  if (!slices.length) return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-slate-100 dark:border-surface-600/40 shadow-sm
                    flex items-center justify-center min-h-[280px]">
      <p className="text-slate-400 text-sm">No expenses this month yet</p>
    </div>
  )

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-slate-100 dark:border-surface-600/40 shadow-sm h-full">
      <div className="mb-3">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Spending Breakdown</h3>
        <p className="text-xs text-slate-400 mt-0.5">This month · ₹{total.toLocaleString('en-IN')} total</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="shrink-0" style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={slices} cx="50%" cy="50%" innerRadius={42} outerRadius={65}
                   paddingAngle={3} dataKey="value">
                {slices.map(e => (
                  <Cell key={e.name} fill={CATEGORY_COLORS[e.name] || '#8b5cf6'} />
                ))}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* legend with percentages — more useful than recharts default */}
        <div className="flex-1 space-y-2 min-w-0">
          {slices.slice(0, 5).map(s => {
            const pct = Math.round((s.value / total) * 100)
            const color = CATEGORY_COLORS[s.name] || '#8b5cf6'
            return (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-xs text-slate-600 dark:text-slate-400 truncate flex-1">{s.name}</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">{pct}%</span>
              </div>
            )
          })}
          {slices.length > 5 && (
            <p className="text-[10px] text-slate-400">+{slices.length - 5} more categories</p>
          )}
        </div>
      </div>
    </div>
  )
}
