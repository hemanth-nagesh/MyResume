import { useState, useEffect } from 'react'

interface EducationFormData {
  degree: string
  institution: string
  startYear: number
  endYear: number
  description: string
}

interface EducationFormProps {
  initial?: EducationFormData
  onSave: (data: EducationFormData) => void
  onCancel: () => void
}

const defaults: EducationFormData = {
  degree: '',
  institution: '',
  startYear: 2020,
  endYear: 2024,
  description: '',
}

export default function EducationForm({ initial, onSave, onCancel }: EducationFormProps) {
  const [form, setForm] = useState<EducationFormData>(initial || defaults)

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const handleChange = (field: keyof EducationFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label>Degree</label>
        <input value={form.degree} onChange={(e) => handleChange('degree', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>Institution</label>
        <input value={form.institution} onChange={(e) => handleChange('institution', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>Start Year</label>
        <input type="number" value={form.startYear} onChange={(e) => handleChange('startYear', Number(e.target.value))} />
      </div>
      <div className="admin-form-group">
        <label>End Year</label>
        <input type="number" value={form.endYear} onChange={(e) => handleChange('endYear', Number(e.target.value))} />
      </div>
      <div className="admin-form-group">
        <label>Description</label>
        <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} />
      </div>
      <div className="admin-modal-actions">
        <button type="submit" className="admin-btn admin-btn-primary">Save</button>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
