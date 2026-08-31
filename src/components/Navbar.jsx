import { NavLink } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-0">
        <div className="flex flex-wrap items-center gap-1 h-16">

          <NavLink to="/" className="flex items-center mr-6">
            <span className="text-white font-bold text-lg tracking-tight">Feb LMS</span>
          </NavLink>

          <div className="flex items-center gap-1 flex-1 flex-wrap">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            {user && <NavItem to="/dashboard">Dashboard</NavItem>}
            {user && <NavItem to="/users">Users</NavItem>}
            {user && <NavItem to="/todos">Tugas</NavItem>}
            {user && <NavItem to="/posts">Materi</NavItem>}
            {user && <NavItem to="/quotes">Quiz</NavItem>}
            {user?.role === 'admin' && <NavItem to="/admin">Admin</NavItem>}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-medium leading-none">{user.username}</p>
                  <p className="text-blue-300 text-xs capitalize">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-white hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="px-4 py-1.5 text-sm font-medium text-white border border-blue-300 hover:border-white rounded-lg transition"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-4 py-1.5 text-sm font-medium text-blue-700 bg-amber-500 hover:bg-amber-400 rounded-lg transition"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          isActive
            ? 'bg-white/20 text-white'
            : 'text-blue-200 hover:text-white hover:bg-white/10'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default Navbar
