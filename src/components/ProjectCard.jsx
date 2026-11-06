import { Link } from 'react-router-dom'
import { formatINR } from '../utils/format'

export default function ProjectCard({
  project,
  spent,
  pendingCount,
  showSpend = true,
}) {
  const planned = Number(project.plannedBudget) || 0
  const available = planned - (Number(spent) || 0)

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card-top">
        <div>
          <h2>{project.name}</h2>
          {project.location ? <p className="loc">{project.location}</p> : null}
        </div>
        {pendingCount > 0 && (
          <span className="badge badge-count">{pendingCount} pending</span>
        )}
      </div>
      {showSpend ? (
        <div className="project-budget-row">
          <div>
            <span className="label">Planned</span>
            <span className="value">{formatINR(planned)}</span>
          </div>
          <div>
            <span className="label">Spent</span>
            <span className="value">{formatINR(spent)}</span>
          </div>
          <div>
            <span className="label">Available</span>
            <span className={`value${available < 0 ? ' value-warn' : ''}`}>
              {formatINR(available)}
            </span>
          </div>
        </div>
      ) : (
        <div className="project-card-meta">
          <span className="spent">Tap to add request</span>
          <span style={{ color: 'var(--ink-muted)' }}>View →</span>
        </div>
      )}
    </Link>
  )
}
