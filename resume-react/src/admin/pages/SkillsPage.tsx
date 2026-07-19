import { useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { db } from '../../lib/firebase'
import { useCollection, Skill } from '../../hooks/usePortfolioData'
import SkillForm from '../components/SkillForm'

export default function SkillsPage() {
  const { data: skills } = useCollection<Skill>('skills')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)

  const openAdd = () => {
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (s: Skill) => {
    setEditing(s)
    setShowForm(true)
  }

  const handleSave = async (data: { name: string; icon: string; value: number; category: string }) => {
    if (editing) {
      await updateDoc(doc(db, 'skills', editing.id), data)
    } else {
      await addDoc(collection(db, 'skills'), { ...data, order: skills.length })
    }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    await deleteDoc(doc(db, 'skills', id))
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(skills)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const batch = writeBatch(db)
    reordered.forEach((item, index) => {
      batch.update(doc(db, 'skills', item.id), { order: index })
    })
    await batch.commit()
  }

  return (
    <div>
      <div className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Skills</h2>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg" /> Add Skill
        </button>
      </div>

      <div className="admin-card">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="skills-list">
            {(provided) => (
              <table className="admin-table" ref={provided.innerRef} {...provided.droppableProps}>
                <thead>
                  <tr>
                    <th style={{ width: '30px' }} />
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Proficiency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((s, index) => (
                    <Draggable key={s.id} draggableId={s.id} index={index}>
                      {(provided) => (
                        <tr ref={provided.innerRef} {...provided.draggableProps}>
                          <td>
                            <span className="admin-drag-handle" {...provided.dragHandleProps}>
                              <i className="bi bi-grip-vertical" />
                            </span>
                          </td>
                          <td style={{ fontSize: '20px' }}>{s.icon}</td>
                          <td>{s.name}</td>
                          <td style={{ color: '#6366f1' }}>{s.category}</td>
                          <td>{s.value}%</td>
                          <td>
                            <div className="admin-table-actions">
                              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(s)}>
                                <i className="bi bi-pencil" />
                              </button>
                              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s.id)}>
                                <i className="bi bi-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Skill' : 'Add Skill'}</h2>
            <SkillForm
              initial={editing ? {
                name: editing.name,
                icon: editing.icon,
                value: editing.value,
                category: editing.category,
              } : undefined}
              onSave={handleSave}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
