interface Education {
  degree: string
  period: string
  institution: string
  description: string
}

interface Experience {
  title: string
  period: string
  company: string
  description: string[]
}

const Resume = () => {
  const education: Education[] = [
    {
      degree: 'Master of Computer Applications (MCA)',
      period: '2021 – 2023',
      institution: 'PES College of Engineering, Mandya',
      description: "Graduated with a strong foundation in advanced computing, software development, and AI. Focused on machine learning, data science, and distributed systems."
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      period: '2018 – 2021',
      institution: 'Ramaiah Institute of Business Studies, Bangalore',
      description: "Built a solid foundation in computer science fundamentals, programming, and software engineering principles. Developed strong analytical and problem-solving skills."
    }
  ]

  const experience: Experience[] = [
    {
      title: 'Software Engineer – Generative AI & Agentic Systems',
      period: 'Dec 2023 – Present',
      company: 'Tata Consultancy Services (TCS)',
      description: [
        'Designed and deployed a production-grade multi-agent LLM backend using LangGraph and LangChain, reducing system execution time by 70% through parallel tool-calling, fault-tolerant retry logic, and circuit breakers across distributed microservices.',
        'Built a vector-indexed agent routing registry that eliminated 30% of workflow faults by replacing hardcoded dispatch logic with semantic capability matching — directly improving service quality and availability in a globally distributed Agile team.',
        'Engineered a CI/CD-triggered RAG ingestion pipeline integrating document chunking, embedding generation, and vector database indexing — automating document processing from upload to production-ready retrieval with zero manual intervention.',
        'Collaborated with TCS Accessibility Research Team to develop and ship a WCAG-compliant voice agent, applying prompt engineering and NLP techniques to create accessible AI interfaces for users with disabilities.',
        'Implemented a Human-in-the-Loop (HITL) checkpoint system and an autonomous browser automation agent, both shipped through structured code review cycles and quality gates aligned with responsible AI and security best practices.'
      ]
    },
    {
      title: 'Software Engineer Intern – LLM Applications',
      period: 'Mar 2023 – May 2023',
      company: 'BOTSIO Chatbot LLP',
      description: [
        'Implemented backend semantic retrieval pipelines — embedding generation, vector indexing, and similarity search — to ground production chatbot responses in verified knowledge sources, improving response consistency for live users.',
        'Debugged and resolved latency and correctness issues in deployed AI microservices integrated with PostgreSQL; contributed prompt engineering improvements adopted across subsequent model releases.'
      ]
    }
  ]

  return (
    <section id="resume">
      <div className="section-title">
        <h2>Resume</h2>
        <p>2.5+ years engineering production-grade Generative AI and LLM-powered backend systems — from multi-agent orchestration and RAG pipelines to accessible AI interfaces and enterprise cloud deployments. Azure AI Engineer Certified.</p>
      </div>

      <div className="resume-grid">
        <div className="resume-section">
          <h3>Education</h3>
          {education.map((edu, idx) => (
            <div key={idx} className="resume-item">
              <h4>{edu.degree}</h4>
              <h5>{edu.period}</h5>
              <p className="company">{edu.institution}</p>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>

        <div className="resume-section">
          <h3>Professional Experience</h3>
          {experience.map((exp, idx) => (
            <div key={idx} className="resume-item">
              <h4>{exp.title}</h4>
              <h5>{exp.period}</h5>
              <p className="company">{exp.company}</p>
              <ul>
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Resume
