import { useState } from 'react'
import TugasList from '../components/TugasList'

function Dashboard({ user }) {
  const [tugas, setTugas] = useState([
    { id: 1, teks: 'Belajar React' },
    { id: 2, teks: 'Ngoding CRUD' },
    { id: 3, teks: 'Review PR teman' },
  ])
  const [teks, setTeks] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTeks, setEditTeks] = useState('')

  function tambah() {
    if (!teks.trim()) { alert('Tugas tidak boleh kosong'); return }
    setTugas([...tugas, { id: Date.now(), teks }])
    setTeks('')
  }

  function mulaiEdit(item) { setEditId(item.id); setEditTeks(item.teks) }
  function simpanEdit(id) {
    setTugas(tugas.map((t) => (t.id === id ? { ...t, teks: editTeks } : t)))
    setEditId(null); setEditTeks('')
  }
  function hapus(id) { setTugas(tugas.filter((t) => t.id !== id)) }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Welcome banner */}
      <div className="bg-linear-to-r from-blue-900 to-blue-700 rounded-2xl p-6 mb-8 flex items-center justify-between">
        <div>
          <p className="text-blue-300 text-sm mb-1">Selamat datang,</p>
          <h1 className="text-2xl font-black text-white">{user?.username || user?.email}</h1>
        </div>
      </div>

      {/* Task input */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 mb-6">
        <h2 className="font-bold text-blue-900 mb-3">Tambah Tugas Baru</h2>
        <div className="flex gap-2">
          <input
            value={teks}
            onChange={(e) => setTeks(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tambah()}
            placeholder="Tulis tugas baru dan tekan Enter..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
          />
          <button
            onClick={tambah}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition cursor-pointer"
          >
            Tambah
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-blue-900">Daftar Tugas</h2>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {tugas.length} tugas
          </span>
        </div>

        {tugas.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">Belum ada tugas. Yuk tambah!</p>
          </div>
        ) : (
          <TugasList
            tugas={tugas}
            editId={editId}
            editTeks={editTeks}
            setEditTeks={setEditTeks}
            onEdit={mulaiEdit}
            onSimpan={simpanEdit}
            onBatal={() => setEditId(null)}
            onHapus={hapus}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
