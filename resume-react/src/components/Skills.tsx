import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCollection, Skill } from '../hooks/usePortfolioData'

const HARDCODED_SKILLS: { name: string; value: number; icon: string; category: string; order: number }[] = [
  { name: 'LangChain & LangGraph', value: 95, icon: '🧠', category: 'AI / LLM', order: 0 },
  { name: 'RAG Architectures', value: 92, icon: '🔍', category: 'AI / LLM', order: 1 },
  { name: 'OpenAI APIs', value: 90, icon: '⚡', category: 'AI / LLM', order: 2 },
  { name: 'Prompt Engineering', value: 90, icon: '✨', category: 'AI / LLM', order: 3 },
  { name: 'LLM Evaluation & LLMOps', value: 85, icon: '📊', category: 'AI / LLM', order: 4 },
  { name: 'Vector DBs & Embeddings', value: 88, icon: '🗃️', category: 'AI / LLM', order: 5 },
  { name: 'Semantic Search', value: 87, icon: '🔎', category: 'AI / LLM', order: 6 },
  { name: 'Python', value: 95, icon: '🐍', category: 'Backend', order: 7 },
  { name: 'Django & REST APIs', value: 82, icon: '🌐', category: 'Backend', order: 8 },
  { name: 'Microservices', value: 85, icon: '🔧', category: 'Backend', order: 9 },
  { name: 'PostgreSQL', value: 80, icon: '🐘', category: 'Backend', order: 10 },
  { name: 'Docker', value: 85, icon: '🐳', category: 'Backend', order: 11 },
  { name: 'Azure AI Foundry', value: 88, icon: '☁️', category: 'Cloud & DevOps', order: 12 },
  { name: 'AWS Bedrock', value: 80, icon: '🌩️', category: 'Cloud & DevOps', order: 13 },
  { name: 'GCP Vertex AI', value: 75, icon: '🔴', category: 'Cloud & DevOps', order: 14 },
  { name: 'Kubernetes & CI/CD', value: 82, icon: '⚙️', category: 'Cloud & DevOps', order: 15 },
  { name: 'React.js', value: 75, icon: '⚛️', category: 'Frontend', order: 16 },
  { name: 'Accessible UI (WCAG)', value: 80, icon: '♿', category: 'Frontend', order: 17 },
]

type TabType = 'All' | 'AI / LLM' | 'Backend' | 'Cloud & DevOps' | 'Frontend'
const TABS: TabType[] = ['All', 'AI / LLM', 'Backend', 'Cloud & DevOps', 'Frontend']

const Skills = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { data: firestoreSkills, loading } = useCollection<Skill>('skills')

  const displaySkills = firestoreSkills.length > 0 ? firestoreSkills : HARDCODED_SKILLS

  const filtered =
    activeTab === 'All'
      ? displaySkills
      : displaySkills.filter((s) => s.category === activeTab)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  if (loading) {
    return (
      <section id="skills" ref={sectionRef}>
        <div className="section-title">
          <span className="section-label">What I work with</span>
          <h2>Skills</h2>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-title">
        <span className="section-label">What I work with</span>
        <h2>Skills</h2>
        <p>
          Specialized in LLM backends, agentic systems, RAG pipelines, and
          cloud-native AI infrastructure delivering measurable production outcomes.
        </p>
      </div>

      <div className="skills-tabs" role="tablist" aria-label="Skill categories">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`skills-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            id={`skills-tab-${tab.replace(/\s/g, '-').toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div className="skills-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              key={'id' in skill ? (skill as Skill).id : (skill as typeof HARDCODED_SKILLS[0]).name}
              className="skill-card"
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-bar-bg">
                <div
                  className="skill-bar-fill"
                  style={{ width: isVisible ? `${skill.value}%` : '0%' }}
                />
              </div>
              <div className="skill-percent">{skill.value}%</div>
              <div className="skill-category-badge">{skill.category}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default Skills
