import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import { clearAdminToken } from './services/admin.service'

export default function App() {
  const [page, setPage]         = useState('login')
  const [adminName, setAdminName] = useState('')

  const handleAdminLoginSuccess = (name) => {
    setAdminName(name)
    setPage('adminDashboard')
  }

  const handleAdminLogout = () => {
    clearAdminToken()
    setAdminName('')
    setPage('login')
  }

  // Admin portal — completely separate, no Navbar
  if (page === 'adminLogin') {
    return <AdminLoginPage onSuccess={handleAdminLoginSuccess} />
  }

  if (page === 'adminDashboard') {
    return <AdminDashboardPage adminName={adminName} onLogout={handleAdminLogout} />
  }

  // Regular user portal
  return (
    <AuthProvider>
      <Navbar page={page} setPage={setPage} onAdminClick={() => setPage('adminLogin')} />
      {page === 'login'     && <LoginPage onSuccess={() => setPage('dashboard')} />}
      {page === 'dashboard' && <DashboardPage />}
    </AuthProvider>
  )
}