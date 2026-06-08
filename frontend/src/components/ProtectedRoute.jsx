import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) return <p style={{textAlign:'center',marginTop:'40px'}}>Please log in first.</p>
  return children
}