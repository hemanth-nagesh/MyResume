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
    { id: 'projects', label: 'Projects', icon: 'bi-folder' },
    { id: 'resume', label: 'Resume', icon: 'bi-file-earmark-text' },
    { id: 'contact', label: 'Contact', icon: 'bi-envelope' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 20
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
      setIsOpen(false)
    }
  }

  return (
    <>
      <nav className={`navbar ${isOpen ? 'open' : 'closed'}`}>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
      </button>
    </>
  )
}

export default Navbar
