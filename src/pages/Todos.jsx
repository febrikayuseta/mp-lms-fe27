import { useState, useEffect } from 'react'

const BASE_URL = import.meta.env.VITE_API_URL
const LIMIT = 15

function Todos() {
  const [todos, setTodos] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState('')
  const [inputId, setInputId] = useState('')

  useEffect(() => {
    setLoading(true)
    const skip = (page - 1) * LIMIT
    const url = userId
      ? `${BASE_URL}/todos/user/${userId}?limit=${LIMIT}&skip=${skip}`
      : `${BASE_URL}/todos?limit=${LIMIT}&skip=${skip}`

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setTodos(json.todos || [])
        setTotal(json.total || 0)
        setLoading(false)
      })
  }, [page, userId])

  const totalPages = Math.ceil(total / LIMIT)

  function handleFilter(e) {
    e.preventDefault()
    setPage(1)
    setUserId(inputId.trim())
  }

  function handleReset() {
    setInputId('')
    setUserId('')
    setPage(1)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-blue-700">Daftar Tugas</h1>
        <p className="text-slate-400 text-sm mt-0.5">Total {total} tugas tersedia</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 mb-6">
        <form onSubmit={handleFilter} className="flex gap-3 items-end flex-wrap">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Filter by User ID</label>
            <input
              type="number"
              placeholder="Contoh: 1"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button type="submit"
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition cursor-pointer">
            Cari
          </button>
          {userId && (
            <button type="button" onClick={handleReset}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold rounded-xl transition cursor-pointer">
              Reset
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-3xl mb-3">⏳</p>
            <p className="text-sm">Memuat tugas...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-3xl mb-3">📭</p>
            <p className="text-sm">Tidak ada tugas ditemukan.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {todos.map((t) => (
              <li key={t.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  t.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {t.completed ? '✓' : '!'}
                </span>
                <span className={`flex-1 text-sm ${t.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {t.todo}
                </span>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  User #{t.userId}
                </span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                  t.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {t.completed ? 'Selesai' : 'Belum'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
          <p className="text-sm text-slate-400">
            Halaman <span className="font-semibold text-slate-600">{page}</span> dari {totalPages}
          </p>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
              className="px-4 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer transition">
              ← Prev
            </button>
            <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
              className="px-4 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer transition">
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Todos
