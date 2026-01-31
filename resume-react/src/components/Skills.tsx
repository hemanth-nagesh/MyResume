import { useEffect, useState, useRef } from 'react'

interface Skill {
  name: string
  value: number
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const skills: Skill[] = [
    { name: 'Generative AI & LLM Fine-tuning', value: 95 },
    { name: 'Machine Learning & Deep Learning', value: 90 },
    { name: 'Python (PyTorch, TensorFlow, Keras)', value: 95 },
    { name: 'Computer Vision (YOLO, OpenCV)', value: 85 },
    { name: 'NLP & Text Processing', value: 90 },
    { name: 'Cloud Platforms (Azure, GCP)', value: 85 },
    { name: 'SQL & Database Management', value: 80 },
    { name: 'Java & Software Development', value: 85 },
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
        <p>Innovative AI researcher in designing generative models, solving real-world challenges, and delivering impactful AI-powered solutions.</p>
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
