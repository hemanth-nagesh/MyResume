const About = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/assets/E_Hemanth_Nagesh_2023.pdf'
    link.download = '/assets/E_Hemanth_Nagesh_2023.pdf'
    link.click()
  }

  const personalInfo = [
    { icon: 'bi-calendar', label: 'Birthday', value: '6 Sep 2000' },
    { icon: 'bi-geo-alt', label: 'City', value: 'Bangalore, INDIA' },
    { icon: 'bi-person', label: 'Age', value: '24' },
    { icon: 'bi-mortarboard', label: 'Degree', value: 'Master of Computer Applications' },
    { icon: 'bi-envelope', label: 'Email', value: 'hemanthnagesh082@gmail.com' },
    { icon: 'bi-telephone', label: 'Phone', value: '+91 9980 14 4503' },
  ]

  return (
    <section id="about">
      <div className="section-title">
        <h2>About</h2>
        <p>Software Engineer with 2.5+ years of experience designing and deploying Generative AI and LLM-powered backend systems in enterprise settings.</p>
      </div>

      <div className="about-content">
        <div className="about-image">
          <img src="/assets/profile-img.jpg" alt="Hemanth Nagesh" />
        </div>

        <div className="about-details">
          <h3>Software Engineer – Generative AI &amp; Backend Systems</h3>
          <p className="intro">
            Proficient in Python, LangChain, LangGraph, RAG architectures, prompt engineering, and vector databases — with hands-on experience integrating OpenAI APIs, Azure AI Foundry, and AWS Bedrock. Azure AI Engineer Certified.
          </p>

          <div className="info-grid">
            {personalInfo.map((info, idx) => (
              <div key={idx} className="info-item">
                <i className={`bi ${info.icon}`}></i>
                <span>
                  <strong>{info.label}:</strong> {info.value}
                </span>
              </div>
            ))}
          </div>

          <p>
            Proven track record delivering measurable production outcomes in enterprise Generative AI systems. Experienced in multi-agent LLM backends, agentic systems using LangGraph, CI/CD-triggered RAG pipelines, and responsible AI practices — with additional research depth in accessible AI interfaces (WCAG, TCS Accessibility Team).
          </p>

          <button className="download-btn" onClick={handleDownload}>
            <i className="bi bi-download"></i>
            Download Resume
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
