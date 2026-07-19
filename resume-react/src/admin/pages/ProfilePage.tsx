import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useProfile } from '../../hooks/usePortfolioData'
import FileUpload from '../components/FileUpload'

export default function ProfilePage() {
  const { profile } = useProfile()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    photoUrl: '',
  })

  const [loaded, setLoaded] = useState(false)

  if (profile && !loaded) {
    setForm({
      name: profile.name || '',
      title: profile.title || '',
      bio: profile.bio || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      github: profile.socialLinks?.github || '',
      linkedin: profile.socialLinks?.linkedin || '',
      twitter: profile.socialLinks?.twitter || '',
      instagram: profile.socialLinks?.instagram || '',
      photoUrl: profile.photoUrl || '',
    })
    setLoaded(true)
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await updateDoc(doc(db, 'profile', 'main'), {
      name: form.name,
      title: form.title,
      bio: form.bio,
      email: form.email,
      phone: form.phone,
      location: form.location,
      photoUrl: form.photoUrl,
      socialLinks: {
        github: form.github,
        linkedin: form.linkedin,
        twitter: form.twitter,
        instagram: form.instagram,
      },
    })
    setSaving(false)
    setMessage('Profile saved!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="admin-card">
        <h2>Profile</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Edit your public profile information and social links.</p>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div className="admin-form-group">
              <label>Name</label>
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Title</label>
              <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
            </div>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Bio</label>
              <textarea value={form.bio} onChange={(e) => handleChange('bio', e.target.value)} rows={3} required />
            </div>
            <div className="admin-form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Location</label>
              <input value={form.location} onChange={(e) => handleChange('location', e.target.value)} required />
            </div>
          </div>

          <h3 style={{ marginTop: '24px', marginBottom: '16px' }}>Photo</h3>
          <div className="admin-form-group">
            <label>Photo URL</label>
            <input value={form.photoUrl} onChange={(e) => handleChange('photoUrl', e.target.value)} placeholder="https://..." />
          </div>
          {form.photoUrl && (
            <img src={form.photoUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '16px', border: '2px solid rgba(255,255,255,0.08)' }} />
          )}
          <FileUpload
            storagePath="profile/photo.jpg"
            accept="image/*"
            onUploadComplete={(url) => handleChange('photoUrl', url)}
            currentUrl={form.photoUrl}
          />

          <h3 style={{ marginTop: '24px', marginBottom: '16px' }}>Social Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div className="admin-form-group">
              <label>GitHub</label>
              <input value={form.github} onChange={(e) => handleChange('github', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>LinkedIn</label>
              <input value={form.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Twitter</label>
              <input value={form.twitter} onChange={(e) => handleChange('twitter', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Instagram</label>
              <input value={form.instagram} onChange={(e) => handleChange('instagram', e.target.value)} />
            </div>
          </div>

          {message && <p style={{ color: '#10b981', fontSize: '13px', marginBottom: '12px' }}>{message}</p>}

          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ marginTop: '8px' }}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
