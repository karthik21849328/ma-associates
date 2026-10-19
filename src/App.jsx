import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import RequireRole from './components/RequireRole'
import { DataProvider } from './context/DataContext'
import { RoleProvider } from './context/RoleContext'
import { ROLES } from './data/mock'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Login from './pages/Login'
import MakePayment from './pages/MakePayment'
import NewRequest from './pages/NewRequest'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <RoleProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route
                  path="employees"
                  element={
                    <RequireRole roles={[ROLES.ENGINEER]}>
                      <Employees />
                    </RequireRole>
                  }
                />
                <Route path="projects/:projectId" element={<ProjectDetail />} />
                <Route
                  path="projects/:projectId/request"
                  element={
                    <RequireRole roles={[ROLES.ASSISTANT]}>
                      <NewRequest />
                    </RequireRole>
                  }
                />
                <Route
                  path="projects/:projectId/pay"
                  element={
                    <RequireRole roles={[ROLES.ENGINEER]}>
                      <MakePayment />
                    </RequireRole>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </RoleProvider>
  )
}
