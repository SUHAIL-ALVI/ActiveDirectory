export default function UserRow({ user, onRemove }) {
  const s = styles
  return (
    <div style={s.row}>
      <div style={s.avatar}>{user.email.slice(0,2).toUpperCase()}</div>
      <div style={s.info}>
        <div style={s.email}>{user.email}</div>
        <div style={s.meta}>Added {new Date(user.addedAt).toLocaleDateString()}</div>
      </div>
      <button style={s.remove} onClick={() => onRemove(user.email)}>Remove</button>
    </div>
  )
}

const styles = {
  row:    { display:'flex', alignItems:'center', gap:'12px', padding:'10px 16px', borderBottom:'1px solid #f5f5f5' },
  avatar: { width:'34px', height:'34px', borderRadius:'50%', background:'#e8f0fe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'500', color:'#1a73e8', flexShrink:0 },
  info:   { flex:1 },
  email:  { fontSize:'13px', fontWeight:'500', color:'#1a1a1a' },
  meta:   { fontSize:'11px', color:'#999', marginTop:'2px' },
  remove: { padding:'5px 10px', background:'#fff', border:'1px solid #f5c6c6', color:'#c0392b', borderRadius:'6px', fontSize:'12px', cursor:'pointer' }
}