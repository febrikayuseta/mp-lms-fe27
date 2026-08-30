import { NavLink } from 'react-router-dom'

const style = ({ isActive }) => {
  const base = 'px-3 py-2 rounded-lg transition text-sm font-medium'
  return isActive
    ? `${base} bg-blue-100 text-blue-700`
    : `${base} text-gray-600 hover:bg-gray-100`
}

function Navbar({ user, onLogout }) {
  return (
    <nav className="flex items-center gap-1 px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
      <NavLink to="/" className={style}>Home</NavLink>
      <NavLink to="/about" className={style}>About</NavLink>
      <NavLink to="/dashboard" className={style}>Dashboard</NavLink>
      {user && <NavLink to="/users" className={style}>Users</NavLink>}
      {user?.role === 'admin' && <NavLink to="/admin" className={style}>Admin</NavLink>}

      <span className="ml-auto flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm text-gray-600">
              {user.username} <span className="text-xs text-gray-400">({user.role})</span>
            </span>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register" className={style}>Register</NavLink>
            <NavLink to="/login" className={style}>Login</NavLink>
          </>
        )}
      </span>
    </nav>
  )
}

export default Navbar
