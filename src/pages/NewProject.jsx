import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { formatINR } from '../utils/format'

export default function NewProject() {
  const navigate = useNavigate()
  const { addProject } = useData()
  const [form, setForm] = useState({
    name: '',
    plannedBudget: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const project = addProject({
      name: form.name,
      plannedBudget: form.plannedBudget,
    })
    navigate(`/projects/${project.id}`)
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← All projects
      </Link>

      <div className="page-head">
        <p className="page-kicker">Projects</p>
        <h1>Add project</h1>
        <p>Create a new ongoing site for MA Associates</p>
      </div>

      <div className="panel">
        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="proj-name">Project name</label>
            <input
              id="proj-name"
              type="text"
              placeholder="e.g. Dabaspet - VRL"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="proj-budget">Planned budget (₹)</label>
            <input
              id="proj-budget"
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="e.g. 2500000"
              value={form.plannedBudget}
              onChange={(e) =>
                setForm((f) => ({ ...f, plannedBudget: e.target.value }))
              }
            />
            {form.plannedBudget && (
              <span className="field-hint">{formatINR(form.plannedBudget)}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Create project
          </button>
        </form>
      </div>
    </div>
  )
}
