import ProjectCard from '../components/ProjectCard'
import StatPill from '../components/StatPill'
import { useData } from '../context/DataContext'
import { useRole } from '../context/RoleContext'
import { formatINR } from '../utils/format'

export default function Dashboard() {
  const { projects, payments, requests, getProjectSpend, getPendingCount } = useData()
  const { role, isEngineer, isAssistant } = useRole()

  const ongoing = projects.filter((p) => p.status === 'ongoing')
  const totalSpent = payments.reduce((sum, p) => sum + Number(p.amount), 0)
  const pendingAll = requests.filter((r) => r.status === 'pending').length

  return (
    <div>
      <div className="page-head">
        <p className="page-kicker">MA Associates · Hubli</p>
        <h1>Site dashboard</h1>
        <p>
          {isAssistant
            ? 'Create payment requests for your sites'
            : 'Full project & payment control'}
          {' · '}
          {role}
        </p>
      </div>

      <div className="hero-band hero-band-home">
        <div className="hero-band-copy">
          <h2>{ongoing.length} active sites</h2>
          <p>
            {isEngineer && (
              <>
                {formatINR(totalSpent)} spent across projects
                {pendingAll > 0 ? ` · ${pendingAll} requests waiting` : ''}
              </>
            )}
            {isAssistant && (
              <>
                {pendingAll > 0
                  ? `${pendingAll} request${pendingAll === 1 ? '' : 's'} awaiting engineer payment`
                  : 'Open a project to submit a new payment request'}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="stat-row">
        <StatPill label="Ongoing" value={ongoing.length} />
        {isEngineer && (
          <StatPill label="Total spent" value={formatINR(totalSpent)} />
        )}
        <StatPill label="Pending" value={pendingAll} />
      </div>

      <div className="section-title">
        <h2>Projects</h2>
      </div>

      <div className="project-list">
        {ongoing.map((project, i) => {
          const { total } = getProjectSpend(project.id)
          return (
            <div
              key={project.id}
              className="project-card-wrap"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <ProjectCard
                project={project}
                spent={isEngineer ? total : null}
                pendingCount={getPendingCount(project.id)}
                showSpend={isEngineer}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
