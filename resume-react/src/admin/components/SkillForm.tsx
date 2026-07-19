import { useState, useEffect } from 'react'

interface SkillFormData {
  name: string
  icon: string
  value: number
  category: string
}

interface SkillFormProps {
  initial?: SkillFormData
  onSave: (data: SkillFormData) => void
  onCancel: () => void
}

const defaults: SkillFormData = {
  name: '',
  icon: '🧠',
  value: 80,
  category: 'AI / LLM',
}

export default function SkillForm({ initial, onSave, onCancel }: SkillFormProps) {
  const [form, setForm] = useState<SkillFormData>(initial || defaults)

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const handleChange = (field: keyof SkillFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label>Name</label>
        <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>Icon (emoji)</label>
        <input value={form.icon} onChange={(e) => handleChange('icon', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>Category</label>
        <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
          <option>AI / LLM</option>
          <option>Backend</option>
          <option>Cloud & DevOps</option>
          <option>Frontend</option>
        </select>
      </div>
      <div className="admin-form-group">
        <label>Proficiency: {form.value}%</label>
        <input type="range" min="0" max="100" value={form.value} onChange={(e) => handleChange('value', Number(e.target.value))} style={{ width: '100%' }} />
      </div>
      <div className="admin-modal-actions">
        <button type="submit" className="admin-btn admin-btn-primary">Save</button>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
