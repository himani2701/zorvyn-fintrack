import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import useStore from '../../store/useStore'

function last6MonthsBalance(txns) {
  const now = new Date()

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    return { label: d.toLocaleString('default', { month: 'short' }), month: d.getMonth(), year: d.getFullYear() }
  })

  // running total starting from whatever was before our window
  const windowStart = new Date(now.getFullYear(), now.getMonth() - 5, 1)
  let running = txns
    .filter(t => new Date(t.date) < windowStart)
    .reduce((s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0)

  return months.map(({ label, month, year }) => {
    txns
      .filter(t => { const d = new Date(t.date); return d.getMonth() === month && d.getFullYear() === year })
      .forEach(t => { running += t.type === 'income' ? t.amount : -t.amount })
    return { month: label, balance: running }
  })
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-surface-700 border border-slate-100 dark:border-surface-600/50
                    rounded-xl px-3 py-2.5 shadow-xl text-sm">
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-0.5">{label}</p>
      <p className="font-bold text-brand-600 dark:text-brand-400">
        ₹{payload[0].value.toLocaleString('en-IN')}
      </p>
    </div>
  )
}

export default function BalanceTrend() {
  const { transactions: txns } = useStore()
  const data = last6MonthsBalance(txns)

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5
                    border border-slate-100 dark:border-surface-600/40 shadow-sm h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Balance Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5">6-month running net balance</p>
        </div>
        <span className="text-[10px] bg-brand-100 dark:bg-brand-700/20 text-brand-600 dark:text-brand-400
                         px-2 py-1 rounded-full font-medium">6M</span>
      </div>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:[&>line]:stroke-surface-600/40" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            axisLine={false} tickLine={false}
            tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}
            width={42}
          />
          <Tooltip content={<Tip />} />
          <Area
            type="monotone" dataKey="balance"
            stroke="#7c3aed" strokeWidth={2.5}
            fill="url(#balGrad)"
            dot={{ r: 3.5, fill: '#7c3aed', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#7c3aed', stroke: '#ede9fe', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
