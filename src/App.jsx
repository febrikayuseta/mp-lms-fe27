import { useState } from 'react'
import TugasList from './components/TugasList'

function App() {
  const [tugas, setTugas] = useState([
    { id: 1, teks: 'Belajar React' },
    { id: 2, teks: 'Ngoding CRUD' },
    { id: 3, teks: 'Ngoding CRUD' },
  ])

  const [teks, setTeks] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTeks, setEditTeks] = useState('')

  function tambah() {
    if (teks.trim() === '') {
      alert('Tugas tidak boleh kosong')
      return;
    }
    
    // shorthand js
    // const baru = { id: Date.now(), teks }
    
    const baru = { id: Date.now(), teks: teks }
    setTugas([...tugas ,baru])

    // alurnya spt ini
    // setTugas([
    //   { id: 1, teks: 'Belajar React' },
    //   { id: 2, teks: 'Ngoding CRUD' },
    //   { id: 3, teks: 'Ngoding CRUD' },
    //   { id: Date.now(), teks: teks }
    // ])

    setTeks('')
  }

  function mulaiEdit(item) {
    setEditId(item.id)
    setEditTeks(item.teks)
  }

  function simpanEdit(id) {
    console.log(id, editTeks)
    setTugas(
      tugas.map((t) => (t.id === id ? { ...t, teks: editTeks } : t))
    )
    {/* 
      alur flow:
      1. tugas di jejerin:
       a. { id: 1, teks: 'Belajar React' },
       b. { id: 2, teks: 'Ngoding CRUD' },
       c. { id: 3, teks: 'Ngoding CRUD' },
      2. cek id masing", 1,2,3
      3. id = 1, apakah sama dengan t.id
      4. ketika sama maka objectnya di replace dengan data baru
         { ...t, teks: editTeks } 
      5. kalau engga ketemu maka dia dibiarin aja
      6. kalau udah di set ke tugas
    ) */}
    setEditId(null)
    setEditTeks('')
  }

  function hapus(id) {
    setTugas(tugas.filter((t) => t.id !== id))
    {/* 
      alur flow:
      1. kirim parameter id 1
      2. tugas difilter yang mana yg bukan id 1
      3. dua data, id 2 dan id 3
      4. kalau udah di set ke tugas
    ) */}
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Daftar Tugas
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Kelola tugas harianmu dengan mudah
        </p>

        {/* CREATE */}
        <div className="flex gap-2 mb-6">
          <input
            value={teks}
            onChange={(e) => setTeks(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tambah()}
            placeholder="Tulis tugas baru..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          <button
            onClick={tambah}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-sm cursor-pointer transition"
          >
            Tambah
          </button>
        </div>

        {/* READ + UPDATE + DELETE */}
        {tugas.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            Belum ada tugas. Yuk tambah!
          </p>
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

        <p className="text-center text-sm text-gray-400 mt-8">
          {tugas.length} tugas tercatat
        </p>
      </div>
    </div>
  )
}

export default App
