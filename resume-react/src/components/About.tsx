import { useEffect, useRef } from 'react'
import { calculateAge } from '../utils/dateUtils'
import { useResumeUrl, useProfile } from '../hooks/usePortfolioData'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const age = calculateAge()
  const resumeUrl = useResumeUrl()
  const { profile } = useProfile()

  const handleDownload = async () => {
    try {
      const response = await fetch(resumeUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Hemanth_Nagesh_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      window.open(resumeUrl, '_blank')
    }
  }

  const personalInfo = [
    { icon: 'bi-calendar', label: 'Birthday', value: '6 Sep 2000' },
    { icon: 'bi-person-badge', label: 'Age', value: `${age} years` },
    { icon: 'bi-geo-alt', label: 'City', value: profile?.location || 'Bangalore, India' },
    { icon: 'bi-mortarboard', label: 'Degree', value: 'MCA' },
    { icon: 'bi-envelope', label: 'Email', value: profile?.email || 'hemanthnagesh082@gmail.com' },
    { icon: 'bi-telephone', label: 'Phone', value: profile?.phone || '+91 9980 14 4503' },
  ]

  const displayName = profile?.name || 'Hemanth Nagesh E'
  const displayTitle = profile?.title || 'Software Engineer – Generative AI & Backend Systems'
  const displayBio = profile?.bio || 'Proficient in Python, LangChain, LangGraph, RAG architectures, prompt engineering, and vector databases — with hands-on experience integrating OpenAI APIs, Azure AI Foundry, and AWS Bedrock. Azure AI Engineer Certified.'
  const photoUrl = profile?.photoUrl || '/assets/profile-img.png'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="section-title reveal">
        <span className="section-label">Get to know me</span>
        <h2>About Me</h2>
        <p>
          Software Engineer with 2.5+ years of experience designing and deploying
          Generative AI and LLM-powered backend systems in enterprise settings.
        </p>
      </div>

      <div className="about-content">
        <div className="about-image reveal">
          <img src={photoUrl} alt={displayName} />
        </div>

        <div className="about-details">
          <h3 className="reveal">{displayTitle}</h3>

          <p className="intro reveal">
            {displayBio}
          </p>

          <div className="info-grid">
            {personalInfo.map((info, idx) => (
              <div key={idx} className={`info-item reveal reveal-delay-${(idx % 4) + 1}`}>
                <i className={`bi ${info.icon}`} />
                <span>
                  <strong>{info.label}:</strong>
                  {info.icon === 'bi-envelope'
                    ? <a href={`mailto:${info.value}`}>{info.value}</a>
                    : ` ${info.value}`
                  }
                </span>
              </div>
            ))}
          </div>

          <p className="reveal">
            Proven track record delivering measurable production outcomes in enterprise Generative AI
            systems. Experienced in multi-agent LLM backends, agentic systems using LangGraph,
            CI/CD-triggered RAG pipelines, and responsible AI practices — with additional research
            depth in accessible AI interfaces (WCAG, TCS Accessibility Team).
          </p>

          <button className="download-btn reveal" onClick={handleDownload} id="download-resume-btn">
            <i className="bi bi-download" />
            Download Resume
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
