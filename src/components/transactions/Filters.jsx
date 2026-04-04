import { Search, X, SlidersHorizontal } from 'lucide-react'
import useStore from '../../store/useStore'
import { CATEGORIES } from '../../data/mockData'

const sel = 'px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-surface-600/60 ' +
            'bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-300 ' +
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

export default function Filters() {
  const { filters, setFilter } = useStore()
  const isDirty = filters.search || filters.category !== 'all' || filters.type !== 'all'

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl px-4 py-3
                    border border-slate-100 dark:border-surface-600/40 shadow-sm">
      <div className="flex items-center gap-2 mb-2.5">
        <SlidersHorizontal size={13} className="text-slate-400" />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Filters</span>
        {isDirty && (
          <button onClick={() => { setFilter('search',''); setFilter('category','all'); setFilter('type','all') }}
            className="ml-auto flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline">
            <X size={11} /> Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input type="text" placeholder="Search by merchant, note..."
            value={filters.search} onChange={e => setFilter('search', e.target.value)}
            className={`${sel} pl-8 w-full`} />
        </div>

        <select value={filters.category} onChange={e => setFilter('category', e.target.value)} className={sel}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
        </select>

        <select value={filters.type} onChange={e => setFilter('type', e.target.value)} className={sel}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={e => {
            const [by, ord] = e.target.value.split('-')
            setFilter('sortBy', by); setFilter('sortOrder', ord)
          }}
          className={sel}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>
    </div>
  )
}
