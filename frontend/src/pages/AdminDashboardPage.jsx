import { useState, useEffect } from 'react'
import {
  getWhitelist, addToWhitelist,
  updateUserRole, removeFromWhitelist
} from '../services/admin.service'

const ROLES = ['Employee', 'Manager', 'Admin']

const ROLE_COLORS = {
  Admin:    { bg: '#fce8e8', color: '#c0392b' },
  Manager:  { bg: '#fff3e0', color: '#e67e22' },
  Employee: { bg: '#e8f5e9', color: '#27ae60' }
}

export default function AdminDashboardPage({ adminName, onLogout }) {
  const [users, setUsers]       = useState([])
  const [email, setEmail]       = useState('')
  const [role, setRole]         = useState('Employee')
  const [msg, setMsg]           = useState({ text: '', type: '' })
  const [loading, setLoading]   = useState(false)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const res = await getWhitelist()
      setUsers(res.data)
    } catch {
      showMsg('Failed to load users', 'error')
    }
  }

  const showMsg = (text, type = 'success') => {
    setMsg({ text, type })
    setTimeout(() => setMsg({ text: '', type: '' }), 3000)
  }

  const handleAdd = async () => {
    if (!email.trim()) return
    setLoading(true)
    try {
      await addToWhitelist(email.trim(), role)
      showMsg(`${email} added as ${role}`)
      setEmail('')
      setRole('Employee')
      fetchUsers()
    } catch (err) {
      showMsg(err.response?.data?.error || 'Error adding user', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userEmail, newRole) => {
    try {
      await updateUserRole(userEmail, newRole)
      showMsg(`${userEmail} role updated to ${newRole}`)
      fetchUsers()
    } catch {
      showMsg('Failed to update role', 'error')
    }
  }

  const handleRemove = async (userEmail) => {
    try {
      await removeFromWhitelist(userEmail)
      showMsg(`${userEmail} removed`)
      fetchUsers()
    } catch {
      showMsg('Failed to remove user', 'error')
    }
  }

  const counts = ROLES.reduce((acc, r) => {
    acc[r] = users.filter(u => u.role === r).length
    return acc
  }, {})

  const s = styles
  return (
    <div style={s.wrap}>

      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.headerTitle}>Admin Dashboard</div>
          <div style={s.headerSub}>Logged in as <strong>{adminName}</strong></div>
        </div>
        <button style={s.logoutBtn} onClick={onLogout}>Logout</button>
      </div>

      <div style={s.body}>

        {/* Stats */}
        <div style={s.stats}>
          <div style={s.stat}>
            <div style={s.statVal}>{users.length}</div>
            <div style={s.statLabel}>Total Users</div>
          </div>
          {ROLES.map(r => (
            <div key={r} style={s.stat}>
              <div style={{...s.statVal, color: ROLE_COLORS[r].color}}>{counts[r] || 0}</div>
              <div style={s.statLabel}>{r}s</div>
            </div>
          ))}
        </div>

        {/* Add user form */}
        <div style={s.addCard}>
          <div style={s.addTitle}>Add New User</div>
          <div style={s.addRow}>
            <input style={s.input}
              placeholder="user@example.org"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()} />
            <select style={s.select} value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <button style={s.addBtn} onClick={handleAdd} disabled={loading}>
              {loading ? 'Adding...' : '+ Add User'}
            </button>
          </div>
          {msg.text && (
            <p style={{ color: msg.type === 'error' ? '#c0392b' : '#27ae60', fontSize:'13px', marginTop:'8px' }}>
              {msg.text}
            </p>
          )}
        </div>

        {/* User table */}
        <div style={s.tableCard}>
          <div style={s.tableHeader}>
            <div style={s.tableTitle}>Whitelisted Users <span style={s.countBadge}>{users.length}</span></div>
          </div>

          {users.length === 0 ? (
            <div style={s.empty}>No users yet. Add one above.</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {['User', 'Role', 'Date Added', 'Actions'].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={s.tr}>
                    <td style={s.td}>
                      <div style={s.userCell}>
                        <div style={s.avatar}>{u.email.slice(0,2).toUpperCase()}</div>
                        <span style={s.emailText}>{u.email}</span>
                      </div>
                    </td>
                    <td style={s.td}>
                      <select
                        style={{
                          ...s.roleSelect,
                          background: ROLE_COLORS[u.role]?.bg || '#f5f5f5',
                          color: ROLE_COLORS[u.role]?.color || '#333'
                        }}
                        value={u.role}
                        onChange={e => handleRoleChange(u.email, e.target.value)}
                      >
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td style={s.td}>
                      <span style={s.dateText}>
                        {new Date(u.addedAt).toLocaleDateString('en-IN', {
                          day:'2-digit', month:'short', year:'numeric'
                        })}
                      </span>
                    </td>
                    <td style={s.td}>
                      <button style={s.removeBtn} onClick={() => handleRemove(u.email)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}

const styles = {
  wrap:        { minHeight:'100vh', background:'#f4f6f9', fontFamily:'sans-serif' },
  header:      { background:'#1a1a2e', color:'#fff', padding:'16px 28px', display:'flex', alignItems:'center', justifyContent:'space-between' },
  headerTitle: { fontSize:'18px', fontWeight:'600' },
  headerSub:   { fontSize:'12px', color:'#aaa', marginTop:'2px' },
  logoutBtn:   { padding:'7px 16px', background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'8px', fontSize:'13px', cursor:'pointer' },
  body:        { maxWidth:'860px', margin:'0 auto', padding:'24px 20px' },
  stats:       { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px' },
  stat:        { background:'#fff', borderRadius:'10px', padding:'16px', textAlign:'center', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' },
  statVal:     { fontSize:'28px', fontWeight:'600', color:'#1a1a2e', marginBottom:'4px' },
  statLabel:   { fontSize:'12px', color:'#888' },
  addCard:     { background:'#fff', borderRadius:'12px', padding:'20px 24px', marginBottom:'20px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' },
  addTitle:    { fontSize:'14px', fontWeight:'500', color:'#1a1a1a', marginBottom:'14px' },
  addRow:      { display:'flex', gap:'10px', alignItems:'center' },
  input:       { flex:1, padding:'9px 12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px' },
  select:      { padding:'9px 12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', background:'#fff', cursor:'pointer' },
  addBtn:      { padding:'9px 18px', background:'#1a1a2e', color:'#fff', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'500', cursor:'pointer', whiteSpace:'nowrap' },
  tableCard:   { background:'#fff', borderRadius:'12px', overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' },
  tableHeader: { padding:'16px 24px', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between' },
  tableTitle:  { fontSize:'14px', fontWeight:'500', color:'#1a1a1a' },
  countBadge:  { background:'#f0f0f0', borderRadius:'20px', padding:'1px 8px', fontSize:'12px', marginLeft:'8px' },
  table:       { width:'100%', borderCollapse:'collapse' },
  th:          { padding:'10px 16px', background:'#f8f9fa', fontSize:'12px', fontWeight:'600', color:'#555', textAlign:'left', borderBottom:'1px solid #eee' },
  tr:          { borderBottom:'1px solid #f5f5f5' },
  td:          { padding:'12px 16px', fontSize:'13px', color:'#333', verticalAlign:'middle' },
  userCell:    { display:'flex', alignItems:'center', gap:'10px' },
  avatar:      { width:'32px', height:'32px', borderRadius:'50%', background:'#e8f0fe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'600', color:'#1a73e8', flexShrink:0 },
  emailText:   { fontSize:'13px', color:'#1a1a1a', fontWeight:'500' },
  roleSelect:  { padding:'4px 8px', border:'none', borderRadius:'20px', fontSize:'12px', fontWeight:'500', cursor:'pointer', outline:'none' },
  dateText:    { fontSize:'12px', color:'#888' },
  removeBtn:   { padding:'5px 12px', background:'#fff', border:'1px solid #f5c6c6', color:'#c0392b', borderRadius:'6px', fontSize:'12px', cursor:'pointer' },
  empty:       { padding:'40px', textAlign:'center', color:'#aaa', fontSize:'13px' }
}