import { NavLink } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext.jsx'

const linkClasses = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`

export default function Nav() {
  const { isAuthenticated, login, logout } = useAuth()
  return (
    <nav className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <NavLink to="/" className={linkClasses} end>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClasses}>
          About
        </NavLink>
        <NavLink to="/dashboard" className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/api-demo" className={linkClasses}>
          API Demo
        </NavLink>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <button className="btn btn-primary" onClick={logout}>Logout</button>
        ) : (
          <button className="btn" onClick={login}>Login</button>
        )}
      </div>
    </nav>
  )
}