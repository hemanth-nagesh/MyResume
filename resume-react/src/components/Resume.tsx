import { useState } from 'react'
import { calculateTCSTenure, formatMonthYear } from '../utils/dateUtils'
import { useCollection, useResumeUrl, Experience, Education } from '../hooks/usePortfolioData'

const HARDCODED_EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    startYear: 2021,
    endYear: 2023,
    institution: 'PES College of Engineering, Mandya',
    description: 'Graduated with a strong foundation in advanced computing, software development, and AI. Focused on machine learning, data science, and distributed systems.',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    startYear: 2018,
    endYear: 2021,
    institution: 'Ramaiah Institute of Business Studies, Bangalore',
    description: 'Built a solid foundation in computer science fundamentals, programming, and software engineering principles. Developed strong analytical and problem-solving skills.',
  },
]

const HARDCODED_EXPERIENCE = [
  {
    title: 'Software Engineer – Generative AI & Agentic Systems',
    company: 'Tata Consultancy Services (TCS)',
    startDate: new Date('2023-12-01'),
    endDate: null,
    description: [
      'Designed and deployed a production-grade multi-agent LLM backend using LangGraph and LangChain, reducing system execution time by 70% through parallel tool-calling, fault-tolerant retry logic, and circuit breakers across distributed microservices.',
      'Built a vector-indexed agent routing registry that eliminated 30% of workflow faults by replacing hardcoded dispatch logic with semantic capability matching — directly improving service quality in a globally distributed Agile team.',
      'Engineered a CI/CD-triggered RAG ingestion pipeline integrating document chunking, embedding generation, and vector database indexing — automating document processing with zero manual intervention.',
      'Collaborated with TCS Accessibility Research Team to develop and ship a WCAG-compliant voice agent, applying prompt engineering and NLP techniques to create accessible AI interfaces for users with disabilities.',
      'Implemented a Human-in-the-Loop (HITL) checkpoint system and an autonomous browser automation agent, both shipped through structured code review cycles and quality gates aligned with responsible AI and security best practices.',
    ],
  },
  {
    title: 'Software Engineer Intern – LLM Applications',
    company: 'BOTSIO Chatbot LLP',
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-05-31'),
    description: [
      'Implemented backend semantic retrieval pipelines — embedding generation, vector indexing, and similarity search — to ground production chatbot responses in verified knowledge sources.',
      'Debugged and resolved latency and correctness issues in deployed AI microservices integrated with PostgreSQL; contributed prompt engineering improvements adopted across subsequent model releases.',
    ],
  },
]

const Resume = () => {
  const [expandedEdu, setExpandedEdu] = useState<number | null>(0)
  const [expandedExp, setExpandedExp] = useState<number | null>(0)

  const tcsTenure = calculateTCSTenure()
  const resumeUrl = useResumeUrl()
  const { data: firestoreExp } = useCollection<Experience>('experience')
  const { data: firestoreEdu } = useCollection<Education>('education')

  const displayExperience = firestoreExp.length > 0
    ? firestoreExp.map((exp) => ({
        ...exp,
        startDate: new Date(exp.startDate.seconds * 1000),
        endDate: exp.endDate ? new Date(exp.endDate.seconds * 1000) : null,
      }))
    : HARDCODED_EXPERIENCE

  const displayEducation = firestoreEdu.length > 0
    ? firestoreEdu
    : HARDCODED_EDUCATION

  const toggle = (
    idx: number,
    expanded: number | null,
    setExpanded: (v: number | null) => void
  ) => {
    setExpanded(expanded === idx ? null : idx)
  }

  return (
    <section id="resume">
      <div className="section-title">
        <span className="section-label">My journey</span>
        <h2>Resume</h2>
        <p>
          2.5+ years engineering production-grade Generative AI and LLM-powered backend
          systems — from multi-agent orchestration and RAG pipelines to accessible AI
          interfaces and enterprise cloud deployments. Azure AI Engineer Certified.
        </p>
      </div>

      <div className="resume-grid">
        <div>
          <div className="resume-section-title">
            <i className="bi bi-mortarboard" aria-hidden="true" />
            Education
          </div>
          <div className="timeline">
            {displayEducation.map((edu, idx) => (
              <div
                key={idx}
                className={`timeline-item ${expandedEdu === idx ? 'expanded' : ''}`}
              >
                <div className="timeline-dot" />
                <div
                  className="timeline-header"
                  onClick={() => toggle(idx, expandedEdu, setExpandedEdu)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedEdu === idx}
                  id={`edu-entry-${idx}`}
                  onKeyDown={(e) => e.key === 'Enter' && toggle(idx, expandedEdu, setExpandedEdu)}
                >
                  <div className="timeline-header-left">
                    <h4>{edu.degree}</h4>
                    <div className="company">{edu.institution}</div>
                    <div className="period">{edu.startYear} – {edu.endYear}</div>
                  </div>
                  <div className="timeline-toggle">
                    <i className="bi bi-chevron-down" />
                  </div>
                </div>
                <div className="timeline-body">
                  <div className="timeline-body-inner">
                    <p>{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="resume-section-title">
            <i className="bi bi-briefcase" aria-hidden="true" />
            Experience
          </div>
          <div className="timeline">
            {displayExperience.map((exp, idx) => {
              const periodStr = exp.endDate
                ? `${formatMonthYear(exp.startDate)} – ${formatMonthYear(exp.endDate)}`
                : `Dec 2023 – Present · ${tcsTenure.label}`

              return (
                <div
                  key={idx}
                  className={`timeline-item ${expandedExp === idx ? 'expanded' : ''}`}
                >
                  <div className="timeline-dot" />
                  <div
                    className="timeline-header"
                    onClick={() => toggle(idx, expandedExp, setExpandedExp)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedExp === idx}
                    id={`exp-entry-${idx}`}
                    onKeyDown={(e) => e.key === 'Enter' && toggle(idx, expandedExp, setExpandedExp)}
                  >
                    <div className="timeline-header-left">
                      <h4>{exp.title}</h4>
                      <div className="company">{exp.company}</div>
                      <div className="period">{periodStr}</div>
                    </div>
                    <div className="timeline-toggle">
                      <i className="bi bi-chevron-down" />
                    </div>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-body-inner">
                      <ul>
                        {exp.description.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button className="download-btn" onClick={async () => {
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
        }} id="download-resume-btn">
          <i className="bi bi-download" />
          Download Resume
        </button>
      </div>
    </section>
  )
}

export default Resume
