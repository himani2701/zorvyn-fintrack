import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import useStore from '../../store/useStore'

// shows daily spend for the last 7 days — quick glance at recent activity
function lastWeekByDay(txns) {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const amt = txns
      .filter(t => t.date === dateStr && t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0)
    return {
      day: d.toLocaleDateString('default', { weekday: 'short' }),
      spent: amt,
      isToday: i === 6,
    }
  })
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-surface-700 border border-slate-100 dark:border-surface-600/50
                    rounded-xl px-2.5 py-1.5 shadow-xl text-xs">
      <p className="text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-bold text-slate-800 dark:text-white">
        {payload[0].value > 0 ? `₹${payload[0].value.toLocaleString('en-IN')}` : '—'}
      </p>
    </div>
  )
}

export default function WeeklyBars() {
  const { transactions: txns } = useStore()
  const data = lastWeekByDay(txns)
  const hasAny = data.some(d => d.spent > 0)

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5
                    border border-slate-100 dark:border-surface-600/40 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">This Week</h3>
          <p className="text-xs text-slate-400 mt-0.5">Daily spending · last 7 days</p>
        </div>
        {hasAny && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ₹{data.reduce((s, d) => s + d.spent, 0).toLocaleString('en-IN')} total
          </span>
        )}
      </div>

      {hasAny ? (
        <ResponsiveContainer width="100%" height={90}>
          <BarChart data={data} barSize={22} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} cursor={{ fill: 'rgba(139,92,246,0.06)' }} />
            <Bar dataKey="spent" radius={[4, 4, 0, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.isToday ? '#7c3aed' : d.spent > 0 ? '#c4b5fd' : '#e2e8f0'}
                      className={d.isToday ? '' : 'dark:fill-[#3b2f6b]'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[90px] flex items-center justify-center">
          <p className="text-xs text-slate-400">No spending recorded this week</p>
        </div>
      )}
    </div>
  )
}
