import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isReady } = useAuth()
  const location = useLocation()

  // Wait for auth hydration before deciding
  if (!isReady) {
    return null
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to staff email/verify page
    return <Navigate to="/staff" replace state={{ from: location }} />
  }

  return children
}