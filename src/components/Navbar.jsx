import { NavLink } from 'react-router-dom'

// NavLink memberi info apakah link sedang aktif
const gaya = ({ isActive }) => {
  const base = 'px-3 py-2 rounded-lg transition text-sm font-medium'
  return isActive
    ? `${base} bg-blue-100 text-blue-700`
    : `${base} text-gray-600 hover:bg-gray-100`
}

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="flex items-center gap-1 px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
      <NavLink to="/" className={gaya}>Home</NavLink>
      <NavLink to="/about" className={gaya}>About</NavLink>
      <NavLink to="/dashboard" className={gaya}>Dashboard</NavLink>

      <span className="ml-auto">
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" className={gaya}>Login</NavLink>
        )}
      </span>
    </nav>
  )
}

export default Navbar
