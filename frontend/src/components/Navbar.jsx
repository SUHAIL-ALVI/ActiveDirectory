import { useAuth } from '../context/AuthContext'

export default function Navbar({ page, setPage, onAdminClick }) {
  const { token, logout } = useAuth()

  return (
    <div style={styles.outer}>
      <div style={styles.nav}>
        {/* Liquid Glass Reflection */}
        <div style={styles.reflection} />

        {/* Left Side */}
        <div style={styles.brandSection}>
          <div style={styles.logo}>AD</div>

          <div>
            <div style={styles.brand}></div>
            <div style={styles.subtitle}>
             
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <div style={styles.centerNav}>
          <button
            style={
              page === 'login' || page === 'dashboard'
                ? styles.activeTab
                : styles.tab
            }
            onClick={() =>
              setPage(token ? 'dashboard' : 'login')
            }
            onMouseEnter={buttonHoverIn}
            onMouseLeave={buttonHoverOut}
          >
            {token ? 'Dashboard' : 'Login'}
          </button>

          <button
            style={
              page === 'admin'
                ? styles.activeTab
                : styles.tab
            }
            onClick={onAdminClick}
            onMouseEnter={buttonHoverIn}
            onMouseLeave={buttonHoverOut}
          >
            Admin Portal
          </button>
        </div>

        {/* Right Side */}
        <div style={styles.rightSection}>
          {token && (
            <button
              style={styles.logout}
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
    </div>
  )
}

const buttonHoverIn = (e) => {
  if (
    !e.currentTarget.style.background.includes('linear-gradient')
  ) {
    e.currentTarget.style.background =
      'rgba(255,255,255,0.25)'
  }

  e.currentTarget.style.transform =
    'translateY(-2px)'
}

const buttonHoverOut = (e) => {
  e.currentTarget.style.transform =
    'translateY(0)'
}

const logoutHoverIn = (e) => {
  e.currentTarget.style.transform =
    'translateY(-2px)'

  e.currentTarget.style.background =
    'rgba(255,59,48,.08)'
}

const logoutHoverOut = (e) => {
  e.currentTarget.style.transform =
    'translateY(0)'

  e.currentTarget.style.background =
    'rgba(255,255,255,.22)'
}

const styles = {
  outer: {
    padding: '20px'
  },

  nav: {
    position: 'relative',

    maxWidth: '1400px',
    margin: '0 auto',

    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',

    alignItems: 'center',

    padding: '14px 18px',

    background: 'rgba(255,255,255,0.18)',

    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter:
      'blur(40px) saturate(180%)',

    borderRadius: '34px',

    border:
      '1px solid rgba(255,255,255,0.45)',

    boxShadow: `
      0 25px 60px rgba(0,0,0,.08),
      inset 0 1px 1px rgba(255,255,255,.9),
      inset 0 -1px 1px rgba(255,255,255,.2)
    `,

    overflow: 'hidden'
  },

  reflection: {
    position: 'absolute',

    top: '-250%',
    left: '-20%',

    width: '140%',
    height: '500%',

    background: `
      linear-gradient(
        120deg,
        transparent 45%,
        rgba(255,255,255,.18) 50%,
        transparent 55%
      )
    `,

    pointerEvents: 'none'
  },

  brandSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },

  logo: {
    width: '52px',
    height: '52px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '18px',

    background: `
      linear-gradient(
        180deg,
        rgba(255,255,255,.7),
        rgba(255,255,255,.3)
      )
    `,

    border:
      '1px solid rgba(255,255,255,.7)',

    backdropFilter: 'blur(25px)',

    color: '#1d1d1f',

    fontWeight: '700',
    fontSize: '15px',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,.95)
    `
  },

  brand: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1d1d1f',
    letterSpacing: '-0.2px'
  },

  subtitle: {
    fontSize: '12px',
    color: '#8e8e93',
    marginTop: '2px'
  },

  centerNav: {
    display: 'flex',
    gap: '8px',

    padding: '6px',

    background: 'rgba(255,255,255,0.16)',

    border:
      '1px solid rgba(255,255,255,0.35)',

    backdropFilter: 'blur(25px)',

    borderRadius: '22px',

    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,.5)
    `
  },

  tab: {
    padding: '12px 22px',

    border: 'none',
    outline: 'none',

    borderRadius: '18px',

    background: 'transparent',

    color: '#6e6e73',

    fontSize: '13px',
    fontWeight: '500',

    cursor: 'pointer',

    transition: 'all .25s ease'
  },

  activeTab: {
    padding: '12px 22px',

    borderRadius: '18px',

    border:
      '1px solid rgba(255,255,255,.7)',

    background: `
      linear-gradient(
        180deg,
        rgba(255,255,255,.78),
        rgba(255,255,255,.42)
      )
    `,

    color: '#1d1d1f',

    fontWeight: '600',
    fontSize: '13px',

    cursor: 'pointer',

    backdropFilter: 'blur(25px)',

    boxShadow: `
      0 12px 24px rgba(0,0,0,.06),
      inset 0 1px 1px rgba(255,255,255,.95)
    `,

    transform: 'translateY(-1px)',

    transition: 'all .25s ease'
  },

  rightSection: {
    justifySelf: 'end'
  },

  logout: {
    padding: '11px 18px',

    borderRadius: '18px',

    border:
      '1px solid rgba(255,59,48,.12)',

    background: 'rgba(255,255,255,.22)',

    backdropFilter: 'blur(20px)',

    color: '#d70015',

    fontSize: '13px',
    fontWeight: '500',

    cursor: 'pointer',

    transition: 'all .25s ease'
  }
}