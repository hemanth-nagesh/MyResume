import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'

export default function AdminApp() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <Routes>
      <Route path="login" element={user ? <Navigate to="/admin" replace /> : <AdminLogin />} />
      <Route path="/*" element={user ? <AdminLayout /> : <Navigate to="/admin/login" replace />} />
    </Routes>
  )
}
