import { Link } from 'react-router-dom'
import { formatINR } from '../utils/format'

export default function ProjectCard({
  project,
  spent,
  pendingCount,
  showSpend = true,
}) {
  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card-top">
        <div>
          <h2>{project.name}</h2>
          <p className="loc">{project.location}</p>
        </div>
        {pendingCount > 0 && (
          <span className="badge badge-count">{pendingCount} pending</span>
        )}
      </div>
      <div className="project-card-meta">
        {showSpend ? (
          <span className="spent">Spent {formatINR(spent)}</span>
        ) : (
          <span className="spent">Tap to add request</span>
        )}
        <span style={{ color: 'var(--ink-muted)' }}>View →</span>
      </div>
    </Link>
  )
}
