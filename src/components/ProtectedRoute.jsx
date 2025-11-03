import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect unauthenticated users to staff email/verify page
    return <Navigate to="/staff" replace state={{ from: location }} />
  }

  return children
}