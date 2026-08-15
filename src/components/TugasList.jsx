import TugasItem from './TugasItem'

function TugasList({ 
  tugas, 
  editId, 
  editTeks, 
  setEditTeks, 
  onEdit, 
  onSimpan, 
  onBatal, 
  onHapus 
}) {
  return (
    <ul className="space-y-3">
      {tugas.map((t) => (
        <TugasItem
          key={t.id}
          item={t}
          editId={editId}
          editTeks={editTeks}
          setEditTeks={setEditTeks}
          onEdit={onEdit}
          onSimpan={onSimpan}
          onBatal={onBatal}
          onHapus={onHapus}
        />
      ))}
    </ul>
  )
}

export default TugasList
