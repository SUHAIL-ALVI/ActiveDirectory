import { useAuth } from '../context/AuthContext'

export default function Navbar({ page, setPage }) {
  const { token, logout } = useAuth()
  const s = styles

  return (
    <div style={s.nav}>
      <div style={s.left}>
        <div style={s.brand}>AD Auth System</div>
      </div>

      <div style={s.tabs}>
        <button
          style={page === 'login' || page === 'dashboard' ? s.active : s.tab}
          onClick={() => setPage(token ? 'dashboard' : 'login')}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          {token ? 'Dashboard' : 'Login'}
        </button>

        <button
          style={page === 'admin' ? s.active : s.tab}
          onClick={() => setPage('admin')}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          Admin
        </button>
      </div>

      <div style={s.right}>
        {token && (
          <button
            style={s.logout}
            onClick={() => {
              logout()
              setPage('login')
            }}
            onMouseEnter={logoutHoverIn}
            onMouseLeave={logoutHoverOut}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

/* subtle hover effects */
const hoverIn = (e) => {
  e.currentTarget.style.transform = 'translateY(-1px)'
}

const hoverOut = (e) => {
  e.currentTarget.style.transform = 'translateY(0)'
}

const logoutHoverIn = (e) => {
  e.currentTarget.style.background = 'rgba(255,59,48,0.08)'
  e.currentTarget.style.transform = 'translateY(-1px)'
}

const logoutHoverOut = (e) => {
  e.currentTarget.style.background = 'rgba(255,255,255,0.35)'
  e.currentTarget.style.transform = 'translateY(0)'
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 50,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: '12px 22px',

    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',

    borderBottom: '1px solid rgba(255,255,255,0.6)',

    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
  },

  left: {
    display: 'flex',
    alignItems: 'center'
  },

  brand: {
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '-0.2px',
    color: '#1d1d1f'
  },

  tabs: {
    display: 'flex',
    gap: '8px',
    padding: '6px',
    background: 'rgba(255,255,255,0.35)',
    borderRadius: '16px',
    backdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.5)'
  },

  tab: {
    padding: '8px 14px',
    borderRadius: '12px',

    background: 'transparent',
    border: '1px solid transparent',

    fontSize: '13px',
    fontWeight: '500',
    color: '#6e6e73',

    cursor: 'pointer',
    transition: 'all 0.25s ease'
  },

  active: {
    padding: '8px 14px',
    borderRadius: '12px',

    background: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.8)',

    fontSize: '13px',
    fontWeight: '600',
    color: '#1d1d1f',

    boxShadow: '0 6px 16px rgba(0,0,0,0.06)',

    cursor: 'pointer',
    transition: 'all 0.25s ease'
  },

  right: {
    display: 'flex',
    alignItems: 'center'
  },

  logout: {
    padding: '8px 14px',
    borderRadius: '12px',

    background: 'rgba(255,255,255,0.35)',
    border: '1px solid rgba(255,255,255,0.5)',

    fontSize: '13px',
    fontWeight: '500',
    color: '#d70015',

    cursor: 'pointer',
    transition: 'all 0.25s ease'
  }
}