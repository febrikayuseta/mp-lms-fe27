import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const err = {}
    if (!username.trim()) err.username = 'Username wajib diisi'
    if (password.length < 4) err.password = 'Password minimal 4 karakter'
    setError(err)
    if (Object.keys(err).length > 0) return

    setLoading(true)
    const pesan = await onLogin(username, password)
    setLoading(false)
    if (pesan) { setError({ umum: pesan }); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between bg-blue-900 text-white p-10 w-2/5">
          <div>
            <p className="text-white font-bold text-xl mb-8">Feb LMS</p>
            <h2 className="text-3xl font-black leading-tight mb-3">
              Selamat<br />Datang<br />Kembali
            </h2>
            <p className="text-blue-300 text-sm leading-relaxed">
              Masuk untuk mengelola data siswa, tugas, dan materi pembelajaran.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-blue-200 text-xs mb-1">Akun demo:</p>
            <p className="text-white font-mono text-sm">emilys / emilyspass</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 p-8 sm:p-12">
          <h1 className="text-2xl font-black text-blue-900 mb-1">Login</h1>
          <p className="text-slate-400 text-sm mb-8">Masukkan kredensial akun kamu</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
              <input
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              {error.username && <p className="text-red-500 text-xs mt-1.5">{error.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              {error.password && <p className="text-red-500 text-xs mt-1.5">{error.password}</p>}
            </div>

            {error.umum && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error.umum}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-700 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
