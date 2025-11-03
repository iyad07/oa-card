import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { requestOtp as apiRequestOtp, verifyOtp as apiVerifyOtp, getUser as apiGetUser } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const isAuthenticated = Boolean(token)
  const [profile, setProfile] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('token') || ''
    const savedUserId = localStorage.getItem('userId') || ''
    setToken(savedToken)
    setUserId(savedUserId)
    if (savedToken && savedUserId) {
      // Optionally fetch profile on load
      apiGetUser(savedUserId).then(({ data }) => setProfile(data)).catch(() => {})
    }
    setIsReady(true)
  }, [])

  const requestOtp = async (email) => {
    const res = await apiRequestOtp(email)
    return res.data
  }

  const verifyOtp = async (email, otp) => {
    const { token: newToken, userId: newUserId } = await apiVerifyOtp(email, otp)
    setToken(newToken)
    setUserId(newUserId)
    localStorage.setItem('token', newToken)
    localStorage.setItem('userId', newUserId)
    try {
      const { data } = await apiGetUser(newUserId)
      setProfile(data)
    } catch (_) {}
    return { token: newToken, userId: newUserId }
  }

  const refreshProfile = async () => {
    if (!userId) return null
    try {
      const { data } = await apiGetUser(userId)
      setProfile(data)
      return data
    } catch (_) {
      return null
    }
  }

  const logout = () => {
    setToken('')
    setUserId('')
    setProfile(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  const value = useMemo(() => ({
    isAuthenticated,
    isReady,
    token,
    userId,
    profile,
    requestOtp,
    verifyOtp,
    refreshProfile,
    logout,
  }), [isAuthenticated, isReady, token, userId, profile])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}