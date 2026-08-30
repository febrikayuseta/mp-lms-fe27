import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import useFetch from './hooks/useFetch'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import Register from './pages/Register'

function App() {
  // Ambil user dari localStorage saat pertama kali load
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const { post } = useFetch()

  // Login via DummyJSON API — return error message atau null jika sukses
  async function login(username, password) {
    try {
      const data = await post('/auth/login', { username, password })

      if (data.message) {
        return data.message
      }

      const userData = {
        username: data.username,
        email: data.email,
        role: data.role,
        token: data.accessToken,
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return null
    } catch {
      return 'Gagal terhubung ke server'
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar user={user} onLogout={logout} />

      <div className="py-10 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />

          {/* Butuh token (login) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />

          {/* CRUD Users — butuh token */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          {/* Detail user — butuh token */}
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />

          {/* Butuh token DAN role admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
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
