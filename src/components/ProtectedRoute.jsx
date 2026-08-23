import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('user')

  if (!token) {
    // Tidak ada data user di localStorage = belum login
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
