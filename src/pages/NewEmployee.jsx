import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function NewEmployee() {
  const navigate = useNavigate()
  const { addEmployee } = useData()
  const [form, setForm] = useState({
    name: '',
    role: '',
    phone: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    addEmployee(form)
    navigate('/employees')
  }

  return (
    <div>
      <Link to="/employees" className="back-link">
        ← Employees
      </Link>

      <div className="page-head">
        <p className="page-kicker">Workforce</p>
        <h1>Add employee</h1>
        <p>Add someone to the MA Associates payroll</p>
      </div>

      <div className="panel">
        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="emp-name">Full name</label>
            <input
              id="emp-name"
              type="text"
              placeholder="e.g. Ramesh Patil"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="emp-role">Role</label>
            <input
              id="emp-role"
              type="text"
              placeholder="e.g. Site Supervisor"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            />
          </div>

          <div className="field">
            <label htmlFor="emp-phone">Phone</label>
            <input
              id="emp-phone"
              type="tel"
              placeholder="e.g. 98765 43210"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Save employee
          </button>
        </form>
      </div>
    </div>
  )
}
