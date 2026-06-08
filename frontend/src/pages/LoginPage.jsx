import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/auth.service'

export default function LoginPage({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { loginSuccess } = useAuth()

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await login(username, password)
      loginSuccess(res.data.token, res.data.displayName)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const s = styles

  return (
    <div style={s.page}>
      <div style={s.card}>
        
        {/* Logo */}
        <div style={s.logoWrap}>
          <div style={s.logo}>AD</div>
        </div>

        <h2 style={s.title}>Log In</h2>
        <p style={s.sub}>
          Sign in with your Active Directory account
        </p>

        {/* Inputs */}
        <input
          style={s.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />

        <input
          style={s.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />

        {/* Button */}
        <button
          style={{
            ...s.btn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
          onClick={handleLogin}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
          }}
        >
          {loading ? 'Signing in...' : 'Continue'}
        </button>

        {/* Error */}
        {error && <div style={s.errorBox}>{error}</div>}
      </div>
    </div>
  )
}

/* Focus handlers */
const focusStyle = (e) => {
  e.target.style.border = '1px solid rgba(0,122,255,0.4)'
  e.target.style.boxShadow = '0 0 0 4px rgba(0,122,255,0.10)'
}

const blurStyle = (e) => {
  e.target.style.border = '1px solid rgba(255,255,255,0.7)'
  e.target.style.boxShadow = 'none'
}

/* Apple Glass Styles */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',

    background: `
      radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 40%),
      radial-gradient(circle at bottom right, rgba(0,122,255,0.15), transparent 45%),
      linear-gradient(180deg, #f5f5f7 0%, #e9eef5 100%)
    `,

    overflow: 'hidden'
  },

  card: {
    width: '100%',
    maxWidth: '440px',

    padding: '42px',

    background: 'rgba(255,255,255,0.55)',

    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',

    borderRadius: '32px',

    border: '1px solid rgba(255,255,255,0.7)',

    boxShadow: `
      0 20px 60px rgba(0,0,0,0.08),
      inset 0 1px 1px rgba(255,255,255,0.7)
    `,

    animation: 'fadeIn 0.5s ease'
  },

  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '22px'
  },

  logo: {
    width: '78px',
    height: '78px',
    borderRadius: '26px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '28px',
    fontWeight: '600',

    color: '#1d1d1f',

    background: 'rgba(255,255,255,0.5)',

    backdropFilter: 'blur(20px)',

    border: '1px solid rgba(255,255,255,0.8)',

    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.9)'
  },

  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '6px',
    letterSpacing: '-0.5px'
  },

  sub: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6e6e73',
    marginBottom: '30px'
  },

  input: {
    width: '100%',
    padding: '16px 18px',
    marginBottom: '14px',

    background: 'rgba(255,255,255,0.45)',

    backdropFilter: 'blur(15px)',

    border: '1px solid rgba(255,255,255,0.7)',

    borderRadius: '18px',

    fontSize: '15px',

    outline: 'none',

    transition: 'all 0.25s ease',

    boxSizing: 'border-box',

    color: '#1d1d1f'
  },

  btn: {
    width: '100%',
    padding: '16px',

    borderRadius: '18px',

    border: '1px solid rgba(255,255,255,0.8)',

    background: `
      linear-gradient(
        180deg,
        rgba(255,255,255,0.9),
        rgba(255,255,255,0.55)
      )
    `,

    backdropFilter: 'blur(20px)',

    fontSize: '15px',
    fontWeight: '600',

    color: '#1d1d1f',

    transition: 'all 0.25s ease',

    boxShadow: `
      0 10px 25px rgba(0,0,0,0.06),
      inset 0 1px 0 rgba(255,255,255,0.9)
    `
  },

  errorBox: {
    marginTop: '16px',
    padding: '12px',

    borderRadius: '16px',

    background: 'rgba(255,59,48,0.08)',

    border: '1px solid rgba(255,59,48,0.15)',

    color: '#d70015',

    fontSize: '13px',

    textAlign: 'center',

    backdropFilter: 'blur(10px)'
  }
}