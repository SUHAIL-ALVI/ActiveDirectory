import { useState } from 'react'
import { adminLogin, setAdminToken } from '../services/admin.service'

export default function AdminLoginPage({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await adminLogin(username, password)
      setAdminToken(res.data.token)
      onSuccess(res.data.username)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.card}>
        <div style={styles.shine} />

        <div style={styles.iconWrap}>
          <div style={styles.iconGlass}>
            🛡️
          </div>
        </div>

        <h1 style={styles.title}>Admin Portal</h1>

        <p style={styles.sub}>
          Authenticate using administrator credentials
        </p>

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && handleLogin()
            }
          />

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.75 : 1
            }}
            disabled={loading}
            onClick={handleLogin}
          >
            {loading
              ? 'Authenticating...'
              : 'Access Admin Portal'}
          </button>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',

    background: `
      radial-gradient(circle at top left,
      rgba(255,255,255,.8), transparent 35%),

      radial-gradient(circle at bottom right,
      rgba(0,122,255,.12), transparent 45%),

      linear-gradient(
        180deg,
        #eef2f7 0%,
        #e3e9f1 100%
      )
    `
  },

  glow1: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    borderRadius: '50%',

    background:
      'rgba(0,122,255,.08)',

    filter: 'blur(90px)',

    top: '-80px',
    right: '-80px'
  },

  glow2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',

    background:
      'rgba(255,255,255,.45)',

    filter: 'blur(100px)',

    bottom: '-100px',
    left: '-100px'
  },

  card: {
    position: 'relative',

    width: '100%',
    maxWidth: '440px',

    padding: '42px',

    background:
      'rgba(255,255,255,.28)',

    backdropFilter:
      'blur(40px) saturate(180%)',

    WebkitBackdropFilter:
      'blur(40px) saturate(180%)',

    border:
      '1px solid rgba(255,255,255,.5)',

    borderRadius: '36px',

    overflow: 'hidden',

    boxShadow: `
      0 30px 80px rgba(0,0,0,.08),
      inset 0 1px 1px rgba(255,255,255,.9)
    `
  },

  shine: {
    position: 'absolute',
    top: '-120%',
    left: '-30%',

    width: '160%',
    height: '300%',

    background: `
      linear-gradient(
        120deg,
        transparent 45%,
        rgba(255,255,255,.18),
        transparent 55%
      )
    `
  },

  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '18px'
  },

  iconGlass: {
    width: '82px',
    height: '82px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '28px',

    fontSize: '36px',

    background:
      'rgba(255,255,255,.35)',

    backdropFilter: 'blur(30px)',

    border:
      '1px solid rgba(255,255,255,.55)',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,.9),
      0 12px 30px rgba(0,0,0,.05)
    `
  },

  title: {
    textAlign: 'center',
    margin: 0,

    fontSize: '28px',
    fontWeight: '600',

    color: '#1d1d1f'
  },

  sub: {
    textAlign: 'center',

    color: '#6e6e73',

    fontSize: '14px',

    marginTop: '8px',
    marginBottom: '28px'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },

  input: {
    padding: '15px 18px',

    borderRadius: '18px',

    border:
      '1px solid rgba(255,255,255,.55)',

    background:
      'rgba(255,255,255,.22)',

    backdropFilter: 'blur(20px)',

    fontSize: '14px',

    outline: 'none',

    transition: '.25s'
  },

  button: {
    padding: '15px',

    borderRadius: '18px',

    border:
      '1px solid rgba(255,255,255,.65)',

    background: `
      linear-gradient(
        180deg,
        rgba(255,255,255,.75),
        rgba(255,255,255,.35)
      )
    `,

    backdropFilter: 'blur(20px)',

    color: '#1d1d1f',

    fontSize: '14px',
    fontWeight: '600',

    cursor: 'pointer',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,.95),
      0 12px 30px rgba(0,0,0,.05)
    `
  },

  error: {
    marginTop: '6px',

    padding: '12px',

    textAlign: 'center',

    borderRadius: '16px',

    color: '#d70015',

    background:
      'rgba(255,59,48,.08)',

    border:
      '1px solid rgba(255,59,48,.15)',

    backdropFilter: 'blur(20px)',

    fontSize: '13px'
  }
}