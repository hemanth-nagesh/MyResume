interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo?: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Multi-Agentic AI System',
      description: 'Architected autonomous multi-agent system using LangChain and LangGraph for travel and retail automation. Implemented A2A coordination workflows, STM/LTM memory with PostgreSQL vector search, Mem0-based user profiling, and Deep Research Agent for real-time web data retrieval.',
      image: '/assets/project_id1.png',
      technologies: ['LangChain', 'LangGraph', 'PostgreSQL', 'Vector DB', 'Mem0'],
      github: 'https://github.com/hemanth-nagesh'
    },
    {
      id: 2,
      title: 'DocuBot - Agentic RAG System',
      description: 'Built AI-powered document intelligence system using LLMs and Agentic RAG for intelligent Q&A across PDF, DOCX, and TXT files. Implemented multi-vector database retrieval with dynamic query routing, prompt engineering, and contextual templates for enterprise knowledge extraction.',
      image: '/assets/project_id2.png',
      technologies: ['LLM', 'RAG', 'Vector DB', 'LangChain', 'NLP'],
      github: 'https://github.com/hemanth-nagesh'
    },
    {
      id: 3,
      title: 'Web Accessibility AI Solution',
      description: 'Led a project utilizing Google Gemini AI to convert inaccessible images on websites into accessible formats, significantly improving web accessibility for visually impaired users. Demonstrated strong problem-solving skills and AI application.',
      image: '/assets/project_id3.png',
      technologies: ['Google Gemini', 'Computer Vision', 'AI/ML', 'Python'],
      github: 'https://github.com/hemanth-nagesh'
    },
    {
      id: 4,
      title: 'DocuBot Intelligent System',
      description: 'Designed an interactive chatbot enabling admins to upload relevant documents for customer interaction. Leveraged OpenAI for natural language understanding and built user-friendly interface using Streamlit.',
      image: '/assets/project_id4.png',
      technologies: ['OpenAI API', 'Streamlit', 'Python', 'NLP'],
      github: 'https://github.com/hemanth-nagesh'
    },
    {
      id: 5,
      title: 'LLM Fine-tuning Platform',
      description: 'Experienced in fine-tuning large language models for specific use cases, leveraging RNI containers for GPU-accelerated training and optimization. Successfully delivered domain-specific AI solutions.',
      image: '/assets/project_id5.png',
      technologies: ['PyTorch', 'Transformers', 'GPU Computing', 'NLP'],
      github: 'https://github.com/hemanth-nagesh'
    }
  ]

  return (
    <section id="projects">
      <div className="section-title">
        <h2>Projects</h2>
        <p>Showcasing innovative AI/ML solutions and data-driven applications that solve real-world challenges</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="project-overlay">
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Code"
                    >
                      <i className="bi bi-github"></i>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Demo"
                    >
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-badges">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
