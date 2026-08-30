import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Button from '../components/Button'
import Card from '../components/Card'

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
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    setLoading(true)
    const skip = (page - 1) * LIMIT
    fetch(`${BASE_URL}/users?limit=${LIMIT}&skip=${skip}`)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users)
        setTotal(json.total)
        setLoading(false)
      })
  }, [page])

  const totalPages = Math.ceil(total / LIMIT)

  async function handleAdd() {
    if (!firstName.trim() || !lastName.trim()) {
      alert('Nama depan dan belakang wajib diisi')
      return
    }
    try {
      const result = await post('/users/add', { firstName, lastName, age: Number(age) })
      setUsers([result, ...users])
      resetForm()
    } catch (err) {
      alert('Gagal menambah user: ' + err.message)
    }
  }

  function resetForm() {
    setEditId(null)
    setFirstName('')
    setLastName('')
    setAge('')
  }

  function startEdit(user) {
    setEditId(user.id)
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setAge(String(user.age))
  }

  async function handleUpdate() {
    try {
      const result = await put(`/users/${editId}`, { firstName, lastName, age: Number(age) })
      setUsers(users.map((u) => (u.id === editId ? result : u)))
      resetForm()
    } catch (err) {
      alert('Gagal mengupdate user: ' + err.message)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus user ini?')) return
    try {
      await del(`/users/${id}`)
      setUsers(users.filter((u) => u.id !== id))
    } catch (err) {
      alert('Gagal menghapus user: ' + err.message)
    }
  }

  if (loading) {
    return <p className="text-center text-gray-500 py-20">Memuat data user...</p>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Data Users (DummyJSON API)
      </h1>

      {/* FORM: CREATE / UPDATE */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {editId ? 'Edit User' : 'Tambah User Baru'}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-2">
            {editId ? (
              <>
                <Button variant="success" onClick={handleUpdate}>Simpan</Button>
                <Button variant="secondary" onClick={resetForm}>Batal</Button>
              </>
            ) : (
              <Button onClick={handleAdd}>Tambah</Button>
            )}
          </div>
        </div>
      </Card>

      {/* TABLE */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nama</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Umur</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{u.firstName} {u.lastName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                <td className="px-4 py-3 text-sm">{u.age}</td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <button
                    onClick={() => navigate(`/users/${u.id}`)}
                    className="text-indigo-500 hover:underline cursor-pointer"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => startEdit(u)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-400">
          Halaman {page} dari {totalPages} &bull; Total {total} user
        </p>
        <div className="flex gap-1">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
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
                <span key={`ellipsis-${idx}`} className="px-3 py-1 text-sm text-gray-400">…</span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`px-3 py-1 rounded-lg text-sm border cursor-pointer ${
                    page === item
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              )
            )}

          <Button
            variant="secondary"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Users
