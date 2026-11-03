export const CATEGORIES = [
  'Bar-bending',
  'Masonry',
  'Plumbing',
  'Tiles',
  'Painting',
  'Civil materials',
  'Fabricator',
  'Concrete labours',
  'Aluminum / UPVC windows',
  'POP work',
  'Electrician',
  'Carpenter',
  'Site-expenses',
]

export const MASONRY_SUBCATEGORIES = [
  'Permanent labours',
  'Temporary labours',
]

export const PAYMENT_MODES = ['Cash', 'UPI', 'Bank Transfer', 'Cheque']

export const ROLES = {
  ENGINEER: 'Engineer',
  ASSISTANT: 'Assistant Engineer',
}

export const initialProjects = [
  { id: 'p1', name: 'Dabaspet - VRL', location: '', status: 'ongoing' },
  { id: 'p2', name: 'Varur - VRL', location: '', status: 'ongoing' },
  { id: 'p3', name: 'Pune - VRL', location: '', status: 'ongoing' },
  { id: 'p4', name: 'Tharihal - Nidec', location: '', status: 'ongoing' },
  { id: 'p5', name: 'Malatesh sir home - Navanagar', location: '', status: 'ongoing' },
  { id: 'p6', name: 'Deshpande Home - Navanagar', location: '', status: 'ongoing' },
  { id: 'p7', name: 'belur - Nidec', location: '', status: 'ongoing' },
  { id: 'p8', name: 'KenAgritech', location: '', status: 'ongoing' },
  { id: 'p9', name: 'Belguam- Megha Engineering', location: '', status: 'ongoing' },
]

export const initialEmployees = [
  { id: 'e1', name: 'Ramesh Patil', role: 'Site Supervisor', phone: '98765 43210' },
  { id: 'e2', name: 'Suresh Kulkarni', role: 'Mason Lead', phone: '98765 43211' },
  { id: 'e3', name: 'Anita Desai', role: 'Accounts', phone: '98765 43212' },
  { id: 'e4', name: 'Prakash Naik', role: 'Driver', phone: '98765 43213' },
  { id: 'e5', name: 'Vijay Hegde', role: 'Helper', phone: '98765 43214' },
]

export const initialRequests = [
  {
    id: 'r1',
    projectId: 'p1',
    category: 'Masonry',
    subCategory: 'Temporary labours',
    amount: 30000,
    vendorName: 'HireTech Labour',
    description: 'Temporary masonry labour — Dabaspet - VRL',
    status: 'pending',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-15',
  },
  {
    id: 'r2',
    projectId: 'p4',
    category: 'Bar-bending',
    subCategory: '',
    amount: 18500,
    vendorName: 'SteelWorks Hubli',
    description: 'Labour payment for slab steel tying — Tharihal - Nidec',
    status: 'pending',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-16',
  },
  {
    id: 'r3',
    projectId: 'p5',
    category: 'Masonry',
    subCategory: 'Permanent labours',
    amount: 22000,
    vendorName: 'Site Mason Team',
    description: 'Permanent masonry labour — Malatesh sir home - Navanagar',
    status: 'pending',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-17',
  },
  {
    id: 'r4',
    projectId: 'p6',
    category: 'Plumbing',
    subCategory: '',
    amount: 12500,
    vendorName: 'AquaPipe Suppliers',
    description: 'Plumbing works — Deshpande Home - Navanagar',
    status: 'paid',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-10',
  },
]

export const initialPayments = [
  {
    id: 'pay1',
    requestId: 'r4',
    projectId: 'p6',
    category: 'Plumbing',
    subCategory: '',
    amount: 12500,
    payee: 'AquaPipe Suppliers',
    paymentMode: 'UPI',
    note: 'Site materials',
    paidAt: '2026-10-11',
    paidBy: 'Engineer',
  },
  {
    id: 'pay2',
    requestId: null,
    projectId: 'p1',
    category: 'Civil materials',
    subCategory: '',
    amount: 45000,
    payee: 'BuildMart Hubli',
    paymentMode: 'Bank Transfer',
    note: 'Cement and aggregates — Dabaspet - VRL',
    paidAt: '2026-10-05',
    paidBy: 'Engineer',
  },
  {
    id: 'pay3',
    requestId: null,
    projectId: 'p2',
    category: 'Bar-bending',
    subCategory: '',
    amount: 28000,
    payee: 'SteelWorks Hubli',
    paymentMode: 'Cash',
    note: 'Column steel labour — Varur - VRL',
    paidAt: '2026-10-08',
    paidBy: 'Engineer',
  },
  {
    id: 'pay4',
    requestId: null,
    projectId: 'p9',
    category: 'Site-expenses',
    subCategory: '',
    amount: 15000,
    payee: 'Site petty cash',
    paymentMode: 'Cash',
    note: 'Site expenses — Belguam- Megha Engineering',
    paidAt: '2026-10-03',
    paidBy: 'Engineer',
  },
]

export const initialSalaries = [
  {
    id: 's1',
    employeeId: 'e1',
    month: '2026-09',
    amount: 28000,
    paidAt: '2026-09-30',
  },
  {
    id: 's2',
    employeeId: 'e2',
    month: '2026-09',
    amount: 22000,
    paidAt: '2026-09-30',
  },
]

export const initialExpenses = [
  {
    id: 'x1',
    employeeId: 'e4',
    type: 'Travel',
    amount: 1200,
    note: 'Site visit — Nongagur to Vidyanagar',
    date: '2026-10-12',
  },
  {
    id: 'x2',
    employeeId: 'e1',
    type: 'Expense',
    amount: 850,
    note: 'Site tea & misc materials',
    date: '2026-10-14',
  },
]
