import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import useStore from './store/useStore'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { darkMode } = useStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const PageContent = {
    dashboard:    <Dashboard />,
    transactions: <Transactions />,
    insights:     <Insights />,
  }[page]

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-surface-900">
      <Sidebar
        activePage={page}
        setActivePage={(p) => { setPage(p); setSidebarOpen(false) }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden"
             onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar activePage={page} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {PageContent}
        </main>
      </div>
    </div>
  )
}
