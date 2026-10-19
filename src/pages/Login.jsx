import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

export default function Login() {
  const { isLoggedIn, login } = useRole()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(password.trim())
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark" aria-hidden="true">
            MA
          </div>
          <p className="page-kicker">Civil construction</p>
          <h1>MA Associates</h1>
          <p className="login-sub">Hubli · Nongagur — sign in to continue</p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="login-pass">Password</label>
            <input
              id="login-pass"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </form>

        <div className="login-hint">
          <p>
            <strong>Assistant Engineer</strong> — <code>1234</code>
          </p>
          <p>
            <strong>Engineer</strong> — <code>admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
