import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  CATEGORIES,
  MASONRY_SUBCATEGORIES,
  PAYMENT_MODES,
  initialEmployees,
  initialExpenses,
  initialPayments,
  initialProjects,
  initialRequests,
  initialSalaries,
} from '../data/mock'
import { todayISO, uid } from '../utils/format'

const STORAGE_KEY = 'ma-associates-data-v6'

const DataContext = createContext(null)

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return {
    projects: initialProjects,
    employees: initialEmployees,
    requests: initialRequests,
    payments: initialPayments,
    salaries: initialSalaries,
    expenses: initialExpenses,
  }
}

export function DataProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addRequest = (payload) => {
    const request = {
      id: uid('r'),
      status: 'pending',
      createdBy: 'Assistant Engineer',
      createdAt: todayISO(),
      vendorName: payload.vendorName || '',
      ...payload,
    }
    setState((s) => ({ ...s, requests: [request, ...s.requests] }))
    return request
  }

  const makePayment = (payload) => {
    const payment = {
      id: uid('pay'),
      paidBy: 'Engineer',
      paidAt: payload.paidAt || todayISO(),
      requestId: payload.requestId || null,
      ...payload,
    }
    setState((s) => {
      const requests = payload.requestId
        ? s.requests.map((r) =>
            r.id === payload.requestId ? { ...r, status: 'paid' } : r,
          )
        : s.requests
      return { ...s, payments: [payment, ...s.payments], requests }
    })
    return payment
  }

  const addSalary = (payload) => {
    const entry = {
      id: uid('s'),
      paidAt: todayISO(),
      ...payload,
    }
    setState((s) => ({ ...s, salaries: [entry, ...s.salaries] }))
    return entry
  }

  const addExpense = (payload) => {
    const entry = {
      id: uid('x'),
      date: payload.date || todayISO(),
      ...payload,
    }
    setState((s) => ({ ...s, expenses: [entry, ...s.expenses] }))
    return entry
  }

  const updatePlannedBudget = (projectId, plannedBudget) => {
    setState((s) => ({
      ...s,
      projects: s.projects.map((p) =>
        p.id === projectId
          ? { ...p, plannedBudget: Number(plannedBudget) || 0 }
          : p,
      ),
    }))
  }

  const addProject = (payload) => {
    const project = {
      id: uid('p'),
      name: payload.name.trim(),
      location: (payload.location || '').trim(),
      status: 'ongoing',
      plannedBudget: Number(payload.plannedBudget) || 0,
    }
    setState((s) => ({ ...s, projects: [project, ...s.projects] }))
    return project
  }

  const addEmployee = (payload) => {
    const employee = {
      id: uid('e'),
      name: payload.name.trim(),
      role: (payload.role || '').trim() || 'Staff',
      phone: (payload.phone || '').trim(),
    }
    setState((s) => ({ ...s, employees: [employee, ...s.employees] }))
    return employee
  }

  const getProjectSpend = (projectId) => {
    const byCategory = Object.fromEntries(CATEGORIES.map((c) => [c, 0]))
    let total = 0
    for (const p of state.payments) {
      if (p.projectId !== projectId) continue
      byCategory[p.category] = (byCategory[p.category] || 0) + Number(p.amount)
      total += Number(p.amount)
    }
    return { total, byCategory }
  }

  const getPendingCount = (projectId) =>
    state.requests.filter(
      (r) => r.projectId === projectId && r.status === 'pending',
    ).length

  const employeeName = (id) =>
    state.employees.find((e) => e.id === id)?.name || '—'

  const value = useMemo(
    () => ({
      ...state,
      CATEGORIES,
      MASONRY_SUBCATEGORIES,
      PAYMENT_MODES,
      addRequest,
      makePayment,
      addSalary,
      addExpense,
      updatePlannedBudget,
      addProject,
      addEmployee,
      getProjectSpend,
      getPendingCount,
      employeeName,
    }),
    [state],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
