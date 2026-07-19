import { useCollection, Project, Skill, Experience, Education, Certification } from '../../hooks/usePortfolioData'

export default function Dashboard() {
  const { data: projects } = useCollection<Project>('projects')
  const { data: skills } = useCollection<Skill>('skills')
  const { data: experience } = useCollection<Experience>('experience')
  const { data: education } = useCollection<Education>('education')
  const { data: certs } = useCollection<Certification>('certifications')

  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Skills', value: skills.length },
    { label: 'Experience', value: experience.length },
    { label: 'Education', value: education.length },
    { label: 'Certifications', value: certs.length },
  ]

  return (
    <div>
      <div className="admin-card">
        <h2>Dashboard</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Overview of your portfolio content. Changes made here reflect instantly on the public site.
        </p>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>Quick Guide</h3>
        <ul style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '2', paddingLeft: '20px' }}>
          <li><strong>Projects</strong> — Add, edit, delete projects. Drag to reorder.</li>
          <li><strong>Skills</strong> — Manage skill cards with proficiency levels.</li>
          <li><strong>Resume</strong> — Edit experience, education entries, and upload resume PDF.</li>
          <li><strong>Profile</strong> — Update your photo, name, bio, and social links.</li>
          <li><strong>Certifications</strong> — Add certifications and publications.</li>
          <li><strong>Messages</strong> — View contact form submissions.</li>
        </ul>
      </div>
    </div>
  )
}
