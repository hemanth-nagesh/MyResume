import { useState, useEffect } from 'react'

interface ExperienceFormData {
  title: string
  company: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

interface ExperienceFormProps {
  initial?: ExperienceFormData
  onSave: (data: ExperienceFormData) => void
  onCancel: () => void
}

const defaults: ExperienceFormData = {
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  current: false,
  description: [''],
}

export default function ExperienceForm({ initial, onSave, onCancel }: ExperienceFormProps) {
  const [form, setForm] = useState<ExperienceFormData>(initial || defaults)

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const handleChange = (field: keyof ExperienceFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleBulletChange = (index: number, value: string) => {
    const updated = [...form.description]
    updated[index] = value
    setForm((prev) => ({ ...prev, description: updated }))
  }

  const addBullet = () => {
    setForm((prev) => ({ ...prev, description: [...prev.description, ''] }))
  }

  const removeBullet = (index: number) => {
    setForm((prev) => ({ ...prev, description: prev.description.filter((_, i) => i !== index) }))
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
        <label>Company</label>
        <input value={form.company} onChange={(e) => handleChange('company', e.target.value)} required />
      </div>
      <div className="admin-form-group">
        <label>Start Date</label>
        <input type="date" value={form.startDate} onChange={(e) => handleChange('startDate', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label>
          <input
            type="checkbox"
            checked={form.current}
            onChange={(e) => handleChange('current', e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Current Position
        </label>
      </div>
      {!form.current && (
        <div className="admin-form-group">
          <label>End Date</label>
          <input type="date" value={form.endDate} onChange={(e) => handleChange('endDate', e.target.value)} />
        </div>
      )}
      <div className="admin-form-group">
        <label>Description Bullets</label>
        <div className="admin-inline-list">
          {form.description.map((bullet, i) => (
            <div key={i} className="admin-inline-item">
              <input value={bullet} onChange={(e) => handleBulletChange(i, e.target.value)} />
              <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removeBullet(i)}>
                <i className="bi bi-x" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addBullet}>
          + Add Bullet
        </button>
      </div>
      <div className="admin-modal-actions">
        <button type="submit" className="admin-btn admin-btn-primary">Save</button>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
