import { Navigate } from 'react-router-dom'

// Otorisasi: hanya role tertentu yang boleh akses
function RoleRoute({ role, izin, children }) {
  if (role !== izin) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

export default RoleRoute
