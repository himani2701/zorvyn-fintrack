import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockData'

const useStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'admin',
      darkMode: false,
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
      },

      setRole: (role) => set({ role }),

      toggleDark: () => {
        const next = !get().darkMode
        set({ darkMode: next })
        document.documentElement.classList.toggle('dark', next)
      },

      setFilter: (key, value) => set(s => ({ filters: { ...s.filters, [key]: value } })),

      addTransaction: (txn) => set(s => ({
        transactions: [{ ...txn, id: Date.now() }, ...s.transactions],
      })),

      updateTransaction: (id, updates) => set(s => ({
        transactions: s.transactions.map(t => t.id === id ? { ...t, ...updates } : t),
      })),

      deleteTransaction: (id) => set(s => ({
        transactions: s.transactions.filter(t => t.id !== id),
      })),

      // export filtered or all transactions to CSV
      exportCSV: (subset) => {
        const rows = subset || get().transactions
        const header = 'Date,Merchant,Category,Type,Amount,Note'
        const lines = rows.map(t =>
          [t.date, `"${t.merchant}"`, t.category, t.type, t.amount, `"${t.note || ''}"`].join(',')
        )
        const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `fintrack-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
      },
    }),
    {
      name: 'fintrack-v2',
      partialize: s => ({ transactions: s.transactions, role: s.role, darkMode: s.darkMode }),
    }
  )
)

export default useStore
