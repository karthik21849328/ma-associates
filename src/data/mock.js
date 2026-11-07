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
  { id: 'p1', name: 'Dabaspet - VRL', location: '', status: 'ongoing', plannedBudget: 2500000 },
  { id: 'p2', name: 'Varur - VRL', location: '', status: 'ongoing', plannedBudget: 1800000 },
  { id: 'p3', name: 'Pune - VRL', location: '', status: 'ongoing', plannedBudget: 3200000 },
  { id: 'p4', name: 'Tharihal - Nidec', location: '', status: 'ongoing', plannedBudget: 2100000 },
  { id: 'p5', name: 'Malatesh sir home - Navanagar', location: '', status: 'ongoing', plannedBudget: 950000 },
  { id: 'p6', name: 'Deshpande Home - Navanagar', location: '', status: 'ongoing', plannedBudget: 1100000 },
  { id: 'p7', name: 'belur - Nidec', location: '', status: 'ongoing', plannedBudget: 1750000 },
  { id: 'p8', name: 'KenAgritech', location: '', status: 'ongoing', plannedBudget: 2800000 },
  { id: 'p9', name: 'Belguam- Megha Engineering', location: '', status: 'ongoing', plannedBudget: 4500000 },
]

export const initialEmployees = [
  { id: 'e1', name: 'Nagesh', role: 'Staff', phone: '' },
  { id: 'e2', name: 'Abdul Salam', role: 'Staff', phone: '' },
  { id: 'e3', name: 'Sahim', role: 'Staff', phone: '' },
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

export const initialSalaries = []

export const initialExpenses = []
