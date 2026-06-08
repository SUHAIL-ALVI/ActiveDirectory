import { useState, useEffect } from 'react'
import UserRow from '../components/UserRow'
import {
  getWhitelist,
  addToWhitelist,
  removeFromWhitelist
} from '../services/admin.service'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await getWhitelist()
    setUsers(res.data)
  }

  const handleAdd = async () => {
    if (!email) return

    try {
      setLoading(true)
      await addToWhitelist(email)
      setMsg(`${email} added to whitelist`)
      setEmail('')
      fetchUsers()
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (email) => {
    await removeFromWhitelist(email)
    setMsg(`${email} removed`)
    fetchUsers()
  }

  return (
    <div style={styles.page}>
      <div style={styles.glassWrap}>
        <div style={styles.card}>

          {/* Light sheen */}
          <div style={styles.sheen} />

          {/* Header */}
          <div style={styles.header}>
            <h2 style={styles.title}>Whitelist Admin</h2>
            <p style={styles.sub}>
              Manage system access permissions
            </p>
          </div>

          {/* Input row */}
          <div style={styles.row}>
            <input
              style={styles.input}
              placeholder="alice@example.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />

            <button
              style={{
                ...styles.btn,
                opacity: loading ? 0.6 : 1
              }}
              disabled={loading}
              onClick={handleAdd}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  'translateY(-2px) scale(1.02)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  'translateY(0) scale(1)')
              }
            >
              Add
            </button>
          </div>

          {/* Message */}
          {msg && (
            <div style={styles.msg}>
              <span style={styles.dot} />
              {msg}
            </div>
          )}

          {/* List */}
          <div style={styles.list}>
            {users.length === 0 && (
              <div style={styles.empty}>No users in whitelist</div>
            )}

            {users.map((u) => (
              <UserRow
                key={u._id}
                user={u}
                onRemove={handleRemove}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

/* Focus effects */
const focusStyle = (e) => {
  e.target.style.border = '1px solid rgba(0,122,255,0.4)'
  e.target.style.boxShadow = '0 0 0 4px rgba(0,122,255,0.10)'
}

const blurStyle = (e) => {
  e.target.style.border = '1px solid rgba(255,255,255,0.6)'
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
      radial-gradient(circle at 20% 20%, rgba(0,122,255,0.12), transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.9), transparent 45%),
      linear-gradient(180deg, #f5f5f7 0%, #e9eef5 100%)
    `
  },

  glassWrap: {
    padding: '10px',
    borderRadius: '42px',

    background: 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',

    border: '1px solid rgba(255,255,255,0.35)',

    boxShadow: '0 30px 80px rgba(0,0,0,0.08)'
  },

  card: {
    width: '100%',
    maxWidth: '520px',

    padding: '34px',

    borderRadius: '36px',

    background: 'rgba(255,255,255,0.35)',

    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',

    border: '1px solid rgba(255,255,255,0.5)',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.8),
      0 10px 40px rgba(0,0,0,0.06)
    `,

    position: 'relative',
    overflow: 'hidden'
  },

  sheen: {
    position: 'absolute',
    top: '-50%',
    left: '-40%',
    width: '180%',
    height: '180%',

    background:
      'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.35), transparent 60%)',

    transform: 'rotate(12deg)',
    pointerEvents: 'none'
  },

  header: {
    marginBottom: '18px',
    position: 'relative',
    zIndex: 2
  },

  title: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
    color: '#1d1d1f'
  },

  sub: {
    fontSize: '13px',
    color: '#6e6e73',
    marginTop: '4px'
  },

  row: {
    display: 'flex',
    gap: '10px',
    marginTop: '16px',
    marginBottom: '12px'
  },

  input: {
    flex: 1,
    padding: '14px 16px',

    borderRadius: '18px',

    background: 'rgba(255,255,255,0.45)',

    backdropFilter: 'blur(18px)',

    border: '1px solid rgba(255,255,255,0.6)',

    outline: 'none',

    fontSize: '14px',

    transition: 'all 0.25s ease'
  },

  btn: {
    padding: '14px 18px',

    borderRadius: '18px',

    border: '1px solid rgba(255,255,255,0.6)',

    background: 'rgba(255,255,255,0.5)',

    backdropFilter: 'blur(20px)',

    fontWeight: '600',
    fontSize: '13px',

    color: '#1d1d1f',

    cursor: 'pointer',

    transition: 'all 0.25s ease',

    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.9)'
  },

  msg: {
    marginTop: '10px',
    marginBottom: '12px',

    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    fontSize: '13px',

    color: '#1f9d4a',

    background: 'rgba(52,199,89,0.08)',

    border: '1px solid rgba(52,199,89,0.18)',

    padding: '10px 12px',
    borderRadius: '16px',

    backdropFilter: 'blur(18px)'
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#34c759'
  },

  list: {
    marginTop: '16px',

    borderRadius: '20px',

    overflow: 'hidden',

    background: 'rgba(255,255,255,0.25)',

    border: '1px solid rgba(255,255,255,0.4)',

    backdropFilter: 'blur(20px)'
  },

  empty: {
    padding: '22px',
    textAlign: 'center',
    color: '#8e8e93',
    fontSize: '13px'
  }
}