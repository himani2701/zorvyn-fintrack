import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import useStore from '../../store/useStore'

function buildData(txns) {
  const now = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const label = d.toLocaleString('default', { month: 'short' })
    const slice = txns.filter(t => {
      const td = new Date(t.date)
      return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear()
    })
    return {
      month: label,
      income: slice.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      expenses: slice.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    }
  })
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-surface-700 border border-slate-100 dark:border-surface-600/50
                    rounded-xl px-3 py-2.5 shadow-xl text-sm">
      <p className="font-semibold text-slate-600 dark:text-slate-300 text-xs mb-1.5">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500 capitalize">{p.name}:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            ₹{p.value.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyComparison() {
  const { transactions: txns } = useStore()
  const data = buildData(txns)

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5
                    border border-slate-100 dark:border-surface-600/40 shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Income vs Expenses</h3>
        <p className="text-xs text-slate-400 mt-0.5">6-month comparison</p>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} barCategoryGap="35%" barGap={3} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"
                         className="dark:[&>line]:stroke-surface-600/30" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                 tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={40} />
          <Tooltip content={<Tip />} cursor={{ fill: 'rgba(139,92,246,0.05)' }} />
          <Legend iconType="circle" iconSize={7}
            formatter={v => <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'capitalize' }}>{v}</span>} />
          <Bar dataKey="income"   fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={36} />
          <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
