// Halaman khusus admin — dilindungi ProtectedRoute + RoleRoute
function AdminPanel() {
  return (
    <div className="max-w-lg mx-auto text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Panel</h1>
      <p className="text-gray-500 text-lg">
        Halaman ini hanya bisa diakses oleh user dengan role admin.
      </p>
    </div>
  )
}

export default AdminPanel
