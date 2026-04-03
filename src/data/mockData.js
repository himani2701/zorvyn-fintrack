// using relative dates so the dashboard always shows fresh data
// all amounts in INR

const ago = (days) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().split('T')[0]
}

export const CATEGORIES = [
  'Food & Dining',
  'Entertainment',
  'Shopping',
  'Transport',
  'Bills & Utilities',
  'Health',
  'Education',
  'Other',
]

export const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  'Entertainment': '#8b5cf6',
  'Shopping': '#ec4899',
  'Transport': '#06b6d4',
  'Bills & Utilities': '#84cc16',
  'Health': '#14b8a6',
  'Education': '#f59e0b',
  'Other': '#6b7280',
  'Salary': '#22c55e',
  'Freelance': '#10b981',
}

export const mockTransactions = [
  // --- current month ---
  { id: 1,  date: ago(2),  merchant: 'Swiggy',             category: 'Food & Dining',    amount: 420,   type: 'expense', note: 'dinner with roommates' },
  { id: 2,  date: ago(4),  merchant: 'Salary - Zorvyn',   category: 'Salary',           amount: 52000, type: 'income',  note: 'monthly salary' },
  { id: 3,  date: ago(7),  merchant: 'Amazon',              category: 'Shopping',         amount: 1899,  type: 'expense', note: 'mechanical keyboard' },
  { id: 4,  date: ago(9),  merchant: 'Ola',                 category: 'Transport',        amount: 180,   type: 'expense', note: '' },
  { id: 5,  date: ago(11), merchant: 'Zomato',              category: 'Food & Dining',    amount: 350,   type: 'expense', note: 'lunch' },
  { id: 6,  date: ago(14), merchant: 'Netflix',             category: 'Entertainment',    amount: 649,   type: 'expense', note: '' },
  { id: 7,  date: ago(16), merchant: 'BSNL Broadband',      category: 'Bills & Utilities',amount: 699,   type: 'expense', note: 'monthly internet' },
  { id: 8,  date: ago(18), merchant: 'Freelance - UI work', category: 'Freelance',        amount: 12000, type: 'income',  note: 'logo + landing page' },
  { id: 9,  date: ago(21), merchant: 'PharmEasy',           category: 'Health',           amount: 560,   type: 'expense', note: 'medicines' },
  { id: 10, date: ago(23), merchant: 'Uber',                category: 'Transport',        amount: 245,   type: 'expense', note: '' },
  { id: 11, date: ago(25), merchant: 'Electricity Bill',    category: 'Bills & Utilities',amount: 1100,  type: 'expense', note: 'MPEB bill' },
  { id: 12, date: ago(27), merchant: 'Spotify',             category: 'Entertainment',    amount: 119,   type: 'expense', note: '' },
  { id: 13, date: ago(29), merchant: 'Zepto',               category: 'Food & Dining',    amount: 680,   type: 'expense', note: 'grocery run' },

  // --- last month ---
  { id: 14, date: ago(32), merchant: 'BigBasket',           category: 'Food & Dining',    amount: 1240,  type: 'expense', note: 'monthly groceries' },
  { id: 15, date: ago(34), merchant: 'Salary - Zorvyn',   category: 'Salary',           amount: 52000, type: 'income',  note: 'monthly salary' },
  { id: 16, date: ago(36), merchant: 'Flipkart',            category: 'Shopping',         amount: 799,   type: 'expense', note: 'books' },
  { id: 17, date: ago(39), merchant: 'Zomato',              category: 'Food & Dining',    amount: 520,   type: 'expense', note: '' },
  { id: 18, date: ago(42), merchant: 'Amazon',              category: 'Shopping',         amount: 3400,  type: 'expense', note: 'gadget stuff' },
  { id: 19, date: ago(44), merchant: 'Netflix',             category: 'Entertainment',    amount: 649,   type: 'expense', note: '' },
  { id: 20, date: ago(47), merchant: 'Petrol - HPCL',       category: 'Transport',        amount: 800,   type: 'expense', note: 'full tank' },
  { id: 21, date: ago(49), merchant: 'Swiggy',              category: 'Food & Dining',    amount: 380,   type: 'expense', note: '' },
  { id: 22, date: ago(51), merchant: 'BSNL Broadband',      category: 'Bills & Utilities',amount: 699,   type: 'expense', note: '' },
  { id: 23, date: ago(54), merchant: 'Gym - Cult.fit',      category: 'Health',           amount: 1200,  type: 'expense', note: '3 month sub' },
  { id: 24, date: ago(56), merchant: 'Uber',                category: 'Transport',        amount: 320,   type: 'expense', note: '' },
  { id: 25, date: ago(59), merchant: 'Freelance - Web dev', category: 'Freelance',        amount: 8000,  type: 'income',  note: 'small client project' },
  { id: 26, date: ago(61), merchant: 'Electricity Bill',    category: 'Bills & Utilities',amount: 950,   type: 'expense', note: '' },

  // --- 2 months ago ---
  { id: 27, date: ago(65), merchant: 'Salary - Zorvyn',   category: 'Salary',           amount: 52000, type: 'income',  note: 'monthly salary' },
  { id: 28, date: ago(67), merchant: 'Amazon (Sale)',       category: 'Shopping',         amount: 5600,  type: 'expense', note: 'big billion day, got carried away' },
  { id: 29, date: ago(70), merchant: 'Swiggy',              category: 'Food & Dining',    amount: 290,   type: 'expense', note: '' },
  { id: 30, date: ago(72), merchant: 'Netflix',             category: 'Entertainment',    amount: 649,   type: 'expense', note: '' },
  { id: 31, date: ago(74), merchant: 'Udemy',               category: 'Education',        amount: 499,   type: 'expense', note: 'React course on sale lol' },
  { id: 32, date: ago(76), merchant: 'Zomato',              category: 'Food & Dining',    amount: 450,   type: 'expense', note: '' },
  { id: 33, date: ago(79), merchant: 'BSNL Broadband',      category: 'Bills & Utilities',amount: 699,   type: 'expense', note: '' },
  { id: 34, date: ago(82), merchant: 'Electricity Bill',    category: 'Bills & Utilities',amount: 780,   type: 'expense', note: '' },
  { id: 35, date: ago(85), merchant: 'Ola',                 category: 'Transport',        amount: 210,   type: 'expense', note: '' },
  { id: 36, date: ago(87), merchant: 'Spotify',             category: 'Entertainment',    amount: 119,   type: 'expense', note: '' },
  { id: 37, date: ago(89), merchant: 'BigBasket',           category: 'Food & Dining',    amount: 1100,  type: 'expense', note: '' },

  // --- 3 months ago ---
  { id: 38, date: ago(95),  merchant: 'Salary - Zorvyn',   category: 'Salary',           amount: 52000, type: 'income',  note: 'monthly salary' },
  { id: 39, date: ago(98),  merchant: 'Zomato',              category: 'Food & Dining',    amount: 380,   type: 'expense', note: '' },
  { id: 40, date: ago(100), merchant: 'Amazon',              category: 'Shopping',         amount: 2200,  type: 'expense', note: 'festival shopping' },
  { id: 41, date: ago(102), merchant: 'Freelance - Design',  category: 'Freelance',        amount: 15000, type: 'income',  note: 'brand identity project' },
  { id: 42, date: ago(105), merchant: 'Petrol - BPCL',       category: 'Transport',        amount: 750,   type: 'expense', note: '' },
  { id: 43, date: ago(107), merchant: 'Netflix',             category: 'Entertainment',    amount: 649,   type: 'expense', note: '' },
  { id: 44, date: ago(110), merchant: 'Swiggy',              category: 'Food & Dining',    amount: 310,   type: 'expense', note: '' },
  { id: 45, date: ago(112), merchant: 'BSNL Broadband',      category: 'Bills & Utilities',amount: 699,   type: 'expense', note: '' },
  { id: 46, date: ago(115), merchant: 'Electricity Bill',    category: 'Bills & Utilities',amount: 1050,  type: 'expense', note: '' },
  { id: 47, date: ago(117), merchant: 'Doctor Visit',        category: 'Health',           amount: 500,   type: 'expense', note: 'general checkup' },
  { id: 48, date: ago(119), merchant: 'Spotify',             category: 'Entertainment',    amount: 119,   type: 'expense', note: '' },
  { id: 49, date: ago(120), merchant: 'BigBasket',           category: 'Food & Dining',    amount: 980,   type: 'expense', note: '' },

  // --- 4 months ago ---
  { id: 50, date: ago(130), merchant: 'Salary - Zorvyn',   category: 'Salary',           amount: 52000, type: 'income',  note: 'monthly salary' },
  { id: 51, date: ago(132), merchant: 'Zomato',              category: 'Food & Dining',    amount: 440,   type: 'expense', note: '' },
  { id: 52, date: ago(135), merchant: 'BSNL Broadband',      category: 'Bills & Utilities',amount: 699,   type: 'expense', note: '' },
  { id: 53, date: ago(138), merchant: 'Electricity Bill',    category: 'Bills & Utilities',amount: 870,   type: 'expense', note: '' },
  { id: 54, date: ago(140), merchant: 'Netflix',             category: 'Entertainment',    amount: 649,   type: 'expense', note: '' },
  { id: 55, date: ago(143), merchant: 'Amazon',              category: 'Shopping',         amount: 1200,  type: 'expense', note: 'random stuff' },
  { id: 56, date: ago(146), merchant: 'Spotify',             category: 'Entertainment',    amount: 119,   type: 'expense', note: '' },
  { id: 57, date: ago(148), merchant: 'Swiggy',              category: 'Food & Dining',    amount: 360,   type: 'expense', note: '' },
  { id: 58, date: ago(150), merchant: 'BigBasket',           category: 'Food & Dining',    amount: 1050,  type: 'expense', note: '' },
  { id: 59, date: ago(152), merchant: 'Freelance - Content', category: 'Freelance',        amount: 6000,  type: 'income',  note: 'writing gig' },

  // --- 5 months ago ---
  { id: 60, date: ago(160), merchant: 'Salary - Zorvyn',   category: 'Salary',           amount: 52000, type: 'income',  note: 'monthly salary' },
  { id: 61, date: ago(163), merchant: 'Zomato',              category: 'Food & Dining',    amount: 490,   type: 'expense', note: '' },
  { id: 62, date: ago(165), merchant: 'BSNL Broadband',      category: 'Bills & Utilities',amount: 699,   type: 'expense', note: '' },
  { id: 63, date: ago(168), merchant: 'Electricity Bill',    category: 'Bills & Utilities',amount: 920,   type: 'expense', note: '' },
  { id: 64, date: ago(170), merchant: 'Netflix',             category: 'Entertainment',    amount: 649,   type: 'expense', note: '' },
  { id: 65, date: ago(172), merchant: 'Swiggy',              category: 'Food & Dining',    amount: 320,   type: 'expense', note: '' },
  { id: 66, date: ago(175), merchant: 'Spotify',             category: 'Entertainment',    amount: 119,   type: 'expense', note: '' },
  { id: 67, date: ago(178), merchant: 'Uber',                category: 'Transport',        amount: 260,   type: 'expense', note: '' },
  { id: 68, date: ago(180), merchant: 'BigBasket',           category: 'Food & Dining',    amount: 1150,  type: 'expense', note: '' },
]
