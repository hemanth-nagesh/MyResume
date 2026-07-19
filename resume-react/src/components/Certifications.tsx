import { useCollection, Certification } from '../hooks/usePortfolioData'

const HARDCODED_CERTS = [
  {
    id: 'cert-azure',
    icon: '🏅',
    title: 'Microsoft Azure AI Engineer Associate',
    subtitle: 'AI-102 Certification',
    issuer: 'Microsoft',
    date: 'Issued 2024',
    link: '#',
    type: 'certification' as const,
    order: 0,
  },
  {
    id: 'pub-rag-2023',
    icon: '📄',
    title: 'AI-Powered Information Retrieval Systems',
    subtitle: 'Peer-reviewed research on semantic search, RAG techniques, and accessible AI interface design.',
    issuer: 'Academic Journal',
    date: 'Published 2023',
    link: '#',
    type: 'publication' as const,
    order: 1,
  },
]

const Certifications = () => {
  const { data: firestoreCerts } = useCollection<Certification>('certifications')

  const displayCerts = firestoreCerts.length > 0 ? firestoreCerts : HARDCODED_CERTS
  const certs = displayCerts.filter((c) => c.type === 'certification')
  const publications = displayCerts.filter((c) => c.type === 'publication')

  return (
    <section id="certifications">
      <div className="section-title">
        <span className="section-label">Achievements</span>
        <h2>Certifications &amp; Publications</h2>
        <p>
          Validated expertise through industry certifications and peer-reviewed
          academic research in AI and information retrieval systems.
        </p>
      </div>

      <div className="certs-grid">
        {certs.map((cert) => (
          <div key={cert.id} className="cert-card" id={cert.id}>
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-info">
              <h4>{cert.title}</h4>
              <div className="cert-issuer">{cert.issuer}{cert.subtitle ? ` · ${cert.subtitle}` : ''}</div>
              <div className="cert-date">{cert.date}</div>
              <a href={cert.link} className="cert-link" target="_blank" rel="noopener noreferrer">
                View Certificate <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
        ))}

        {publications.map((pub) => (
          <div key={pub.id} className="cert-card" id={pub.id}>
            <div className="cert-icon">{pub.icon}</div>
            <div className="cert-info">
              <h4>{pub.title}</h4>
              <div className="cert-issuer">{pub.issuer}</div>
              <div className="cert-date">{pub.date}</div>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '6px 0 12px', lineHeight: 1.5 }}>
                {pub.subtitle}
              </p>
              <a href={pub.link} className="cert-link" target="_blank" rel="noopener noreferrer">
                View Publication <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications
