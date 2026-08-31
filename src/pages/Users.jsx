import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Button from '../components/Button'

const LIMIT = 10
const BASE_URL = import.meta.env.VITE_API_URL

function Users() {
  const navigate = useNavigate()
  const { post, put, del } = useFetch()

  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setLoading(true)
    const skip = (page - 1) * LIMIT
    fetch(`${BASE_URL}/users?limit=${LIMIT}&skip=${skip}`)
      .then((res) => res.json())
      .then((json) => { setUsers(json.users); setTotal(json.total); setLoading(false) })
  }, [page])

  const totalPages = Math.ceil(total / LIMIT)

  async function handleAdd() {
    if (!firstName.trim() || !lastName.trim()) { alert('Nama depan dan belakang wajib diisi'); return }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Format email tidak valid'); return }
    try {
      const result = await post('/users/add', { firstName, lastName, age: Number(age), email, username })
      setUsers([result, ...users])
      resetForm()
    } catch (err) { alert('Gagal menambah user: ' + err.message) }
  }

  function resetForm() { setEditId(null); setFirstName(''); setLastName(''); setAge(''); setEmail(''); setUsername(''); setShowForm(false) }

  function startEdit(user) {
    setEditId(user.id); setFirstName(user.firstName); setLastName(user.lastName)
    setAge(String(user.age)); setEmail(user.email || ''); setUsername(user.username || ''); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleUpdate() {
    try {
      const result = await put(`/users/${editId}`, { firstName, lastName, age: Number(age), email, username })
      setUsers(users.map((u) => (u.id === editId ? result : u)))
      resetForm()
    } catch (err) { alert('Gagal mengupdate user: ' + err.message) }
  }

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus user ini?')) return
    try {
      await del(`/users/${id}`)
      setUsers(users.filter((u) => u.id !== id))
    } catch (err) { alert('Gagal menghapus user: ' + err.message) }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-blue-700">Data Users</h1>
          <p className="text-slate-400 text-sm mt-0.5">Total {total} user terdaftar</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(!showForm) }} variant={showForm ? 'secondary' : 'primary'}>
          {showForm ? '✕ Tutup' : '+ Tambah User'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-6">
          <h2 className="font-bold text-blue-700 mb-4">{editId ? 'Edit User' : 'Tambah User Baru'}</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Depan</label>
              <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Belakang</label>
              <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Umur</label>
              <input type="number" placeholder="20" value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Username</label>
              <input type="text" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
              <input type="email" placeholder="john@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {editId ? (
              <>
                <Button variant="success" onClick={handleUpdate}>Simpan Perubahan</Button>
                <Button variant="secondary" onClick={resetForm}>Batal</Button>
              </>
            ) : (
              <Button onClick={handleAdd}>Tambahkan</Button>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-3xl mb-3">⏳</p>
            <p className="text-sm">Memuat data user...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[560px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Umur</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-slate-400">@{u.username}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{u.email}</td>
                    <td className="px-5 py-3.5">
                      <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {u.age} th
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => navigate(`/users/${u.id}`)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 cursor-pointer">Detail</button>
                        <button onClick={() => startEdit(u)}
                          className="text-xs font-medium text-amber-600 hover:text-amber-800 cursor-pointer">Edit</button>
                        <button onClick={() => handleDelete(u.id)}
                          className="text-xs font-medium text-red-500 hover:text-red-700 cursor-pointer">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
          <p className="text-sm text-slate-400">
            Halaman <span className="font-semibold text-slate-600">{page}</span> dari {totalPages}
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            <Button variant="secondary" onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="text-xs px-3 py-1.5">
              ← Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
                acc.push(p)
                return acc
              }, [])
              .map((item, idx) =>
                item === '...' ? (
                  <span key={`e-${idx}`} className="px-2 py-1.5 text-sm text-slate-400">…</span>
                ) : (
                  <button key={item} onClick={() => setPage(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition ${
                      page === item
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}>
                    {item}
                  </button>
                )
              )}

            <Button variant="secondary" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className="text-xs px-3 py-1.5">
              Next →
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
