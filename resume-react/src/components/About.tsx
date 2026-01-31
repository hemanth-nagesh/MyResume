import { useState } from 'react'

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
        <p>Dynamic innovative AI researcher with a proven track record of designing and implementing cutting-edge generative AI models and architectures.</p>
      </div>

      <div className="about-content">
        <div className="about-image">
          <img src="/assets/profile-img.jpg" alt="Hemanth Nagesh" />
        </div>

        <div className="about-details">
          <h3>AI/ML Developer & Data Analyst</h3>
          <p className="intro">
            Expertise in applying machine learning techniques to creative content generation, natural language processing, and other AI-powered applications.
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
            Innovative and deadline-driven AI/ML Engineer with a strong foundation in designing, developing, and deploying user-centered AI models from concept to final deliverable. Experienced in model training, fine-tuning LLMs, and leveraging Google Cloud and Azure for scalable solutions. Skilled in applying machine learning techniques to solve real-world challenges across various domains.
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
