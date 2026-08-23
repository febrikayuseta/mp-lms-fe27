import { useState } from 'react'
import useFetch from '../hooks/useFetch'

function Users() {
  const { data, loading, post } = useFetch('/users?limit=10')
  const [users, setUsers] = useState([])
  const [ready, setReady] = useState(false)

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [editId, setEditId] = useState(null)

  // Sinkronkan data dari useFetch ke state lokal (sekali saja)
  if (data && !ready) {
    setUsers(data.users)
    setReady(true)
  }

  // CREATE
  async function handleAdd() {
    if (!firstName.trim() || !lastName.trim()) {
      alert('Nama depan dan belakang wajib diisi')
      return
    }

    try {
      const result = await post('/users/add', {
        firstName,
        lastName,
        age: Number(age),
      })

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

  if (loading) {
    return <p className="text-center text-gray-500 py-20">Memuat data user...</p>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Data Users (DummyJSON API)
      </h1>

      {/* FORM: CREATE / UPDATE */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
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
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer"
                >
                  Simpan
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"
              >
                Tambah
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE: READ + DELETE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nama</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Umur</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{u.firstName} {u.lastName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                <td className="px-4 py-3 text-sm">{u.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        Total: {users.length} user
      </p>
    </div>
  )
}

export default Users
