import { createContext, useContext, useEffect, useState } from 'react'
import { ROLES } from '../data/mock'

const AUTH_KEY = 'ma-associates-auth-v1'

const CREDENTIALS = {
  '1234': ROLES.ASSISTANT,
  admin123: ROLES.ENGINEER,
}

const RoleContext = createContext(null)

function loadAuth() {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.role === ROLES.ENGINEER || parsed?.role === ROLES.ASSISTANT) {
      return parsed
    }
  } catch {
    /* ignore */
  }
  return null
}

export function RoleProvider({ children }) {
  const [auth, setAuth] = useState(loadAuth)

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth))
    } else {
      sessionStorage.removeItem(AUTH_KEY)
    }
  }, [auth])

  const login = (password) => {
    const role = CREDENTIALS[password]
    if (!role) {
      return { ok: false, error: 'Incorrect password' }
    }
    setAuth({ role, loggedInAt: Date.now() })
    return { ok: true, role }
  }

  const logout = () => setAuth(null)

  const role = auth?.role ?? null
  const isLoggedIn = Boolean(role)
  const isEngineer = role === ROLES.ENGINEER
  const isAssistant = role === ROLES.ASSISTANT

  return (
    <RoleContext.Provider
      value={{
        role,
        isLoggedIn,
        isEngineer,
        isAssistant,
        login,
        logout,
        ROLES,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
