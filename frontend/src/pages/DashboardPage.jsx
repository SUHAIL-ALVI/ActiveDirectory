import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getDashboard } from '../services/auth.service'
import ProtectedRoute from '../components/ProtectedRoute'

export default function DashboardPage() {
  const { token, user } = useAuth()
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const testRoute = async () => {
    try {
      setLoading(true)
      const res = await getDashboard(token)
      setMsg(res.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div style={styles.page}>
        <div style={styles.glassLayer}>
          <div style={styles.card}>

            {/* top light sheen */}
            <div style={styles.sheen} />

            {/* Header */}
            <div style={styles.header}>
              <div style={styles.avatar}>
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div>
                <h2 style={styles.title}>
                  Welcome, {user?.displayName}
                </h2>
                <p style={styles.sub}>
                  Secure Active Directory session
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              style={{
                ...styles.btn,
                opacity: loading ? 0.7 : 1,
                transform: loading ? 'scale(0.98)' : 'scale(1)'
              }}
              onClick={testRoute}
              disabled={loading}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  'translateY(-2px) scale(1.02)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  'translateY(0) scale(1)')
              }
            >
              {loading ? 'Checking secure session...' : 'Test Protected Route'}
            </button>

            {/* Response */}
            {msg && (
              <div style={styles.success}>
                <span style={styles.dot} />
                {msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

/* styles */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: `
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9), transparent 35%),
      radial-gradient(circle at 80% 80%, rgba(0,122,255,0.18), transparent 40%),
      radial-gradient(circle at 50% 100%, rgba(255,255,255,0.6), transparent 45%),
      linear-gradient(180deg, #f5f5f7 0%, #e9eef5 100%)
    `,

    overflow: 'hidden',
    padding: '24px'
  },

  glassLayer: {
    padding: '10px',

    background: 'rgba(255,255,255,0.25)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',

    borderRadius: '40px',

    border: '1px solid rgba(255,255,255,0.35)',

    boxShadow: `
      0 30px 80px rgba(0,0,0,0.08),
      inset 0 1px 1px rgba(255,255,255,0.6)
    `
  },

  card: {
    width: '100%',
    maxWidth: '460px',

    padding: '36px',

    position: 'relative',

    background: 'rgba(255,255,255,0.35)',

    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',

    borderRadius: '34px',

    border: '1px solid rgba(255,255,255,0.5)',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.8),
      0 10px 40px rgba(0,0,0,0.06)
    `,

    overflow: 'hidden'
  },

  sheen: {
    position: 'absolute',
    top: '-40%',
    left: '-30%',

    width: '160%',
    height: '160%',

    background:
      'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.35), transparent 60%)',

    transform: 'rotate(10deg)',
    pointerEvents: 'none'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '26px',
    position: 'relative',
    zIndex: 2
  },

  avatar: {
    width: '54px',
    height: '54px',

    borderRadius: '20px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '18px',
    fontWeight: '600',

    color: '#1d1d1f',

    background: 'rgba(255,255,255,0.35)',

    backdropFilter: 'blur(25px)',

    border: '1px solid rgba(255,255,255,0.6)',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.9),
      0 8px 20px rgba(0,0,0,0.05)
    `
  },

  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1d1d1f',
    margin: 0
  },

  sub: {
    fontSize: '13px',
    color: '#6e6e73',
    marginTop: '4px'
  },

  btn: {
    width: '100%',
    padding: '16px',

    borderRadius: '20px',

    background: 'rgba(255,255,255,0.45)',

    backdropFilter: 'blur(25px)',

    border: '1px solid rgba(255,255,255,0.6)',

    fontSize: '14px',
    fontWeight: '600',

    color: '#1d1d1f',

    cursor: 'pointer',

    transition: 'all 0.25s ease',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.9),
      0 12px 30px rgba(0,0,0,0.06)
    `
  },

  success: {
    marginTop: '18px',
    padding: '12px 14px',

    borderRadius: '18px',

    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    background: 'rgba(52,199,89,0.08)',

    border: '1px solid rgba(52,199,89,0.2)',

    backdropFilter: 'blur(20px)',

    color: '#1f9d4a',

    fontSize: '13px'
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#34c759'
  }
}