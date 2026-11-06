import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { currentMonth } from '../utils/format'

export default function Employees() {
  const { employees, addSalary, addExpense } = useData()

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

  useEffect(() => {
    if (!employees.length) return
    setSalaryForm((f) =>
      employees.some((e) => e.id === f.employeeId)
        ? f
        : { ...f, employeeId: employees[0].id },
    )
    setExpenseForm((f) =>
      employees.some((e) => e.id === f.employeeId)
        ? f
        : { ...f, employeeId: employees[0].id },
    )
  }, [employees])

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

      <div className="actions-row">
        <Link to="/employees/new" className="btn btn-secondary">
          Add employee
        </Link>
        <Link to="/employees/history" className="btn btn-ghost">
          View history
        </Link>
      </div>

      {employees.length === 0 ? (
        <div className="empty">
          No employees yet. Add an employee to start salary and expense entries.
        </div>
      ) : (
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
      )}
    </div>
  )
}
