import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Button from '../components/Button'
import Card from '../components/Card'

function Register() {
  const navigate = useNavigate()
  const { post } = useFetch()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const err = {}
    if (!form.firstName.trim()) err.firstName = 'Nama depan wajib diisi'
    if (!form.lastName.trim()) err.lastName = 'Nama belakang wajib diisi'
    if (!form.username.trim()) err.username = 'Username wajib diisi'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Format email tidak valid'
    if (form.password.length < 6) err.password = 'Password minimal 6 karakter'
    if (form.password !== form.confirmPassword) err.confirmPassword = 'Password tidak cocok'
    return err
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const err = validate()
    setError(err)
    if (Object.keys(err).length > 0) return

    setLoading(true)
    try {
      const result = await post('/users/add', {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      })

      if (!result.id) {
        setError({ umum: result.message || 'Registrasi gagal, coba lagi' })
        return
      }

      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch {
      setError({ umum: 'Gagal terhubung ke server' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-sm mx-auto py-20">
        <Card className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-green-600 mb-2">Registrasi Berhasil!</h2>
          <p className="text-gray-500 text-sm">Mengalihkan ke halaman login...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto py-10">
      <Card>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                name="firstName"
                type="text"
                placeholder="Nama Depan"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {error.firstName && <p className="text-red-500 text-xs mt-1">{error.firstName}</p>}
            </div>
            <div className="flex-1">
              <input
                name="lastName"
                type="text"
                placeholder="Nama Belakang"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {error.lastName && <p className="text-red-500 text-xs mt-1">{error.lastName}</p>}
            </div>
          </div>

          <div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {error.username && <p className="text-red-500 text-xs mt-1">{error.username}</p>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {error.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>
            )}
          </div>

          {error.umum && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
              {error.umum}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading} className="py-3 text-base rounded-xl">
            {loading ? 'Mendaftar...' : 'Daftar'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Register
