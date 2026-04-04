import { useState } from 'react'
import { Plus, Download, Lock } from 'lucide-react'
import Filters from '../components/transactions/Filters'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionModal from '../components/transactions/TransactionModal'
import useStore from '../store/useStore'

export default function Transactions() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const { role, exportCSV, transactions: txns, filters } = useStore()

  const openEdit = (txn) => { setEditTarget(txn); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditTarget(null) }

  // export only what's currently filtered
  const doExport = () => {
    let rows = txns.filter(t => {
      if (filters.category !== 'all' && t.category !== filters.category) return false
      if (filters.type !== 'all' && t.type !== filters.type) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        return t.merchant.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      }
      return true
    })
    exportCSV(rows)
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          {role === 'viewer' && <Lock size={12} className="text-amber-500" />}
          {role === 'admin' ? 'Add, edit or delete transactions below' : 'View-only mode — switch to Admin to edit'}
        </p>
        <div className="flex items-center gap-2">
          <button onClick={doExport}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300
                       border border-slate-200 dark:border-surface-600/60 rounded-xl
                       hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <Download size={14} />
            Export CSV
          </button>
          {role === 'admin' && (
            <button onClick={() => { setEditTarget(null); setModalOpen(true) }}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-xl
                         shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
              <Plus size={15} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <Filters />
      <TransactionTable onEdit={openEdit} />

      {modalOpen && <TransactionModal transaction={editTarget} onClose={closeModal} />}
    </div>
  )
}
