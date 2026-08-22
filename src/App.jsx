import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

      <div className="py-10 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

          {/* Halaman privat: dibungkus ProtectedRoute */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
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
