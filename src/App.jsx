import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'

// "database" dummy — di aplikasi nyata ini dari server
const DAFTAR_USER = [
  { email: 'admin@mail.com', password: '123456', role: 'admin' },
  { email: 'user@mail.com', password: '123456', role: 'user' },
]

function App() {
  // null = belum login; { email, role } = sudah login
  const [user, setUser] = useState(null)

  // Kembalikan pesan error, atau null jika sukses
  function login(email, password) {
    const user = DAFTAR_USER.find(
      (u) => u.email === email && u.password === password
    )
    if (!user) return 'Email atau password salah'
    setUser({ email: user.email, role: user.role })
    return null
  }

  function logout() {
    setUser(null)
  }

  const isLoggedIn = user !== null

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar user={user} onLogout={logout} />

      <div className="py-10 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={login} />} />

          {/* Butuh login */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />

          {/* Butuh login DAN role admin (berlapis) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RoleRoute role={user?.role} izin="admin">
                  <AdminPanel />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h1 className="text-center text-2xl font-bold text-gray-800 py-20">404 — Halaman tidak ditemukan</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
