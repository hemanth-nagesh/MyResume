import { useState, useEffect } from 'react'

const Hero = () => {
  const roles = ['AI Engineer', 'AI Developer', 'Software Engineer AI', 'AI/ML Engineer']
  const [currentRole, setCurrentRole] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && index <= roles[currentRole].length) {
        setText(roles[currentRole].slice(0, index))
        setIndex(index + 1)
      } else if (isDeleting && index >= 0) {
        setText(roles[currentRole].slice(0, index))
        setIndex(index - 1)
      } else if (!isDeleting && index > roles[currentRole].length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index < 0) {
        setIsDeleting(false)
        setCurrentRole((currentRole + 1) % roles.length)
        setIndex(0)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [index, isDeleting, currentRole])

  const socialLinks = [
    { name: 'Twitter', icon: 'bi-twitter-x', url: 'https://x.com/Nageshehemanth' },
    { name: 'GitHub', icon: 'bi-github', url: 'https://github.com/hemanth-nagesh' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://www.instagram.com/__hemanth__beast_/' },
    { name: 'LinkedIn', icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7' },
  ]

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Hemanth Nagesh E</h1>
        <p className="role">
          I'm <span>{text || roles[0]}</span>
          <span className="cursor">|</span>
        </p>
        <div className="social-links">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <i className={`bi ${social.icon}`}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
