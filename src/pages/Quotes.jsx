import { useState, useEffect } from 'react'

const BASE_URL = import.meta.env.VITE_API_URL
const LIMIT = 12

function Quotes() {
  const [quotes, setQuotes] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const skip = (page - 1) * LIMIT
    fetch(`${BASE_URL}/quotes?limit=${LIMIT}&skip=${skip}`)
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json.quotes || [])
        setTotal(json.total || 0)
        setLoading(false)
      })
  }, [page])

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-blue-700">Bank Soal / Quiz</h1>
        <p className="text-slate-400 text-sm mt-0.5">Total {total} kutipan tersedia</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-3xl mb-3">⏳</p>
          <p className="text-sm">Memuat bank soal...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {quotes.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-blue-200 font-black leading-none">"</span>
                <p className="text-slate-700 text-sm leading-relaxed flex-1">{q.quote}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500">— {q.author}</span>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">#{q.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
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

export default Quotes
