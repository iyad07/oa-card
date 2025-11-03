import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { requestOtp as apiRequestOtp, verifyOtp as apiVerifyOtp, getUser as apiGetUser } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const [profile, setProfile] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [tokenExpiry, setTokenExpiry] = useState(0)

  useEffect(() => {
    const savedToken = localStorage.getItem('token') || ''
    const savedUserId = localStorage.getItem('userId') || ''
    const savedExpiryStr = localStorage.getItem('tokenExpiry') || ''
    const savedExpiry = savedExpiryStr ? Number(savedExpiryStr) : 0
    setToken(savedToken)
    setUserId(savedUserId)
    setTokenExpiry(savedExpiry)
    if (savedToken && savedUserId && (!savedExpiry || Date.now() < savedExpiry)) {
      apiGetUser(savedUserId).then(({ data }) => setProfile(data)).catch(() => {})
    } else {
      // Expired or invalid session; clear
      setToken('')
      setUserId('')
      setProfile(null)
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiry')
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
    const expiryMs = Date.now() + 10 * 60 * 1000 // 10 minutes session
    setTokenExpiry(expiryMs)
    localStorage.setItem('token', newToken)
    localStorage.setItem('userId', newUserId)
    localStorage.setItem('tokenExpiry', String(expiryMs))
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
    setTokenExpiry(0)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiry')
  }

  const value = useMemo(() => ({
    isAuthenticated: Boolean(token && userId) && (!tokenExpiry || Date.now() < tokenExpiry),
    isReady,
    token,
    userId,
    profile,
    requestOtp,
    verifyOtp,
    refreshProfile,
    logout,
  }), [isReady, token, userId, profile, tokenExpiry])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}