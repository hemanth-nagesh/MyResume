import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCollection, Project } from '../hooks/usePortfolioData'

const HARDCODED_PROJECTS = [
  {
    id: '1',
    title: 'Multi-Agentic AI System',
    description: 'Architected autonomous multi-agent system using LangChain and LangGraph for travel and retail automation. Implemented A2A coordination workflows, STM/LTM memory with PostgreSQL vector search, Mem0-based user profiling, and Deep Research Agent for real-time web data retrieval.',
    thumbnailUrl: '/assets/project_id1.png',
    technologies: ['LangChain', 'LangGraph', 'PostgreSQL', 'Vector DB', 'Mem0', 'Python'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'Agentic',
    featured: true,
    order: 0,
  },
  {
    id: '2',
    title: 'DocuBot — Agentic RAG System',
    description: 'Built AI-powered document intelligence system using LLMs and Agentic RAG for intelligent Q&A across PDF, DOCX, and TXT files. Implemented multi-vector database retrieval with dynamic query routing, prompt engineering, and contextual templates for enterprise knowledge extraction.',
    thumbnailUrl: '/assets/project_id2.png',
    technologies: ['LLM', 'RAG', 'Vector DB', 'LangChain', 'NLP', 'Python'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'RAG',
    featured: false,
    order: 1,
  },
  {
    id: '3',
    title: 'Web Accessibility AI Solution',
    description: 'Led a project utilizing Google Gemini AI to convert inaccessible images on websites into accessible formats, significantly improving web accessibility for visually impaired users. Demonstrated strong problem-solving skills and applied AI for social good.',
    thumbnailUrl: '/assets/project_id3.png',
    technologies: ['Google Gemini', 'Computer Vision', 'AI/ML', 'Python', 'WCAG'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'Accessibility',
    featured: false,
    order: 2,
  },
  {
    id: '4',
    title: 'DocuBot Intelligent Chatbot',
    description: 'Designed an interactive chatbot enabling admins to upload relevant documents for customer interaction. Leveraged OpenAI for natural language understanding and built a user-friendly interface using Streamlit with backend semantic retrieval.',
    thumbnailUrl: '/assets/project_id4.png',
    technologies: ['OpenAI API', 'Streamlit', 'Python', 'NLP', 'RAG'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'RAG',
    featured: false,
    order: 3,
  },
  {
    id: '5',
    title: 'LLM Fine-tuning Platform',
    description: 'Experienced in fine-tuning large language models for specific domain use cases, leveraging RNI containers for GPU-accelerated training and optimization. Successfully delivered domain-specific AI solutions with improved accuracy.',
    thumbnailUrl: '/assets/project_id5.png',
    technologies: ['PyTorch', 'Transformers', 'GPU Computing', 'NLP', 'Python'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'LLM Platform',
    featured: false,
    order: 4,
  },
]

type FilterType = 'All' | 'Agentic' | 'RAG' | 'Accessibility' | 'LLM Platform'
const FILTERS: FilterType[] = ['All', 'Agentic', 'RAG', 'Accessibility', 'LLM Platform']

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const tiltRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const { data: firestoreProjects } = useCollection<Project>('projects')

  const displayProjects: Project[] = firestoreProjects.length > 0 ? firestoreProjects : HARDCODED_PROJECTS

  const filtered =
    activeFilter === 'All'
      ? displayProjects
      : displayProjects.filter((p) => p.category === activeFilter)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = tiltRefs.current[id]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -6
    const rotY = ((x - cx) / cx) * 6
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`
  }

  const handleMouseLeave = (id: string) => {
    const card = tiltRefs.current[id]
    if (card) card.style.transform = ''
  }

  return (
    <section id="projects">
      <div className="section-title">
        <span className="section-label">What I've built</span>
        <h2>Projects</h2>
        <p>
          Showcasing innovative AI/ML solutions and data-driven applications
          that solve real-world challenges.
        </p>
      </div>

      <div className="projects-filter" role="group" aria-label="Project categories">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
            id={`project-filter-${f.replace(/\s/g, '-').toLowerCase()}`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="project-card"
              ref={(el) => { tiltRefs.current[project.id] = el }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              id={`project-card-${project.id}`}
            >
              {project.featured && (
                <span className="project-featured-badge">⭐ Featured</span>
              )}

              <div className="project-image">
                <img src={project.thumbnailUrl} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Code on GitHub"
                      >
                        <i className="bi bi-github" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Live Demo"
                      >
                        <i className="bi bi-link-45deg" />
                      </a>
                    )}
                  </div>
                  <button className="view-details-btn" onClick={() => setSelectedProject(project)}>
                    View Details
                  </button>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-badges">
                  {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-badge">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            id="project-modal"
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-image">
                <img src={selectedProject.thumbnailUrl} alt={selectedProject.title} />
                <div className="modal-image-overlay" />
              </div>

              <div className="modal-body">
                <div className="modal-header">
                  <h3>{selectedProject.title}</h3>
                  <button
                    className="modal-close"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close modal"
                    id="modal-close-btn"
                  >
                    <i className="bi bi-x" />
                  </button>
                </div>

                <p>{selectedProject.description}</p>

                <div className="modal-section-label">Tech Stack</div>
                <div className="modal-tech-badges">
                  {selectedProject.technologies.map((tech: string, idx: number) => (
                    <span key={idx} className="modal-tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn primary"
                      id={`modal-github-${selectedProject.id}`}
                    >
                      <i className="bi bi-github" />
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn secondary"
                      id={`modal-demo-${selectedProject.id}`}
                    >
                      <i className="bi bi-link-45deg" />
                      Live Demo
                    </a>
                  )}
                  <button
                    className="modal-action-btn secondary"
                    onClick={() => setSelectedProject(null)}
                    id="modal-back-btn"
                  >
                    <i className="bi bi-arrow-left" />
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
