import { useState, useEffect } from 'react'

interface ProjectFormData {
  title: string
  description: string
  category: string
  technologies: string
  github: string
  demo: string
  featured: boolean
}

interface ProjectFormProps {
  initial?: ProjectFormData
  onSave: (data: ProjectFormData) => void
  onCancel: () => void
}

const defaults: ProjectFormData = {
  title: '',
  description: '',
  category: 'Agentic',
  technologies: '',
  github: '',
  demo: '',
  featured: false,
}

export default function ProjectForm({ initial, onSave, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>(initial || defaults)

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const handleChange = (field: keyof ProjectFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label>Title</label>
        <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>Category</label>
        <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
          <option>Agentic</option>
          <option>RAG</option>
          <option>Accessibility</option>
          <option>LLM Platform</option>
          <option>Other</option>
        </select>
      </div>
      <div className="admin-form-group">
        <label>Description</label>
        <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} required rows={4} />
      </div>
      <div className="admin-form-group">
        <label>Technologies (comma-separated)</label>
        <input value={form.technologies} onChange={(e) => handleChange('technologies', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>GitHub URL</label>
        <input value={form.github} onChange={(e) => handleChange('github', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label>Demo URL</label>
        <input value={form.demo} onChange={(e) => handleChange('demo', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Featured
        </label>
      </div>
      <div className="admin-modal-actions">
        <button type="submit" className="admin-btn admin-btn-primary">Save</button>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
