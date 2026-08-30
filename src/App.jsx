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
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const { post } = useFetch()

  async function login(username, password) {
    try {
      const data = await post('/auth/login', { username, password })
      if (data.message) return data.message

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
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} onLogout={logout} />

      <main className="py-10 px-4">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard user={user} /></ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute><Users /></ProtectedRoute>
          } />

          <Route path="/users/:id" element={
            <ProtectedRoute><UserDetail /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute>
              <RoleRoute role={user?.role} izin="admin">
                <AdminPanel />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="*" element={
            <div className="text-center py-32">
              <p className="text-8xl font-black text-slate-200">404</p>
              <p className="text-xl font-semibold text-slate-500 mt-4">Halaman tidak ditemukan</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
