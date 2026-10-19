import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRole } from '../context/RoleContext'
import { formatDate, formatINR } from '../utils/format'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const { projects, requests, payments, getProjectSpend, CATEGORIES } = useData()
  const { isEngineer, isAssistant } = useRole()
  const [tab, setTab] = useState('pending')

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
  const projectRequests = requests.filter((r) => r.projectId === project.id)
  const pending = projectRequests.filter((r) => r.status === 'pending')
  const paidRequests = projectRequests.filter((r) => r.status === 'paid')
  const projectPayments = payments.filter((p) => p.projectId === project.id)

  return (
    <div>
      <Link to="/" className="back-link">
        ← All projects
      </Link>

      <div className="page-head">
        <p className="page-kicker">{project.location}</p>
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
              <span className="label">Total spent</span>
              <span className="value">{formatINR(total)}</span>
            </div>
            <div className="stat-pill">
              <span className="label">Pending</span>
              <span className="value">{pending.length}</span>
            </div>
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
              Payments ({projectPayments.length})
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
                      {r.category}
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
          <div className="list">
            {projectPayments.length === 0 && (
              <div className="empty">No payments recorded yet</div>
            )}
            {projectPayments.map((p) => (
              <div key={p.id} className="list-item">
                <div className="list-item-top">
                  <div>
                    <h3>
                      {p.payee} · {p.category}
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
        )}
      </div>
    </div>
  )
}
