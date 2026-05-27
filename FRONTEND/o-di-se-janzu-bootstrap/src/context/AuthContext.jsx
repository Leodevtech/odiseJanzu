'use client'
import { createContext, useContext, useState } from 'react'
import { setAccessToken } from '@/api/axios'

// crée le contexte 
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (accessToken) => {
    const payload = JSON.parse(atob(accessToken.split('.')[1]))
    setUser(payload)
    setAccessToken(accessToken)
  }

  // Appelée a la déconnexion vide le state et le token en mémoire
  const logout = () => {
    setUser(null)
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>

      {children}

    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)