import { useState, useEffect } from 'react'
import { calculateTotalExperience } from '../utils/dateUtils'

const Hero = () => {
  const roles = [
    'AI Engineer',
    'Backend Engineer - GenAI',
    'LLM Backend Engineer',
    'RAG Architect',
    'AI Product Builder'
  ]
  const [currentRole, setCurrentRole] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  const exp = calculateTotalExperience()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && index <= roles[currentRole].length) {
        setText(roles[currentRole].slice(0, index))
        setIndex(index + 1)
      } else if (isDeleting && index >= 0) {
        setText(roles[currentRole].slice(0, index))
        setIndex(index - 1)
      } else if (!isDeleting && index > roles[currentRole].length) {
        setTimeout(() => setIsDeleting(true), 2200)
      } else if (isDeleting && index < 0) {
        setIsDeleting(false)
        setCurrentRole((currentRole + 1) % roles.length)
        setIndex(0)
      }
    }, isDeleting ? 45 : 95)

    return () => clearTimeout(timeout)
  }, [index, isDeleting, currentRole])

  // Animated counter hook
  const useCounter = (target: number, duration = 1200) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      const step = target / (duration / 16)
      let current = 0
      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)
      return () => clearInterval(timer)
    }, [target, duration])

    return count
  }

  const expYears = useCounter(exp.years, 1000)
  const projectCount = useCounter(5, 800)

  const socialLinks = [
    { name: 'Twitter / X', icon: 'bi-twitter-x', url: 'https://x.com/Nageshehemanth' },
    { name: 'GitHub', icon: 'bi-github', url: 'https://github.com/hemanth-nagesh' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://www.instagram.com/__hemanth__beast_/' },
    { name: 'LinkedIn', icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7' },
  ]

  return (
    <section id="hero" className="hero">
      {/* Animated backgrounds */}
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="hero-content">
        {/* Open to Work badge */}
        <div className="open-to-work">
          <span className="open-to-work-dot" />
          Open to Work
        </div>

        {/* Profile photo */}
        <div className="hero-avatar">
          <img src="/assets/profile-img.png" alt="Hemanth Nagesh" />
        </div>

        <h1>Hemanth Nagesh E</h1>

        <p className="role">
          I'm <span className="typed">{text || roles[0]}</span>
          <span className="cursor" aria-hidden="true" />
        </p>

        {/* Stats row */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{expYears}+ yrs</div>
            <div className="hero-stat-label">Experience</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{projectCount}</div>
            <div className="hero-stat-label">Projects</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">Azure</div>
            <div className="hero-stat-label">Certified</div>
          </div>
        </div>

        {/* Social links */}
        <div className="social-links">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <i className={`bi ${social.icon}`} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}

export default Hero
