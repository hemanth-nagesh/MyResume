import { useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { db } from '../../lib/firebase'
import { useCollection, Project } from '../../hooks/usePortfolioData'
import ProjectForm from '../components/ProjectForm'
import FileUpload from '../components/FileUpload'

export default function ProjectsPage() {
  const { data: projects } = useCollection<Project>('projects')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)

  const openAdd = () => {
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setShowForm(true)
  }

  const handleSave = async (data: {
    title: string; description: string; category: string; technologies: string;
    github: string; demo: string; featured: boolean
  }) => {
    const techArray = data.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    const projectData = {
      title: data.title,
      description: data.description,
      category: data.category,
      technologies: techArray,
      github: data.github,
      demo: data.demo,
      featured: data.featured,
      thumbnailUrl: editing?.thumbnailUrl || '',
    }

    if (editing) {
      await updateDoc(doc(db, 'projects', editing.id), projectData)
    } else {
      await addDoc(collection(db, 'projects'), { ...projectData, order: projects.length })
    }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await deleteDoc(doc(db, 'projects', id))
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(projects)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const batch = writeBatch(db)
    reordered.forEach((item, index) => {
      batch.update(doc(db, 'projects', item.id), { order: index })
    })
    await batch.commit()
  }

  return (
    <div>
      <div className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Projects</h2>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg" /> Add Project
        </button>
      </div>

      <div className="admin-card">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects-list">
            {(provided) => (
              <table className="admin-table" ref={provided.innerRef} {...provided.droppableProps}>
                <thead>
                  <tr>
                    <th style={{ width: '30px' }} />
                    <th>Title</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Thumbnail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, index) => (
                    <Draggable key={p.id} draggableId={p.id} index={index}>
                      {(provided) => (
                        <tr ref={provided.innerRef} {...provided.draggableProps}>
                          <td>
                            <span className="admin-drag-handle" {...provided.dragHandleProps}>
                              <i className="bi bi-grip-vertical" />
                            </span>
                          </td>
                          <td>{p.title}</td>
                          <td style={{ color: '#6366f1' }}>{p.category}</td>
                          <td>{p.featured ? '⭐' : '-'}</td>
                          <td>
                            {p.thumbnailUrl ? (
                              <img src={p.thumbnailUrl} alt="" style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />
                            ) : (
                              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setUploadingFor(p.id)}>
                                Upload
                              </button>
                            )}
                          </td>
                          <td>
                            <div className="admin-table-actions">
                              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(p)}>
                                <i className="bi bi-pencil" />
                              </button>
                              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(p.id)}>
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

      {uploadingFor && (
        <div className="admin-modal-backdrop" onClick={() => setUploadingFor(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Upload Thumbnail</h2>
            <FileUpload
              storagePath={`projects/${uploadingFor}/thumbnail.jpg`}
              accept="image/*"
              onUploadComplete={async (url) => {
                await updateDoc(doc(db, 'projects', uploadingFor), { thumbnailUrl: url })
                setUploadingFor(null)
              }}
            />
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setUploadingFor(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Project' : 'Add Project'}</h2>
            <ProjectForm
              initial={editing ? {
                title: editing.title,
                description: editing.description,
                category: editing.category,
                technologies: editing.technologies.join(', '),
                github: editing.github,
                demo: editing.demo,
                featured: editing.featured,
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
