import { useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp, writeBatch } from 'firebase/firestore'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { db } from '../../lib/firebase'
import { useCollection, useResumeUrl, Experience, Education } from '../../hooks/usePortfolioData'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import FileUpload from '../components/FileUpload'

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'pdf'>('experience')
  const [showExpForm, setShowExpForm] = useState(false)
  const [showEduForm, setShowEduForm] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [editingEdu, setEditingEdu] = useState<Education | null>(null)
  const resumeUrl = useResumeUrl()

  const { data: experience } = useCollection<Experience>('experience')
  const { data: education } = useCollection<Education>('education')

  const handleExpSave = async (data: {
    title: string; company: string; startDate: string; endDate: string; current: boolean; description: string[]
  }) => {
    const expData = {
      title: data.title,
      company: data.company,
      startDate: data.startDate ? Timestamp.fromDate(new Date(data.startDate)) : Timestamp.now(),
      endDate: data.current ? null : (data.endDate ? Timestamp.fromDate(new Date(data.endDate)) : null),
      description: data.description.filter(Boolean),
    }

    if (editingExp) {
      await updateDoc(doc(db, 'experience', editingExp.id), expData)
    } else {
      await addDoc(collection(db, 'experience'), { ...expData, order: experience.length })
    }
    setShowExpForm(false)
    setEditingExp(null)
  }

  const handleEduSave = async (data: { degree: string; institution: string; startYear: number; endYear: number; description: string }) => {
    if (editingEdu) {
      await updateDoc(doc(db, 'education', editingEdu.id), data)
    } else {
      await addDoc(collection(db, 'education'), { ...data, order: education.length })
    }
    setShowEduForm(false)
    setEditingEdu(null)
  }

  const handleDelete = async (collName: string, id: string) => {
    if (!confirm('Delete this entry?')) return
    await deleteDoc(doc(db, collName, id))
  }

  const handleExpDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(experience)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const batch = writeBatch(db)
    reordered.forEach((item, index) => {
      batch.update(doc(db, 'experience', item.id), { order: index })
    })
    await batch.commit()
  }

  const handleEduDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(education)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const batch = writeBatch(db)
    reordered.forEach((item, index) => {
      batch.update(doc(db, 'education', item.id), { order: index })
    })
    await batch.commit()
  }

  const handlePdfUploadComplete = async (url: string) => {
    await updateDoc(doc(db, 'resumeConfig', 'main'), { pdfUrl: url })
  }

  return (
    <div>
      <div className="admin-card">
        <h2>Resume</h2>
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
            Experience ({experience.length})
          </button>
          <button className={`admin-tab ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
            Education ({education.length})
          </button>
          <button className={`admin-tab ${activeTab === 'pdf' ? 'active' : ''}`} onClick={() => setActiveTab('pdf')}>
            PDF Resume
          </button>
        </div>
      </div>

      {activeTab === 'experience' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <button className="admin-btn admin-btn-primary" onClick={() => { setEditingExp(null); setShowExpForm(true) }}>
              <i className="bi bi-plus-lg" /> Add Experience
            </button>
          </div>
          <div className="admin-card">
            <DragDropContext onDragEnd={handleExpDragEnd}>
              <Droppable droppableId="exp-list">
                {(provided) => (
                  <table className="admin-table" ref={provided.innerRef} {...provided.droppableProps}>
                    <thead>
                      <tr>
                        <th style={{ width: '30px' }} />
                        <th>Title</th>
                        <th>Company</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experience.map((exp, i) => (
                        <Draggable key={exp.id} draggableId={exp.id} index={i}>
                          {(provided) => (
                            <tr ref={provided.innerRef} {...provided.draggableProps}>
                              <td><span className="admin-drag-handle" {...provided.dragHandleProps}><i className="bi bi-grip-vertical" /></span></td>
                              <td>{exp.title}</td>
                              <td style={{ color: '#6366f1' }}>{exp.company}</td>
                              <td>
                                <div className="admin-table-actions">
                                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setEditingExp(exp); setShowExpForm(true) }}>
                                    <i className="bi bi-pencil" />
                                  </button>
                                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete('experience', exp.id)}>
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
        </div>
      )}

      {activeTab === 'education' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <button className="admin-btn admin-btn-primary" onClick={() => { setEditingEdu(null); setShowEduForm(true) }}>
              <i className="bi bi-plus-lg" /> Add Education
            </button>
          </div>
          <div className="admin-card">
            <DragDropContext onDragEnd={handleEduDragEnd}>
              <Droppable droppableId="edu-list">
                {(provided) => (
                  <table className="admin-table" ref={provided.innerRef} {...provided.droppableProps}>
                    <thead>
                      <tr>
                        <th style={{ width: '30px' }} />
                        <th>Degree</th>
                        <th>Institution</th>
                        <th>Years</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {education.map((edu, i) => (
                        <Draggable key={edu.id} draggableId={edu.id} index={i}>
                          {(provided) => (
                            <tr ref={provided.innerRef} {...provided.draggableProps}>
                              <td><span className="admin-drag-handle" {...provided.dragHandleProps}><i className="bi bi-grip-vertical" /></span></td>
                              <td>{edu.degree}</td>
                              <td style={{ color: '#6366f1' }}>{edu.institution}</td>
                              <td>{edu.startYear} – {edu.endYear}</td>
                              <td>
                                <div className="admin-table-actions">
                                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setEditingEdu(edu); setShowEduForm(true) }}>
                                    <i className="bi bi-pencil" />
                                  </button>
                                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete('education', edu.id)}>
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
        </div>
      )}

      {activeTab === 'pdf' && (
        <div className="admin-card">
          <h3>Resume PDF</h3>
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase' }}>Current PDF:</strong>
            <br />
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontSize: '13px' }}>
              {resumeUrl}
            </a>
          </div>
          <div className="admin-form-group">
            <label>Upload New PDF (max 10MB)</label>
            <FileUpload
              storagePath="resume/latest.pdf"
              accept=".pdf"
              maxSizeMB={10}
              onUploadComplete={handlePdfUploadComplete}
              currentUrl={resumeUrl !== '/assets/E_Hemanth_Nagesh_2023.pdf' ? resumeUrl : undefined}
            />
          </div>
        </div>
      )}

      {showExpForm && (
        <div className="admin-modal-backdrop" onClick={() => { setShowExpForm(false); setEditingExp(null) }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingExp ? 'Edit Experience' : 'Add Experience'}</h2>
            <ExperienceForm
              initial={editingExp ? {
                title: editingExp.title,
                company: editingExp.company,
                startDate: editingExp.startDate ? new Date(editingExp.startDate.seconds * 1000).toISOString().split('T')[0] : '',
                endDate: editingExp.endDate ? new Date(editingExp.endDate.seconds * 1000).toISOString().split('T')[0] : '',
                current: editingExp.endDate === null,
                description: editingExp.description,
              } : undefined}
              onSave={handleExpSave}
              onCancel={() => { setShowExpForm(false); setEditingExp(null) }}
            />
          </div>
        </div>
      )}

      {showEduForm && (
        <div className="admin-modal-backdrop" onClick={() => { setShowEduForm(false); setEditingEdu(null) }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingEdu ? 'Edit Education' : 'Add Education'}</h2>
            <EducationForm
              initial={editingEdu ? {
                degree: editingEdu.degree,
                institution: editingEdu.institution,
                startYear: editingEdu.startYear,
                endYear: editingEdu.endYear,
                description: editingEdu.description,
              } : undefined}
              onSave={handleEduSave}
              onCancel={() => { setShowEduForm(false); setEditingEdu(null) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
