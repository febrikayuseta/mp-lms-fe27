import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function Register() {
  const navigate = useNavigate()
  const { post } = useFetch()

  const [form, setForm] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '',
  })
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const err = {}
    if (!form.firstName.trim()) err.firstName = 'Wajib diisi'
    if (!form.lastName.trim()) err.lastName = 'Wajib diisi'
    if (!form.username.trim()) err.username = 'Wajib diisi'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Format email tidak valid'
    if (form.password.length < 6) err.password = 'Minimal 6 karakter'
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
        firstName: form.firstName, lastName: form.lastName,
        username: form.username, email: form.email, password: form.password,
      })
      if (!result.id) { setError({ umum: result.message || 'Registrasi gagal' }); return }
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
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <h2 className="text-xl font-black text-emerald-600 mb-2">Registrasi Berhasil!</h2>
          <p className="text-slate-400 text-sm">Mengalihkan ke halaman login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between bg-blue-900 text-white p-10 w-2/5">
          <div>
            <p className="text-white font-bold text-xl mb-8">Feb LMS</p>
            <h2 className="text-3xl font-black leading-tight mb-3">
              Bergabung<br />Bersama<br />Kami
            </h2>
            <p className="text-blue-300 text-sm leading-relaxed">
              Daftarkan akun untuk mulai mengelola data pembelajaran secara digital.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 space-y-2">
            <p className="text-blue-200 text-xs">Dengan mendaftar kamu bisa:</p>
            {['Akses data user', 'Kelola tugas dashboard', 'Lihat detail profil'].map((t) => (
              <p key={t} className="text-white text-sm flex items-center gap-2">
                <span className="text-amber-400">✓</span> {t}
              </p>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 p-8 sm:p-12 overflow-y-auto">
          <h1 className="text-2xl font-black text-blue-900 mb-1">Buat Akun</h1>
          <p className="text-slate-400 text-sm mb-6">Lengkapi data diri kamu</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Depan</label>
                <input name="firstName" type="text" placeholder="John" value={form.firstName} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                {error.firstName && <p className="text-red-500 text-xs mt-1">{error.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Belakang</label>
                <input name="lastName" type="text" placeholder="Doe" value={form.lastName} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                {error.lastName && <p className="text-red-500 text-xs mt-1">{error.lastName}</p>}
              </div>
            </div>

            <Field label="Username" name="username" type="text" placeholder="johndoe"
              value={form.username} onChange={handleChange} error={error.username} />
            <Field label="Email" name="email" type="email" placeholder="john@email.com"
              value={form.email} onChange={handleChange} error={error.email} />
            <Field label="Password" name="password" type="password" placeholder="Min. 6 karakter"
              value={form.password} onChange={handleChange} error={error.password} />
            <Field label="Konfirmasi Password" name="confirmPassword" type="password" placeholder="Ulangi password"
              value={form.confirmPassword} onChange={handleChange} error={error.confirmPassword} />

            {error.umum && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error.umum}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer mt-1">
              {loading ? 'Mendaftarkan...' : 'Buat Akun'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-700 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Register
