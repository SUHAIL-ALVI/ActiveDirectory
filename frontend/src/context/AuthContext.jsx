import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(null)
  const [user, setUser]     = useState(null)

  const loginSuccess = (token, displayName) => {
    setToken(token)
    setUser({ displayName })
  }

  const logout = () => { setToken(null); setUser(null) }

  return (
    <AuthContext.Provider value={{ token, user, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)