import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import useStore from '../../store/useStore'
import { CATEGORIES } from '../../data/mockData'

const blank = {
  merchant: '', category: 'Food & Dining', amount: '',
  type: 'expense', date: new Date().toISOString().split('T')[0], note: '',
}

const inp = 'w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-surface-600/60 ' +
            'bg-white dark:bg-surface-700 text-slate-700 dark:text-slate-200 ' +
            'placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useStore()
  const editing = !!transaction

  const [form, setForm] = useState(blank)
  const [errs, setErrs] = useState({})

  useEffect(() => {
    if (transaction) setForm({ ...transaction, amount: String(transaction.amount), note: transaction.note || '' })
  }, [transaction])

  const upd = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrs(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.merchant.trim()) e.merchant = 'Required'
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = 'Enter a valid amount'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrs(e2); return }
    const payload = { ...form, amount: parseFloat(form.amount) }
    editing ? updateTransaction(transaction.id, payload) : addTransaction(payload)
    onClose()
  }

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-surface-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up
                      border border-slate-100 dark:border-surface-600/50">

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-surface-600/40">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
            {editing ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <button onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg
                       hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={submit} className="p-5 space-y-4">
          {/* income / expense toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-surface-600/60 p-0.5
                          bg-slate-50 dark:bg-surface-700/50">
            {['expense', 'income'].map(t => (
              <button key={t} type="button" onClick={() => upd('type', t)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg capitalize transition-all
                  ${form.type === t
                    ? t === 'expense'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                  }`}>
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Merchant / Description
            </label>
            <input type="text" value={form.merchant} onChange={e => upd('merchant', e.target.value)}
              placeholder="e.g. Swiggy, Netflix, Salary..." className={inp} />
            {errs.merchant && <p className="text-xs text-rose-500 mt-1">{errs.merchant}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Amount (₹)</label>
              <input type="number" min="1" value={form.amount} onChange={e => upd('amount', e.target.value)}
                placeholder="0" className={inp} />
              {errs.amount && <p className="text-xs text-rose-500 mt-1">{errs.amount}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={e => upd('date', e.target.value)} className={inp} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Category</label>
            <select value={form.category} onChange={e => upd('category', e.target.value)} className={inp}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Note <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input type="text" value={form.note} onChange={e => upd('note', e.target.value)}
              placeholder="Any context..." className={inp} />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-surface-600/60
                         text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 text-sm rounded-xl font-medium text-white transition-colors"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
              {editing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
