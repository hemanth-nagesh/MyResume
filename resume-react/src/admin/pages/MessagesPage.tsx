import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useCollection } from '../../hooks/usePortfolioData'
import { db } from '../../lib/firebase'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: { seconds: number } | null
  read: boolean
}

export default function MessagesPage() {
  const { data: messages } = useCollection<Message>('messages', 'timestamp')

  const sorted: Message[] = [...messages].sort((a, b) => {
    const ta = a.timestamp?.seconds || 0
    const tb = b.timestamp?.seconds || 0
    return tb - ta
  })

  const handleMarkRead = async (id: string) => {
    await updateDoc(doc(db, 'messages', id), { read: true })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await deleteDoc(doc(db, 'messages', id))
  }

  return (
    <div>
      <div className="admin-card">
        <h2>Messages ({messages.length})</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Contact form submissions from the public portfolio.</p>
      </div>

      <div className="admin-card">
        {sorted.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No messages yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => (
                <tr key={m.id} style={{ fontWeight: m.read ? 'normal' : 'bold' }}>
                  <td>{m.read ? '📖' : '🔵'}</td>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.subject}</td>
                  <td style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {m.timestamp ? new Date(m.timestamp.seconds * 1000).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      {!m.read && (
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleMarkRead(m.id)}>
                          Mark Read
                        </button>
                      )}
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(m.id)}>
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
