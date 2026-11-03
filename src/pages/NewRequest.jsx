import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CategoryFields from '../components/CategoryFields'
import { useData } from '../context/DataContext'
import { defaultSubCategory, isMasonry } from '../utils/category'
import { formatINR } from '../utils/format'

export default function NewRequest() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { projects, CATEGORIES, addRequest } = useData()

  const project = projects.find((p) => p.id === projectId)

  const [form, setForm] = useState({
    category: CATEGORIES[0],
    subCategory: '',
    amount: '',
    vendorName: '',
    description: '',
  })

  if (!project) {
    return (
      <div>
        <Link to="/" className="back-link">
          ← Back
        </Link>
        <div className="empty">Project not found</div>
      </div>
    )
  }

  const onCategoryChange = (category) => {
    setForm((f) => ({
      ...f,
      category,
      subCategory: defaultSubCategory(category),
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.amount) return
    if (isMasonry(form.category) && !form.subCategory) return
    addRequest({
      projectId: project.id,
      category: form.category,
      subCategory: isMasonry(form.category) ? form.subCategory : '',
      amount: Number(form.amount),
      vendorName: form.vendorName.trim(),
      description: form.description.trim(),
    })
    navigate(`/projects/${project.id}`)
  }

  return (
    <div>
      <Link to={`/projects/${project.id}`} className="back-link">
        ← {project.name}
      </Link>

      <div className="page-head">
        <p className="page-kicker">Assistant engineer</p>
        <h1>New request</h1>
        <p>Send a payment request to the engineer for this project</p>
      </div>

      <div className="panel">
        <div className="field" style={{ marginBottom: '0.9rem' }}>
          <label>Project</label>
          <div className="locked-field">{project.name}</div>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <CategoryFields
            idPrefix="req"
            categories={CATEGORIES}
            category={form.category}
            subCategory={form.subCategory}
            onCategoryChange={onCategoryChange}
            onSubCategoryChange={(subCategory) =>
              setForm((f) => ({ ...f, subCategory }))
            }
          />

          <div className="field">
            <label htmlFor="req-amt">Amount (₹)</label>
            <input
              id="req-amt"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="e.g. 30000"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              required
            />
            {form.amount && (
              <span className="field-hint">{formatINR(form.amount)}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="req-vendor">Vendor / person (optional)</label>
            <input
              id="req-vendor"
              type="text"
              placeholder="Who should receive payment"
              value={form.vendorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, vendorName: e.target.value }))
              }
            />
          </div>

          <div className="field">
            <label htmlFor="req-desc">Description</label>
            <textarea
              id="req-desc"
              placeholder="e.g. Labour payment for site work"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit request
          </button>
        </form>
      </div>
    </div>
  )
}
