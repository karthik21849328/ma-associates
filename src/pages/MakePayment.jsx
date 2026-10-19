import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { formatINR, todayISO } from '../utils/format'

export default function MakePayment() {
  const { projectId } = useParams()
  const [searchParams] = useSearchParams()
  const requestId = searchParams.get('requestId')
  const navigate = useNavigate()
  const { projects, requests, CATEGORIES, PAYMENT_MODES, makePayment } = useData()

  const project = projects.find((p) => p.id === projectId)
  const linkedRequest = useMemo(
    () => (requestId ? requests.find((r) => r.id === requestId) : null),
    [requestId, requests],
  )

  const [form, setForm] = useState({
    payee: '',
    amount: '',
    category: CATEGORIES[0],
    paymentMode: PAYMENT_MODES[0],
    note: '',
    paidAt: todayISO(),
  })

  useEffect(() => {
    if (!linkedRequest) return
    setForm((f) => ({
      ...f,
      payee: linkedRequest.vendorName || '',
      amount: String(linkedRequest.amount ?? ''),
      category: linkedRequest.category || CATEGORIES[0],
      note: linkedRequest.description || '',
      paidAt: todayISO(),
    }))
  }, [linkedRequest, CATEGORIES])

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

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.payee || !form.amount || !form.paymentMode) return
    makePayment({
      projectId: project.id,
      requestId: linkedRequest?.id || null,
      category: form.category,
      amount: Number(form.amount),
      payee: form.payee.trim(),
      paymentMode: form.paymentMode,
      note: form.note.trim(),
      paidAt: form.paidAt,
    })
    navigate(`/projects/${project.id}`)
  }

  return (
    <div>
      <Link to={`/projects/${project.id}`} className="back-link">
        ← {project.name}
      </Link>

      <div className="page-head">
        <p className="page-kicker">Record payment</p>
        <h1>Make payment</h1>
        <p>
          {linkedRequest
            ? 'Fulfilling a pending request — choose how you paid'
            : 'Record a vendor payment for this project'}
        </p>
      </div>

      {linkedRequest && (
        <div className="callout">
          <span className="callout-label">From request</span>
          <strong>
            {linkedRequest.category} · {formatINR(linkedRequest.amount)}
          </strong>
          <p>{linkedRequest.description}</p>
        </div>
      )}

      <div className="panel">
        <div className="field" style={{ marginBottom: '0.9rem' }}>
          <label>Project</label>
          <div className="locked-field">{project.name}</div>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="pay-payee">Payee / person</label>
            <input
              id="pay-payee"
              type="text"
              placeholder="Vendor or labour contractor name"
              value={form.payee}
              onChange={(e) => setForm((f) => ({ ...f, payee: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pay-cat">Category</label>
            <select
              id="pay-cat"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="pay-amt">Payment amount (₹)</label>
            <input
              id="pay-amt"
              type="number"
              min="1"
              inputMode="numeric"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              required
            />
            {form.amount && (
              <span className="field-hint">{formatINR(form.amount)}</span>
            )}
          </div>

          <div className="field">
            <label>Payment mode</label>
            <div className="mode-grid" role="group" aria-label="Payment mode">
              {PAYMENT_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`mode-chip${form.paymentMode === mode ? ' active' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, paymentMode: mode }))}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="pay-date">Payment date</label>
            <input
              id="pay-date"
              type="date"
              value={form.paidAt}
              onChange={(e) => setForm((f) => ({ ...f, paidAt: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pay-note">Note</label>
            <textarea
              id="pay-note"
              placeholder="Reference number, remarks…"
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Confirm payment
          </button>
        </form>
      </div>
    </div>
  )
}
