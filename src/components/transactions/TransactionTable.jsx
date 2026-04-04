import { Pencil, Trash2, ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import useStore from '../../store/useStore'
import { CATEGORY_COLORS } from '../../data/mockData'

export default function TransactionTable({ onEdit }) {
  const { transactions: txns, filters, role, deleteTransaction, setFilter } = useStore()

  let filtered = txns.filter(t => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!t.merchant.toLowerCase().includes(q) &&
          !t.category.toLowerCase().includes(q) &&
          !(t.note || '').toLowerCase().includes(q)) return false
    }
    if (filters.category !== 'all' && t.category !== filters.category) return false
    if (filters.type !== 'all' && t.type !== filters.type) return false
    return true
  })

  filtered = [...filtered].sort((a, b) => {
    const dir = filters.sortOrder === 'desc' ? -1 : 1
    return filters.sortBy === 'date'
      ? dir * (new Date(a.date) - new Date(b.date))
      : dir * (a.amount - b.amount)
  })

  const toggleSort = (field) => {
    if (filters.sortBy === field) setFilter('sortOrder', filters.sortOrder === 'desc' ? 'asc' : 'desc')
    else { setFilter('sortBy', field); setFilter('sortOrder', 'desc') }
  }

  const confirmDelete = (id) => {
    if (window.confirm('Remove this transaction?')) deleteTransaction(id)
  }

  const th = 'text-xs font-medium text-slate-500 dark:text-slate-400 py-3 px-4'

  if (!filtered.length) return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl border border-slate-100 dark:border-surface-600/40
                    shadow-sm py-20 text-center">
      <p className="text-slate-500 dark:text-slate-400 font-medium">Nothing found</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try loosening your filters</p>
    </div>
  )

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl border border-slate-100 dark:border-surface-600/40 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-surface-600/40">
              <th className={`${th} text-left cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200`}
                  onClick={() => toggleSort('date')}>
                <span className="flex items-center gap-1.5">Date <ArrowUpDown size={11} /></span>
              </th>
              <th className={`${th} text-left`}>Merchant</th>
              <th className={`${th} text-left hidden md:table-cell`}>Category</th>
              <th className={`${th} text-right cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200`}
                  onClick={() => toggleSort('amount')}>
                <span className="flex items-center justify-end gap-1.5">Amount <ArrowUpDown size={11} /></span>
              </th>
              {role === 'admin' && <th className={`${th} text-right`}>Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-surface-600/20">
            {filtered.map(txn => {
              const catColor = CATEGORY_COLORS[txn.category] || '#8b5cf6'
              return (
                <tr key={txn.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">
                    {format(new Date(txn.date), 'dd MMM yy')}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-700 dark:text-slate-200 leading-none">{txn.merchant}</p>
                    {txn.note && (
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[200px]">{txn.note}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: catColor + '18', color: catColor }}>
                      {txn.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold text-sm ${
                      txn.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {txn.type === 'income' ? '+' : '−'}₹{txn.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onEdit(txn)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 dark:hover:text-brand-400
                                     hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => confirmDelete(txn.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400
                                     hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-slate-50 dark:border-surface-600/30
                      bg-slate-50/50 dark:bg-white/[0.01] text-xs text-slate-400">
        {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
