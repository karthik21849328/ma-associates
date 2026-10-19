import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

export default function RequireAuth() {
  const { isLoggedIn } = useRole()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
