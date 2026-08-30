import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Button from '../components/Button'
import Card from '../components/Card'

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: user, loading } = useFetch(`/users/${id}`)

  if (loading) {
    return <p className="text-center text-gray-500 py-20">Memuat detail user...</p>
  }

  if (!user || user.message) {
    return <p className="text-center text-red-500 py-20">User tidak ditemukan.</p>
  }

  return (
    <div className="max-w-xl mx-auto">
      <Button variant="ghost" onClick={() => navigate('/users')} className="mb-6 text-blue-500">
        ← Kembali ke daftar user
      </Button>

      <Card>
        {/* Avatar & nama */}
        <div className="flex items-center gap-4 mb-6">
          {user.image && (
            <img
              src={user.image}
              alt={user.firstName}
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Info detail */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Telepon" value={user.phone} />
          <DetailRow label="Umur" value={`${user.age} tahun`} />
          <DetailRow label="Gender" value={user.gender} />
          <DetailRow label="Universitas" value={user.university} />
          <DetailRow
            label="Alamat"
            value={user.address ? `${user.address.city}, ${user.address.country}` : '-'}
          />
        </div>
      </Card>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-0.5">{label}</p>
      <p className="text-gray-700 font-medium">{value ?? '-'}</p>
    </div>
  )
}

export default UserDetail
