import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRole } from '../context/RoleContext'
import { formatCategory } from '../utils/category'
import { currentMonth, formatDate, formatINR, formatMonth } from '../utils/format'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const {
    projects,
    requests,
    payments,
    getProjectSpend,
    CATEGORIES,
    updatePlannedBudget,
  } = useData()
  const { isEngineer, isAssistant } = useRole()
  const [tab, setTab] = useState('pending')
  const [paymentMonth, setPaymentMonth] = useState(currentMonth())
  const [budgetDraft, setBudgetDraft] = useState('')
  const [editingBudget, setEditingBudget] = useState(false)

  const project = projects.find((p) => p.id === projectId)
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

  const { total, byCategory } = getProjectSpend(project.id)
  const plannedBudget = Number(project.plannedBudget) || 0
  const availableBudget = plannedBudget - total
  const projectRequests = requests.filter((r) => r.projectId === project.id)
  const pending = projectRequests.filter((r) => r.status === 'pending')
  const paidRequests = projectRequests.filter((r) => r.status === 'paid')
  const projectPayments = payments.filter((p) => p.projectId === project.id)
  const filteredPayments = projectPayments.filter((p) =>
    p.paidAt?.startsWith(paymentMonth),
  )
  const monthPaymentTotal = filteredPayments.reduce(
    (sum, p) => sum + Number(p.amount),
    0,
  )

  const startEditBudget = () => {
    setBudgetDraft(String(plannedBudget || ''))
    setEditingBudget(true)
  }

  const saveBudget = (e) => {
    e.preventDefault()
    updatePlannedBudget(project.id, budgetDraft)
    setEditingBudget(false)
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← All projects
      </Link>

      <div className="page-head">
        {project.location ? (
          <p className="page-kicker">{project.location}</p>
        ) : (
          <p className="page-kicker">Ongoing project</p>
        )}
        <h1>{project.name}</h1>
        <p>
          {isAssistant
            ? 'Submit payment requests for this site'
            : 'Track requests, payments, and category spend'}
        </p>
      </div>

      {isEngineer && (
        <>
          <div className="stat-row">
            <div className="stat-pill">
              <span className="label">Planned budget</span>
              <span className="value">{formatINR(plannedBudget)}</span>
            </div>
            <div className="stat-pill">
              <span className="label">Spent</span>
              <span className="value">{formatINR(total)}</span>
            </div>
            <div className="stat-pill">
              <span className="label">Available budget</span>
              <span className={`value${availableBudget < 0 ? ' value-warn' : ''}`}>
                {formatINR(availableBudget)}
              </span>
            </div>
            <div className="stat-pill">
              <span className="label">Pending</span>
              <span className="value">{pending.length}</span>
            </div>
          </div>

          <div className="panel">
            <h2>Planned budget</h2>
            {editingBudget ? (
              <form className="form" onSubmit={saveBudget}>
                <div className="field">
                  <label htmlFor="planned-budget">Amount (₹)</label>
                  <input
                    id="planned-budget"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={budgetDraft}
                    onChange={(e) => setBudgetDraft(e.target.value)}
                    required
                  />
                </div>
                <div className="actions-row">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setEditingBudget(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="budget-edit-row">
                <p>
                  Planned {formatINR(plannedBudget)} · Available{' '}
                  <strong className={availableBudget < 0 ? 'value-warn' : ''}>
                    {formatINR(availableBudget)}
                  </strong>{' '}
                  (planned − spent)
                </p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={startEditBudget}
                >
                  Edit planned
                </button>
              </div>
            )}
          </div>

          <div className="section-title">
            <h2>Spend by category</h2>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="category-cell">
                <div className="cat">{cat}</div>
                <div className="amt">{formatINR(byCategory[cat] || 0)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {isAssistant && (
        <div className="stat-row">
          <div className="stat-pill">
            <span className="label">Pending requests</span>
            <span className="value">{pending.length}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Paid requests</span>
            <span className="value">{paidRequests.length}</span>
          </div>
        </div>
      )}

      <div className="actions-row">
        {isAssistant && (
          <Link
            to={`/projects/${project.id}/request`}
            className="btn btn-primary"
          >
            New request
          </Link>
        )}
        {isEngineer && (
          <Link
            to={`/projects/${project.id}/pay`}
            className="btn btn-secondary"
          >
            Make payment
          </Link>
        )}
      </div>

      <div className="section">
        {isEngineer ? (
          <div className="tabs">
            <button
              type="button"
              className={tab === 'pending' ? 'active' : ''}
              onClick={() => setTab('pending')}
            >
              Pending ({pending.length})
            </button>
            <button
              type="button"
              className={tab === 'payments' ? 'active' : ''}
              onClick={() => setTab('payments')}
            >
              Payments ({filteredPayments.length})
            </button>
          </div>
        ) : (
          <div className="section-title">
            <h2>Your requests</h2>
          </div>
        )}

        {(isAssistant || tab === 'pending') && (
          <div className="list">
            {isAssistant && projectRequests.length === 0 && (
              <div className="empty">
                No requests yet. Tap New request to create one.
              </div>
            )}
            {isEngineer && pending.length === 0 && (
              <div className="empty">No pending requests for this project</div>
            )}
            {(isAssistant ? projectRequests : pending).map((r) => (
              <div key={r.id} className="list-item">
                <div className="list-item-top">
                  <div>
                    <h3>
                      {formatCategory(r.category, r.subCategory)}
                      {r.vendorName ? ` · ${r.vendorName}` : ''}
                    </h3>
                    <p className="meta">
                      {r.description}
                      <br />
                      Requested {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="amount">{formatINR(r.amount)}</div>
                    <span
                      className={`badge ${r.status === 'paid' ? 'badge-paid' : 'badge-pending'}`}
                    >
                      {r.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
                {isEngineer && r.status === 'pending' && (
                  <div className="list-item-actions">
                    <Link
                      to={`/projects/${project.id}/pay?requestId=${r.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Make payment
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {isEngineer && tab === 'payments' && (
          <>
            <div className="filter-bar panel">
              <div className="field">
                <label htmlFor="payment-month">Filter by month</label>
                <input
                  id="payment-month"
                  type="month"
                  value={paymentMonth}
                  onChange={(e) => setPaymentMonth(e.target.value)}
                />
              </div>
              <p className="filter-bar-note">
                {formatMonth(paymentMonth)} · {filteredPayments.length} payment
                {filteredPayments.length === 1 ? '' : 's'} ·{' '}
                <strong>{formatINR(monthPaymentTotal)}</strong>
              </p>
            </div>

            <div className="list">
              {filteredPayments.length === 0 && (
                <div className="empty">
                  No payments for {formatMonth(paymentMonth)}
                </div>
              )}
              {filteredPayments.map((p) => (
                <div key={p.id} className="list-item">
                  <div className="list-item-top">
                    <div>
                      <h3>
                        {p.payee} · {formatCategory(p.category, p.subCategory)}
                      </h3>
                      <p className="meta">
                        {p.paymentMode && (
                          <>
                            <span className="badge badge-mode">{p.paymentMode}</span>
                            <br />
                          </>
                        )}
                        {p.note || 'No note'}
                        <br />
                        Paid {formatDate(p.paidAt)} by {p.paidBy}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="amount">{formatINR(p.amount)}</div>
                      <span className="badge badge-paid">Paid</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
