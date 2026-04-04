# FinTrack — Finance Dashboard

A personal finance tracker built for a frontend assignment. Clean UI, dark/light themes, role-based access, and a bunch of charts to understand spending patterns.

## Stack

- **React 18 + Vite** — no CRA, nobody uses that anymore
- **Tailwind CSS** — with custom color tokens for the purple/indigo brand palette
- **Zustand** (with persist) — state + localStorage, way cleaner than Redux for this scale
- **Recharts** — all charts
- **date-fns** — date formatting
- **lucide-react** — icons

## Running it

```bash
npm install
npm run dev
# opens on http://localhost:5173
```

## What's inside

### Dashboard
- 4 summary cards (net balance, monthly income/expenses, savings rate) with gradient backgrounds
- 6-month balance area chart
- This month's spending donut with inline legend + percentages
- 7-day daily spending bar chart (quick glance at recent activity)
- Recent transactions list

### Transactions
- Full searchable + filterable + sortable table
- Filter by category, type (income/expense), sort by date or amount
- Click column headers to toggle sort
- Admin can add, edit, delete — Viewer sees read-only
- **Export CSV** — exports current filtered view

### Insights
- 4 stat cards: top category, biggest expense, MoM comparison, overall savings rate
- 6-month income vs expenses grouped bar chart
- All-time spending by category (horizontal bars)
- Top 6 merchants by total spend with progress bars
- Savings rate tip with color-coded feedback

### Role-Based UI
Click the badge in the top navbar to toggle between **Admin** and **Viewer**.

- Admin → full CRUD, export button visible
- Viewer → all data visible, no edit/delete controls

### Dark Mode
Toggle via the moon/sun icon in navbar. Saved to localStorage.

## Project layout

```
src/
  components/
    dashboard/     # SummaryCards, BalanceTrend, SpendingPie, WeeklyBars, RecentTransactions
    transactions/  # Filters, TransactionTable, TransactionModal
    insights/      # InsightCards, MonthlyComparison, CategoryBreakdown, TopMerchants
    Sidebar.jsx
    Navbar.jsx
  data/
    mockData.js    # ~68 transactions, relative dates so charts always have fresh data
  pages/
    Dashboard.jsx
    Transactions.jsx
    Insights.jsx
  store/
    useStore.js    # Zustand store — all state + CSV export logic lives here
```

## Assumptions

- All amounts in ₹ (INR)
- Merchants are real Indian apps/services (Swiggy, Zomato, Zepto, Cult.fit, BSNL, etc.)
- Roles are frontend-only simulation — no auth
- `fintrack-v2` is the localStorage key (changed from v1 to avoid stale data conflicts)

## If I had more time

- Date range picker for filtering
- Budget targets per category with a progress tracker
- Recurring transactions detection
- Proper chart animation on first render

---

React 18 · Vite · Tailwind · Zustand · Recharts
