import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { requestOtp as apiRequestOtp, verifyOtp as apiVerifyOtp, getUser as apiGetUser, updateUser as apiUpdateUser } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const [profile, setProfile] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [tokenExpiry, setTokenExpiry] = useState(0)
  const verifiedTimerRef = useRef(null)
  const VERIFIED_TTL_MS = 10 * 60 * 1000 // 10 minutes

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

  // Hydrate verified reset timer if verification started previously
  useEffect(() => {
    if (!userId) return
    const timeoutId = __internal_hydrateVerifiedTimer(userId, setProfile, apiUpdateUser)
    if (timeoutId) {
      verifiedTimerRef.current = timeoutId
    }
    return () => {
      if (verifiedTimerRef.current) {
        clearTimeout(verifiedTimerRef.current)
        verifiedTimerRef.current = null
      }
    }
  }, [userId])

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
    // After verification, schedule verified=false reset in 10 minutes
    const startedAt = Date.now()
    localStorage.setItem('verifiedSetAt', String(startedAt))
    if (verifiedTimerRef.current) {
      clearTimeout(verifiedTimerRef.current)
      verifiedTimerRef.current = null
    }
    verifiedTimerRef.current = setTimeout(async () => {
      try {
        await apiUpdateUser(newUserId, { verified: false })
      } catch (_) {}
      setProfile((prev) => (prev ? { ...prev, verified: false } : prev))
      localStorage.removeItem('verifiedSetAt')
      verifiedTimerRef.current = null
    }, VERIFIED_TTL_MS)
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
    if (verifiedTimerRef.current) {
      clearTimeout(verifiedTimerRef.current)
      verifiedTimerRef.current = null
    }
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('verifiedSetAt')
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

// Hydrate verified-reset timer from localStorage when userId becomes available
// Ensures the reset happens even after page reloads during the 10-minute window
export function __internal_hydrateVerifiedTimer(userId, setProfile, apiUpdateUserRef) {
  const setAtStr = localStorage.getItem('verifiedSetAt')
  if (!userId || !setAtStr) return null
  const setAt = Number(setAtStr)
  if (!Number.isFinite(setAt)) {
    localStorage.removeItem('verifiedSetAt')
    return null
  }
  const elapsed = Date.now() - setAt
  const remaining = Math.max(10 * 60 * 1000 - elapsed, 0)
  if (remaining === 0) {
    // Immediate reset
    return (async () => {
      try { await apiUpdateUserRef(userId, { verified: false }) } catch (_) {}
      setProfile((prev) => (prev ? { ...prev, verified: false } : prev))
      localStorage.removeItem('verifiedSetAt')
    })()
  }
  return setTimeout(async () => {
    try { await apiUpdateUserRef(userId, { verified: false }) } catch (_) {}
    setProfile((prev) => (prev ? { ...prev, verified: false } : prev))
    localStorage.removeItem('verifiedSetAt')
  }, remaining)
}