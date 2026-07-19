import { useState } from 'react'

interface FileUploadProps {
  storagePath: string
  accept: string
  maxSizeMB?: number
  onUploadComplete: (url: string) => void
  currentUrl?: string
}

export default function FileUpload({ accept, maxSizeMB = 5, onUploadComplete, currentUrl }: FileUploadProps) {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Max ${maxSizeMB}MB.`)
      return
    }

    setError('')
    setUploading(true)

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      setError('Cloudinary configuration is missing in .env.local')
      setUploading(false)
      return
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    xhr.open('POST', url, true)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 100)
      }
    }

    xhr.onload = () => {
      setUploading(false)
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        setProgress(0)
        onUploadComplete(response.secure_url)
      } else {
        const response = JSON.parse(xhr.responseText)
        setError(response.error?.message || 'Upload failed.')
      }
    }

    xhr.onerror = () => {
      setUploading(false)
      setError('Network error occurred during upload.')
    }

    xhr.send(formData)
  }

  return (
    <div>
      {currentUrl && (
        <div style={{ marginBottom: '10px' }}>
          {currentUrl.endsWith('.pdf') ? (
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none' }}>
              <i className="bi bi-file-earmark-pdf" style={{ marginRight: '6px' }} /> View Current PDF
            </a>
          ) : (
            <img
              src={currentUrl}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          )}
        </div>
      )}
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        className="admin-input"
      />
      {uploading && (
        <div style={{ marginTop: '8px' }}>
          <div style={{ height: '4px', background: '#1a1a2e', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '2px',
                transition: 'width 0.2s',
              }}
            />
          </div>
          <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
      {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{error}</p>}
    </div>
  )
}
