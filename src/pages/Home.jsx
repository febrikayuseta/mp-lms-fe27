import { Link } from 'react-router-dom'

const features = [
  {
    icon: '👥',
    title: 'Manajemen User',
    desc: 'Kelola data siswa dan instruktur dengan fitur CRUD lengkap.',
  },
  {
    icon: '📋',
    title: 'Daftar Tugas',
    desc: 'Pantau dan kelola tugas harian dengan mudah di dashboard.',
  },
  {
    icon: '🔐',
    title: 'Akses Aman',
    desc: 'Sistem autentikasi dan otorisasi berbasis role untuk keamanan data.',
  },
]

function Home({ user }) {
  return (
    <div>
      <div className="bg-linear-to-br from-blue-600 to-blue-500 rounded-3xl mx-auto max-w-6xl px-8 py-20 text-center mb-12">
        <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
          Learning Management System
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          Kelola Pembelajaran<br />
          <span className="text-amber-400">Lebih Efisien</span>
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto mb-8">
          Platform digital untuk mengelola data siswa, tugas, dan materi pembelajaran dalam satu tempat.
        </p>
        {user ? (
          <Link
            to="/users"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-xl transition shadow-lg"
          >
            Lihat Data Users →
          </Link>
        ) : (
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/login"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-xl transition shadow-lg"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/about"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl transition"
            >
              Pelajari Lebih
            </Link>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        {[
          { value: '208+', label: 'Data User' },
          { value: '100%', label: 'Responsive' },
          { value: 'CRUD', label: 'Full API' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 text-center">
            <p className="text-3xl font-black text-blue-700">{s.value}</p>
            <p className="text-slate-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-8">Fitur Utama</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-blue-700 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
