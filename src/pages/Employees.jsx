import { useState } from 'react'
import StatPill from '../components/StatPill'
import { useData } from '../context/DataContext'
import { currentMonth, formatINR, formatMonth } from '../utils/format'

export default function Employees() {
  const { employees, salaries, expenses, addSalary, addExpense } = useData()
  const [showHistory, setShowHistory] = useState(false)
  const [filterMonth, setFilterMonth] = useState(currentMonth())

  const [salaryForm, setSalaryForm] = useState({
    employeeId: employees[0]?.id || '',
    month: currentMonth(),
    amount: '',
  })

  const [expenseForm, setExpenseForm] = useState({
    employeeId: employees[0]?.id || '',
    type: 'Travel',
    amount: '',
    note: '',
  })

  const salariesInMonth = salaries.filter((s) => s.month === filterMonth)
  const salaryTotal = salariesInMonth.reduce((sum, s) => sum + Number(s.amount), 0)
  const paidEmployeeIds = new Set(salariesInMonth.map((s) => s.employeeId))

  const expensesInMonth = expenses.filter((x) => x.date?.startsWith(filterMonth))
  const travelTotal = expensesInMonth
    .filter((x) => x.type === 'Travel')
    .reduce((sum, x) => sum + Number(x.amount), 0)
  const expenseOnlyTotal = expensesInMonth
    .filter((x) => x.type === 'Expense')
    .reduce((sum, x) => sum + Number(x.amount), 0)
  const allExpenseTotal = travelTotal + expenseOnlyTotal

  const employeeRows = employees.map((emp) => {
    const salary = salariesInMonth
      .filter((s) => s.employeeId === emp.id)
      .reduce((sum, s) => sum + Number(s.amount), 0)
    const empExpenses = expensesInMonth.filter((x) => x.employeeId === emp.id)
    const expenseTotal = empExpenses.reduce((sum, x) => sum + Number(x.amount), 0)
    const travel = empExpenses
      .filter((x) => x.type === 'Travel')
      .reduce((sum, x) => sum + Number(x.amount), 0)
    const other = empExpenses
      .filter((x) => x.type === 'Expense')
      .reduce((sum, x) => sum + Number(x.amount), 0)
    return { emp, salary, expenseTotal, travel, other }
  })

  const onSalary = (e) => {
    e.preventDefault()
    if (!salaryForm.employeeId || !salaryForm.amount) return
    addSalary({
      employeeId: salaryForm.employeeId,
      month: salaryForm.month,
      amount: Number(salaryForm.amount),
    })
    setSalaryForm((f) => ({ ...f, amount: '' }))
  }

  const onExpense = (e) => {
    e.preventDefault()
    if (!expenseForm.employeeId || !expenseForm.amount) return
    addExpense({
      employeeId: expenseForm.employeeId,
      type: expenseForm.type,
      amount: Number(expenseForm.amount),
      note: expenseForm.note,
    })
    setExpenseForm((f) => ({ ...f, amount: '', note: '' }))
  }

  return (
    <div>
      <div className="page-head">
        <p className="page-kicker">Workforce</p>
        <h1>Employees</h1>
        <p>Add salary and travel / expense for the team</p>
      </div>

      <div className="hero-band">
        <div className="hero-band-copy">
          <h2>{employees.length} people on payroll</h2>
          <p>MA Associates Hubli</p>
        </div>
      </div>

      <div className="form-split">
        <div className="panel">
          <h2>Add salary</h2>
          <form className="form" onSubmit={onSalary}>
            <div className="field">
              <label htmlFor="sal-emp">Employee</label>
              <select
                id="sal-emp"
                value={salaryForm.employeeId}
                onChange={(e) =>
                  setSalaryForm((f) => ({ ...f, employeeId: e.target.value }))
                }
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="sal-month">Month</label>
              <input
                id="sal-month"
                type="month"
                value={salaryForm.month}
                onChange={(e) =>
                  setSalaryForm((f) => ({ ...f, month: e.target.value }))
                }
                required
              />
            </div>
            <div className="field">
              <label htmlFor="sal-amt">Amount (₹)</label>
              <input
                id="sal-amt"
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="e.g. 25000"
                value={salaryForm.amount}
                onChange={(e) =>
                  setSalaryForm((f) => ({ ...f, amount: e.target.value }))
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Save salary
            </button>
          </form>
        </div>

        <div className="panel">
          <h2>Travel & expense</h2>
          <form className="form" onSubmit={onExpense}>
            <div className="field">
              <label htmlFor="exp-emp">Employee</label>
              <select
                id="exp-emp"
                value={expenseForm.employeeId}
                onChange={(e) =>
                  setExpenseForm((f) => ({ ...f, employeeId: e.target.value }))
                }
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="exp-type">Type</label>
              <select
                id="exp-type"
                value={expenseForm.type}
                onChange={(e) =>
                  setExpenseForm((f) => ({ ...f, type: e.target.value }))
                }
              >
                <option value="Travel">Travel</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="exp-amt">Amount (₹)</label>
              <input
                id="exp-amt"
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="e.g. 1200"
                value={expenseForm.amount}
                onChange={(e) =>
                  setExpenseForm((f) => ({ ...f, amount: e.target.value }))
                }
                required
              />
            </div>
            <div className="field">
              <label htmlFor="exp-note">Note</label>
              <textarea
                id="exp-note"
                placeholder="Purpose of travel or expense"
                value={expenseForm.note}
                onChange={(e) =>
                  setExpenseForm((f) => ({ ...f, note: e.target.value }))
                }
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Save entry
            </button>
          </form>
        </div>
      </div>

      <div className="actions-row" style={{ marginTop: '0.5rem' }}>
        <button
          type="button"
          className="btn btn-ghost btn-block"
          onClick={() => setShowHistory((v) => !v)}
        >
          {showHistory ? 'Hide history' : 'View history by month'}
        </button>
      </div>

      {showHistory && (
        <>
          <div className="filter-bar panel">
            <div className="field">
              <label htmlFor="filter-month">Filter by month</label>
              <input
                id="filter-month"
                type="month"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              />
            </div>
            <p className="filter-bar-note">
              Showing salary and expenses for{' '}
              <strong>{formatMonth(filterMonth)}</strong>
            </p>
          </div>

          <div className="stat-row stat-row-grid">
            <StatPill label="Employees" value={employees.length} />
            <StatPill
              label="Salary paid"
              value={`${paidEmployeeIds.size}/${employees.length}`}
            />
            <StatPill label="Total salary" value={formatINR(salaryTotal)} />
            <StatPill label="Travel" value={formatINR(travelTotal)} />
            <StatPill label="Total expense" value={formatINR(allExpenseTotal)} />
          </div>

          <div className="section">
            <div className="section-title">
              <h2>By employee · {formatMonth(filterMonth)}</h2>
            </div>
            <div className="list">
              {employeeRows.map(({ emp, salary, expenseTotal, travel, other }) => (
                <div key={emp.id} className="list-item emp-month-row">
                  <div className="list-item-top">
                    <div>
                      <h3>{emp.name}</h3>
                      <p className="meta">{emp.role}</p>
                    </div>
                  </div>
                  <div className="emp-month-stats">
                    <div>
                      <span className="label">Salary</span>
                      <span className="value">
                        {salary > 0 ? formatINR(salary) : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="label">Total expense</span>
                      <span className="value">
                        {expenseTotal > 0 ? formatINR(expenseTotal) : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="label">Travel</span>
                      <span className="value">
                        {travel > 0 ? formatINR(travel) : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="label">Other</span>
                      <span className="value">
                        {other > 0 ? formatINR(other) : '—'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
