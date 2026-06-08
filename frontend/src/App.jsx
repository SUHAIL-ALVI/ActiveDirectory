import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  const [page, setPage] = useState('login')

  return (
    <AuthProvider>
      <Navbar page={page} setPage={setPage} />
      {(page==='login' || page==='dashboard') && page==='login' &&
        <LoginPage onSuccess={() => setPage('dashboard')} />}
      {page==='dashboard' && <DashboardPage />}
      {page==='admin'     && <AdminPage />}
    </AuthProvider>
  )
}