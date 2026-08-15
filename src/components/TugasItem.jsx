function TugasItem({
  item, 
  editId, 
  editTeks,
  setEditTeks, 
  onEdit, 
  onSimpan, 
  onBatal, 
  onHapus 
}) {
  const isEditing = editId === item.id

  return (
    <li className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 transition hover:shadow-md">
      {isEditing ? (
        <>
          <input
            value={editTeks}
            onChange={(e) => setEditTeks(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSimpan(item.id)}
            className="flex-1 px-3 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            autoFocus
          />
          <button
            onClick={() => onSimpan(item.id)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg cursor-pointer transition"
          >
            Simpan
          </button>
          <button
            onClick={onBatal}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-pointer transition"
          >
            Batal
          </button>
        </>
      ) : (
        <>
          <span className="flex-1 text-gray-700">{item.teks}</span> 
          <button
            onClick={() => onEdit(item)}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 text-sm font-medium rounded-lg cursor-pointer transition"
          >
            Edit
          </button>
          <button
            onClick={() => onHapus(item.id)}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium rounded-lg cursor-pointer transition"
          >
            Hapus
          </button>
        </>
      )}
    </li>
  )
}

export default TugasItem
