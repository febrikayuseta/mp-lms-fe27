import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Form terkendali + validasi + autentikasi
// Keamanan di sini hanya sisi front-end — di aplikasi nyata, validasi wajib dicek ulang di server
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({}) // { email, password, umum }
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    // 1. Validasi
    const err = {}
    if (email.trim() === '') err.email = 'Email wajib diisi'
    if (password.length < 6) err.password = 'Password minimal 6 karakter'
    setError(err)
    if (Object.keys(err).length > 0) return // blokir submit

    // 2. Autentikasi
    const pesan = onLogin(email, password) // null jika sukses
    if (pesan) {
      setError({ umum: pesan })
      return
    }

    // 3. Sukses → arahkan ke dashboard
    navigate('/dashboard')
  }

  return (
    <div className="max-w-sm mx-auto py-20">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>

        {error.umum && <p className="text-red-500 text-sm mb-4">{error.umum}</p>}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-sm cursor-pointer transition"
        >
          Masuk
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Coba: admin@mail.com / user@mail.com — password: 123456
        </p>
      </form>
    </div>
  )
}

export default Login
