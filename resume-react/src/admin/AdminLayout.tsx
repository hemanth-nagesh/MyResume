import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import Dashboard from './pages/Dashboard'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ResumePage from './pages/ResumePage'
import ProfilePage from './pages/ProfilePage'
import CertsPage from './pages/CertsPage'
import MessagesPage from './pages/MessagesPage'

const navItems = [
  { path: '', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: 'projects', label: 'Projects', icon: 'bi-folder2-open' },
  { path: 'skills', label: 'Skills', icon: 'bi-lightning-charge' },
  { path: 'resume', label: 'Resume', icon: 'bi-file-earmark-text' },
  { path: 'profile', label: 'Profile', icon: 'bi-person-circle' },
  { path: 'certs', label: 'Certifications', icon: 'bi-patch-check' },
  { path: 'messages', label: 'Messages', icon: 'bi-chat-dots' },
]

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">Admin Portal</div>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              end={item.path === ''}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <i className={`bi ${item.icon}`} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={() => signOut(auth)} className="admin-logout">
          <i className="bi bi-box-arrow-left" /> Logout
        </button>
      </aside>
      <main className="admin-main">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="projects/*" element={<ProjectsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="certs" element={<CertsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}
