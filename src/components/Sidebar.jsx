import { LayoutDashboard, CreditCard, Lightbulb, X, TrendingUp } from 'lucide-react'

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: CreditCard },
  { id: 'insights',     label: 'Insights',     icon: Lightbulb },
]

function NavContent({ activePage, setActivePage, onClose }) {
  return (
    <>
      <div className="px-5 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* icon bg is a gradient too */}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
            <TrendingUp size={17} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-white tracking-tight leading-none">FinTrack</h1>
            <p className="text-[10px] text-slate-500 mt-0.5">Finance Dashboard</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 lg:hidden p-1">
            <X size={17} />
          </button>
        )}
      </div>

      <div className="px-3 mt-1">
        <p className="text-[10px] uppercase tracking-widest text-slate-600 px-3 mb-2">Menu</p>
        <nav className="space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${activePage === id
                  ? 'nav-active text-white shadow-lg shadow-purple-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* spacer */}
      <div className="flex-1" />

      <div className="px-5 py-4">
        <div className="rounded-xl bg-white/5 px-3 py-3">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Mock data · persisted to localStorage
          </p>
        </div>
      </div>
    </>
  )
}

export default function Sidebar({ activePage, setActivePage, isOpen, onClose }) {
  return (
    <>
      <aside className="hidden lg:flex lg:flex-col w-56 shrink-0 bg-surface-900">
        <NavContent activePage={activePage} setActivePage={setActivePage} />
      </aside>

      <aside className={`fixed inset-y-0 left-0 z-30 w-56 bg-surface-900 flex flex-col
        transform transition-transform duration-200 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent activePage={activePage} setActivePage={setActivePage} onClose={onClose} />
      </aside>
    </>
  )
}
