import { Navigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

/** Restrict a route to one or more roles. */
export default function RequireRole({ roles, children, fallback = '/' }) {
  const { isLoggedIn, role } = useRole()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (!roles.includes(role)) {
    return <Navigate to={fallback} replace />
  }

  return children
}
