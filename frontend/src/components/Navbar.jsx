import { useAuth } from '../context/AuthContext'

export default function Navbar({ page, setPage }) {
  const { token, logout } = useAuth()
  const s = styles

  return (
    <div style={s.nav}>
      <span style={s.brand}>AD Auth System</span>
      <div style={s.tabs}>
        <button style={page==='login'||page==='dashboard' ? s.on : s.off}
          onClick={() => setPage(token ? 'dashboard' : 'login')}>
          {token ? 'Dashboard' : 'Login'}
        </button>
        <button style={page==='admin' ? s.on : s.off}
          onClick={() => setPage('admin')}>Admin</button>
        {token &&
          <button style={s.out} onClick={() => { logout(); setPage('login') }}>
            Logout
          </button>}
      </div>
    </div>
  )
}

const styles = {
  nav:   { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#fff', borderBottom:'1px solid #eee' },
  brand: { fontWeight:'500', fontSize:'15px', color:'#1a1a1a' },
  tabs:  { display:'flex', gap:'6px' },
  on:    { padding:'7px 16px', background:'#0078d4', color:'#fff', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'500', cursor:'pointer' },
  off:   { padding:'7px 16px', background:'transparent', color:'#555', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', cursor:'pointer' },
  out:   { padding:'7px 16px', background:'transparent', color:'#c0392b', border:'1px solid #f5c6c6', borderRadius:'8px', fontSize:'13px', cursor:'pointer' }
}