import { useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useCollection, Certification } from '../../hooks/usePortfolioData'

export default function CertsPage() {
  const { data: certs } = useCollection<Certification>('certifications')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Certification | null>(null)
  const [form, setForm] = useState({
    title: '', subtitle: '', issuer: '', date: '', icon: '🏅', link: '', type: 'certification' as 'certification' | 'publication',
  })

  const openAdd = (type: 'certification' | 'publication') => {
    setEditing(null)
    setForm({ title: '', subtitle: '', issuer: '', date: '', icon: type === 'certification' ? '🏅' : '📄', link: '', type })
    setShowForm(true)
  }

  const openEdit = (c: Certification) => {
    setEditing(c)
    setForm({
      title: c.title, subtitle: c.subtitle || '', issuer: c.issuer, date: c.date,
      icon: c.icon, link: c.link, type: c.type,
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (editing) {
      await updateDoc(doc(db, 'certifications', editing.id), { ...form, order: editing.order })
    } else {
      await addDoc(collection(db, 'certifications'), { ...form, order: certs.length })
    }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    await deleteDoc(doc(db, 'certifications', id))
  }

  return (
    <div>
      <div className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Certifications & Publications</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-primary" onClick={() => openAdd('certification')}>
            <i className="bi bi-plus-lg" /> Add Certification
          </button>
          <button className="admin-btn admin-btn-secondary" onClick={() => openAdd('publication')}>
            <i className="bi bi-plus-lg" /> Add Publication
          </button>
        </div>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Issuer</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c) => (
              <tr key={c.id}>
                <td style={{ fontSize: '20px' }}>{c.icon}</td>
                <td>{c.title}</td>
                <td style={{ color: '#6366f1' }}>{c.issuer}</td>
                <td>{c.type}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(c)}>
                      <i className="bi bi-pencil" />
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(c.id)}>
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit' : 'Add'} {form.type === 'certification' ? 'Certification' : 'Publication'}</h2>
            <div className="admin-form-group">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
            </div>
            <div className="admin-form-group">
              <label>Icon (emoji)</label>
              <input value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} />
            </div>
            <div className="admin-form-group">
              <label>Issuer / Publisher</label>
              <input value={form.issuer} onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))} required />
            </div>
            <div className="admin-form-group">
              <label>Date</label>
              <input value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
            </div>
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
            </div>
            <div className="admin-form-group">
              <label>Link</label>
              <input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} />
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button>
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
