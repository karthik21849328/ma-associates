import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatPill from '../components/StatPill'
import { useData } from '../context/DataContext'
import { currentMonth, formatINR, formatMonth } from '../utils/format'

export default function EmployeeHistory() {
  const { employees, salaries, expenses } = useData()
  const [filterMonth, setFilterMonth] = useState(currentMonth())

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
    const otherExpense = expensesInMonth
      .filter((x) => x.employeeId === emp.id)
      .reduce((sum, x) => sum + Number(x.amount), 0)
    const total = salary + otherExpense
    return { emp, salary, otherExpense, total }
  })

  return (
    <div>
      <Link to="/employees" className="back-link">
        ← Employees
      </Link>

      <div className="page-head">
        <p className="page-kicker">Workforce</p>
        <h1>Employee history</h1>
        <p>Salary and expenses by month</p>
      </div>

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
          {employees.length === 0 && (
            <div className="empty">No employees yet</div>
          )}
          {employeeRows.map(({ emp, salary, otherExpense, total }) => (
            <div key={emp.id} className="list-item emp-month-row">
              <div className="list-item-top">
                <div>
                  <h3>{emp.name}</h3>
                  <p className="meta">{emp.role}</p>
                </div>
              </div>
              <div className="emp-month-stats emp-month-stats-3">
                <div>
                  <span className="label">Salary</span>
                  <span className="value">
                    {salary > 0 ? formatINR(salary) : '—'}
                  </span>
                </div>
                <div>
                  <span className="label">Other expense</span>
                  <span className="value">
                    {otherExpense > 0 ? formatINR(otherExpense) : '—'}
                  </span>
                </div>
                <div>
                  <span className="label">Total</span>
                  <span className="value">
                    {total > 0 ? formatINR(total) : '—'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
