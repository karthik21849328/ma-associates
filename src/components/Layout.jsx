import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

export default function Layout() {
  const { role, isEngineer, logout } = useRole()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark" aria-hidden="true">
            MA
          </div>
          <div className="eyebrow">Civil construction</div>
          <h1>MA Associates</h1>
          <p className="loc">Hubli · Nongagur</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Dashboard
          </NavLink>
          {isEngineer && (
            <NavLink
              to="/employees"
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Employees
            </NavLink>
          )}
        </nav>
        <button type="button" className="sidebar-logout" onClick={onLogout}>
          Log out
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-brand">
            <strong>MA Associates</strong>
            <span>Hubli · Nongagur</span>
          </div>
          <div className="role-bar">
            <span className="role-chip">
              {role}
              <em>{isEngineer ? 'Full access' : 'Requests only'}</em>
            </span>
            <button type="button" className="btn btn-ghost btn-sm logout-btn" onClick={onLogout}>
              Log out
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <nav className="bottom-nav" aria-label="Mobile navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="icon">⌂</span>
            Home
          </NavLink>
          {isEngineer && (
            <NavLink
              to="/employees"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="icon">☰</span>
              Employees
            </NavLink>
          )}
          <button type="button" className="bottom-logout" onClick={onLogout}>
            <span className="icon">⎋</span>
            Log out
          </button>
        </nav>
      </div>
    </div>
  )
}
