function AdminPanel() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl p-8 mb-6 text-center">
        <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
          🛡️
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Admin Panel</h1>
        <p className="text-blue-300 text-sm">
          Halaman ini hanya dapat diakses oleh user dengan role <span className="text-amber-400 font-semibold">admin</span>.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
        <h2 className="font-bold text-blue-700 mb-4">Akses Admin</h2>
        <ul className="space-y-3">
          {['Protected by ProtectedRoute (token required)', 'Protected by RoleRoute (role: admin required)', 'Redirect ke /dashboard jika bukan admin'].map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
              <span className="text-amber-500 font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel
