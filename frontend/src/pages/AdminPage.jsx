import { useState, useEffect } from 'react'
import UserRow from '../components/UserRow'
import { getWhitelist, addToWhitelist, removeFromWhitelist } from '../services/admin.service'

export default function AdminPage() {
  const [users, setUsers]     = useState([])
  const [email, setEmail]     = useState('')
  const [msg, setMsg]         = useState('')

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    const res = await getWhitelist()
    setUsers(res.data)
  }

  const handleAdd = async () => {
    if (!email) return
    try {
      await addToWhitelist(email)
      setMsg(`${email} added`)
      setEmail('')
      fetchUsers()
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error')
    }
  }

  const handleRemove = async (email) => {
    await removeFromWhitelist(email)
    setMsg(`${email} removed`)
    fetchUsers()
  }

  const s = styles
  return (
    <div style={s.card}>
      <h2 style={s.title}>Whitelist Admin</h2>
      <p style={s.sub}>Manage who can access the system</p>
      <div style={s.row}>
        <input style={{...s.input, marginBottom:0, flex:1}}
          placeholder="alice@example.org"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key==='Enter' && handleAdd()} />
        <button style={s.btn} onClick={handleAdd}>Add</button>
      </div>
      {msg && <p style={s.ok}>{msg}</p>}
      <div style={s.list}>
        {users.length===0 && <p style={s.empty}>No users yet</p>}
        {users.map(u => <UserRow key={u._id} user={u} onRemove={handleRemove} />)}
      </div>
    </div>
  )
}

const styles = {
  card:  { maxWidth:'500px', margin:'40px auto', background:'#fff', borderRadius:'12px', padding:'32px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)' },
  title: { fontSize:'20px', fontWeight:'500', marginBottom:'4px' },
  sub:   { fontSize:'13px', color:'#888', marginBottom:'24px' },
  row:   { display:'flex', gap:'8px', alignItems:'center', marginBottom:'12px' },
  input: { display:'block', padding:'9px 12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box' },
  btn:   { padding:'9px 18px', background:'#0078d4', color:'#fff', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'500', cursor:'pointer' },
  ok:    { color:'#27ae60', fontSize:'13px', marginBottom:'8px' },
  list:  { border:'1px solid #eee', borderRadius:'8px', overflow:'hidden', marginTop:'16px' },
  empty: { padding:'20px', textAlign:'center', color:'#aaa', fontSize:'13px' }
}