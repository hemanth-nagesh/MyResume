import { useEffect, useState, useRef } from 'react'

interface Skill {
  name: string
  value: number
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const skills: Skill[] = [
    { name: 'LangChain, LangGraph & Agentic Systems', value: 95 },
    { name: 'RAG Architectures & Semantic Search', value: 92 },
    { name: 'Python & Backend Development', value: 95 },
    { name: 'OpenAI APIs & Prompt Engineering', value: 90 },
    { name: 'Vector Databases & Embedding Techniques', value: 88 },
    { name: 'Azure AI Foundry, AWS Bedrock & GCP Vertex AI', value: 85 },
    { name: 'Docker, Kubernetes & CI/CD (MLOps)', value: 85 },
    { name: 'Django, REST APIs & Microservices', value: 82 },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-title">
        <h2>Skills</h2>
        <p>Specialized in LLM backends, agentic systems, RAG pipelines, and cloud-native AI infrastructure delivering measurable production outcomes.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-value">{skill.value}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: isVisible ? `${skill.value}%` : '0%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
