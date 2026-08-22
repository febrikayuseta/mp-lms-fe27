import { Navigate } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // replace = tidak menumpuk history, jadi tombol back tak balik ke halaman privat
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
