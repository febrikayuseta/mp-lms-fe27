import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const err = {}
    if (username.trim() === '') err.username = 'Username wajib diisi'
    if (password.length < 4) err.password = 'Password minimal 4 karakter'
    setError(err)
    if (Object.keys(err).length > 0) return

    setLoading(true)
    const pesan = await onLogin(username, password)
    setLoading(false)

    if (pesan) {
      setError({ umum: pesan })
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="max-w-sm mx-auto py-20">
      <Card>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {error.username && <p className="text-red-500 text-sm mt-1">{error.username}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          </div>

          {error.umum && <p className="text-red-500 text-sm">{error.umum}</p>}

          <Button type="submit" fullWidth disabled={loading} className="py-3 text-base rounded-xl">
            {loading ? 'Loading...' : 'Masuk'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-2">
          Coba: emilys / emilyspass
        </p>
        <p className="text-center text-sm text-gray-500 mt-3">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Login
