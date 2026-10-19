export const CATEGORIES = [
  'Machinery',
  'Bar bending',
  'Centering',
  'Plumbing',
]

export const PAYMENT_MODES = ['Cash', 'UPI', 'Bank Transfer', 'Cheque']

export const ROLES = {
  ENGINEER: 'Engineer',
  ASSISTANT: 'Assistant Engineer',
}

export const initialProjects = [
  {
    id: 'p1',
    name: 'Nongagur Residential Complex',
    location: 'Nongagur, Hubli',
    status: 'ongoing',
  },
  {
    id: 'p2',
    name: 'Vidyanagar Commercial Block',
    location: 'Vidyanagar, Hubli',
    status: 'ongoing',
  },
  {
    id: 'p3',
    name: 'Gokul Road Apartments',
    location: 'Gokul Road, Hubli',
    status: 'ongoing',
  },
  {
    id: 'p4',
    name: 'Unkal Lake Villa Site',
    location: 'Unkal, Hubli',
    status: 'ongoing',
  },
  {
    id: 'p5',
    name: 'Deshpande Nagar Office Fit-out',
    location: 'Deshpande Nagar, Hubli',
    status: 'ongoing',
  },
  {
    id: 'p6',
    name: 'Navanagar Warehouse',
    location: 'Navanagar, Hubli',
    status: 'ongoing',
  },
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
    category: 'Machinery',
    amount: 30000,
    vendorName: 'HireTech Equipment',
    description: 'JCB hire for foundation excavation — 2 days',
    status: 'pending',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-15',
  },
  {
    id: 'r2',
    projectId: 'p1',
    category: 'Bar bending',
    amount: 18500,
    vendorName: 'SteelWorks Hubli',
    description: 'Labour payment for slab steel tying',
    status: 'pending',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-16',
  },
  {
    id: 'r3',
    projectId: 'p2',
    category: 'Centering',
    amount: 22000,
    vendorName: 'FormForce Contractors',
    description: 'Shuttering material & labor — floor 2',
    status: 'pending',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-17',
  },
  {
    id: 'r4',
    projectId: 'p3',
    category: 'Plumbing',
    amount: 12500,
    vendorName: 'AquaPipe Suppliers',
    description: 'CPVC fittings for toilets block A',
    status: 'paid',
    createdBy: 'Assistant Engineer',
    createdAt: '2026-10-10',
  },
]

export const initialPayments = [
  {
    id: 'pay1',
    requestId: 'r4',
    projectId: 'p3',
    category: 'Plumbing',
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
    category: 'Machinery',
    amount: 45000,
    payee: 'EarthMovers Hubli',
    paymentMode: 'Bank Transfer',
    note: 'Excavator hire — week 1',
    paidAt: '2026-10-05',
    paidBy: 'Engineer',
  },
  {
    id: 'pay3',
    requestId: null,
    projectId: 'p2',
    category: 'Bar bending',
    amount: 28000,
    payee: 'SteelWorks Hubli',
    paymentMode: 'Cash',
    note: 'Column steel labour',
    paidAt: '2026-10-08',
    paidBy: 'Engineer',
  },
  {
    id: 'pay4',
    requestId: null,
    projectId: 'p1',
    category: 'Centering',
    amount: 15000,
    payee: 'FormForce Contractors',
    paymentMode: 'Cheque',
    note: 'Ground floor shuttering',
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
