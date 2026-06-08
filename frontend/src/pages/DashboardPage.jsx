import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getDashboard } from '../services/auth.service'
import ProtectedRoute from '../components/ProtectedRoute'

export default function DashboardPage() {
  const { token, user } = useAuth()
  const [msg, setMsg]   = useState('')

  const testRoute = async () => {
    const res = await getDashboard(token)
    setMsg(res.data.message)
  }

  return (
    <ProtectedRoute>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user?.displayName}!</h2>
        <p style={styles.sub}>Authenticated via Active Directory</p>
        <button style={styles.btn} onClick={testRoute}>Test Protected Route</button>
        {msg && <p style={styles.ok}>{msg}</p>}
      </div>
    </ProtectedRoute>
  )
}

const styles = {
  card:  { maxWidth:'420px', margin:'40px auto', background:'#fff', borderRadius:'12px', padding:'32px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)' },
  title: { fontSize:'20px', fontWeight:'500', marginBottom:'4px' },
  sub:   { fontSize:'13px', color:'#888', marginBottom:'24px' },
  btn:   { display:'block', width:'100%', padding:'10px', background:'#0078d4', color:'#fff', border:'none', borderRadius:'8px', fontSize:'14px', fontWeight:'500', cursor:'pointer' },
  ok:    { color:'#27ae60', fontSize:'13px', marginTop:'12px' }
}