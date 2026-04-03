import { Menu, Moon, Sun, ShieldCheck, Eye } from 'lucide-react'
import useStore from '../store/useStore'

const PAGE_LABELS = {
  dashboard:    'Overview',
  transactions: 'Transactions',
  insights:     'Insights',
}

export default function Navbar({ activePage, onMenuClick }) {
  const { role, setRole, darkMode, toggleDark } = useStore()

  return (
    <header className="h-14 bg-white dark:bg-surface-800 border-b border-slate-100 dark:border-surface-600/50
                       px-4 flex items-center justify-between shrink-0 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg
                     hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <Menu size={19} />
        </button>
        <div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-none">
            {PAGE_LABELS[activePage]}
          </h2>
          <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button onClick={toggleDark}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400
                     hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title="Toggle theme">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* role switcher - visual badge style */}
        <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-slate-100 dark:border-surface-600/50">
          <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all
            ${role === 'admin'
              ? 'bg-brand-100 dark:bg-brand-700/20 text-brand-700 dark:text-brand-400'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
            onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
            title="Click to switch role"
          >
            {role === 'admin'
              ? <ShieldCheck size={13} />
              : <Eye size={13} />
            }
            <span className="text-xs font-medium capitalize">{role}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
