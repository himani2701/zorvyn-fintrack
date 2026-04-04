import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import useStore from '../../store/useStore'
import { CATEGORY_COLORS } from '../../data/mockData'

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, total } = payload[0].payload
  return (
    <div className="bg-white dark:bg-surface-700 border border-slate-100 dark:border-surface-600/50
                    rounded-xl px-3 py-2 shadow-xl text-sm">
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-0.5">{name}</p>
      <p className="font-bold text-slate-800 dark:text-white">₹{total.toLocaleString('en-IN')}</p>
    </div>
  )
}

export default function CategoryBreakdown() {
  const { transactions: txns } = useStore()

  const byCat = {}
  txns.filter(t => t.type === 'expense')
      .forEach(t => { byCat[t.category] = (byCat[t.category] || 0) + t.amount })

  const data = Object.entries(byCat)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5
                    border border-slate-100 dark:border-surface-600/40 shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">All-Time by Category</h3>
        <p className="text-xs text-slate-400 mt-0.5">Total spending per category</p>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} layout="vertical" barSize={14}
                  margin={{ top: 0, right: 10, left: 5, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"
                         className="dark:[&>line]:stroke-surface-600/30" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                 tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }}
                 axisLine={false} tickLine={false} width={95} />
          <Tooltip content={<Tip />} cursor={{ fill: 'rgba(139,92,246,0.05)' }} />
          <Bar dataKey="total" radius={[0, 4, 4, 0]}>
            {data.map(e => (
              <Cell key={e.name} fill={CATEGORY_COLORS[e.name] || '#8b5cf6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
