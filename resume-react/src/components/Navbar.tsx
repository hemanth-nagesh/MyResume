import { useState } from 'react'

interface NavbarProps {
  activeSection: string
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'bi-house' },
    { id: 'about', label: 'About', icon: 'bi-person' },
    { id: 'skills', label: 'Skills', icon: 'bi-lightning-charge' },
    { id: 'certifications', label: 'Certifications', icon: 'bi-patch-check' },
    { id: 'projects', label: 'Projects', icon: 'bi-folder2-open' },
    { id: 'resume', label: 'Resume', icon: 'bi-file-earmark-text' },
    { id: 'contact', label: 'Contact', icon: 'bi-envelope' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 20, behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      <nav className={`navbar ${isOpen ? 'open' : 'closed'}`} aria-label="Main navigation">
        {/* Brand */}
        <div className="nav-brand">
          <div className="nav-brand-avatar" aria-hidden="true">HN</div>
          <div>
            <div className="nav-brand-name">Hemanth Nagesh</div>
            <div className="nav-brand-role">AI Engineer</div>
          </div>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.id)}
                id={`nav-${item.id}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        id="navbar-toggle-btn"
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
      </button>
    </>
  )
}

export default Navbar
