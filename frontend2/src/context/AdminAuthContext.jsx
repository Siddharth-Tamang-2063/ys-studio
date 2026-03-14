import React, { createContext, useContext, useState } from 'react'

// ─── CREDENTIALS ───────────────────────────────────────────
const ADMIN_ID       = 'admin'
const ADMIN_PASSWORD = 'admin123'
// ───────────────────────────────────────────────────────────

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('YS Studio_admin_auth') === 'true'
  })
  const [loginError, setLoginError] = useState('')

  const login = (id, password) => {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('YS Studio_admin_auth', 'true')
      setIsAuthenticated(true)
      setLoginError('')
      return true
    }
    setLoginError('Invalid credentials. Please try again.')
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('YS Studio_admin_auth')
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loginError }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}