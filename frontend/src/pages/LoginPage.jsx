import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/auth.service'

export default function LoginPage({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const { loginSuccess }        = useAuth()

  const handleLogin = async () => {
    setError('')
    try {
      const res = await login(username, password)
      loginSuccess(res.data.token, res.data.displayName)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  const s = styles
  return (
    <div style={s.card}>
      <h2 style={s.title}>Active Directory Login</h2>
      <p style={s.sub}>Sign in with your AD credentials</p>
      <input style={s.input} placeholder="Username (e.g. alice)"
        value={username} onChange={e => setUsername(e.target.value)} />
      <input style={s.input} type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key==='Enter' && handleLogin()} />
      <button style={s.btn} onClick={handleLogin}>Login</button>
      {error && <p style={s.err}>{error}</p>}
    </div>
  )
}

const styles = {
  card:  { maxWidth:'420px', margin:'40px auto', background:'#fff', borderRadius:'12px', padding:'32px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)' },
  title: { fontSize:'20px', fontWeight:'500', marginBottom:'4px' },
  sub:   { fontSize:'13px', color:'#888', marginBottom:'24px' },
  input: { display:'block', width:'100%', padding:'9px 12px', marginBottom:'12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box' },
  btn:   { display:'block', width:'100%', padding:'10px', background:'#0078d4', color:'#fff', border:'none', borderRadius:'8px', fontSize:'14px', fontWeight:'500', cursor:'pointer' },
  err:   { color:'#c0392b', fontSize:'13px', marginTop:'10px' }
}