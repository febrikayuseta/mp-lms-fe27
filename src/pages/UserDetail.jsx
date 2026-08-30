import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: user, loading } = useFetch(`/users/${id}`)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 text-slate-400">
        <p className="text-4xl mb-3">⏳</p>
        <p className="text-sm">Memuat detail user...</p>
      </div>
    )
  }

  if (!user || user.message) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 text-slate-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-sm">User tidak ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/users')}
        className="flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline mb-6 cursor-pointer"
      >
        ← Kembali ke daftar user
      </button>

      {/* Profile header */}
      <div className="bg-linear-to-r from-blue-900 to-blue-700 rounded-t-2xl p-8 flex items-center gap-6">
        {user.image ? (
          <img src={user.image} alt={user.firstName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-lg" />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black text-white">
            {user.firstName?.[0]}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-black text-white">{user.firstName} {user.lastName}</h1>
          <p className="text-blue-300 text-sm mt-0.5">@{user.username}</p>
          <span className="inline-block mt-2 bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
            {user.role ?? 'user'}
          </span>
        </div>
      </div>

      {/* Info grid */}
      <div className="bg-white rounded-b-2xl shadow-md border border-slate-100 border-t-0 p-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Telepon" value={user.phone} />
          <InfoRow label="Umur" value={user.age ? `${user.age} tahun` : null} />
          <InfoRow label="Gender" value={user.gender} />
          <InfoRow label="Universitas" value={user.university} />
          <InfoRow
            label="Alamat"
            value={user.address ? `${user.address.city}, ${user.address.country}` : null}
          />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-slate-700 font-medium text-sm">{value ?? '—'}</p>
    </div>
  )
}

export default UserDetail
