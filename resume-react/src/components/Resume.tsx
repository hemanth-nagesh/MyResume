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
      period: '2021 - 2023',
      institution: 'PES College of Engineering, Mandya, Karnataka',
      description: "Graduated with a strong foundation in advanced computing, software development, and AI. Excelled in problem-solving and innovative applications with focus on machine learning and data science."
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      period: '2018 - 2021',
      institution: 'MS Ramaiah College of Arts, Science & Commerce, Bangalore, Karnataka',
      description: "Built a solid foundation in computer science fundamentals, programming, and software engineering principles. Developed strong analytical and problem-solving skills."
    }
  ]

  const experience: Experience[] = [
    {
      title: 'AI/ML Developer',
      period: 'December 2023 - Present',
      company: 'Tata Consultancy Services, Trivandrum, Kerala',
      description: [
        'Skilled in using TensorFlow, Keras, PyTorch, and YOLO for model training, fine-tuning, and deployment; developed and managed custom datasets for varied AI applications.',
        'Led a project utilizing Google Gemini AI to convert inaccessible images on websites into accessible formats, significantly improving web accessibility for visually impaired users.',
        'Experienced in fine-tuning large language models (LLMs) for specific use cases, leveraging RNI containers for GPU-accelerated training and optimization.',
        'Applied AI/ML techniques to solve real-world business problems and deliver production-ready solutions.'
      ]
    },
    {
      title: 'Artificial Intelligence Intern',
      period: '3 Months',
      company: 'Botsio ChatBot LLP, Mysore, Karnataka',
      description: [
        'Designed and developed an interactive chatbot enabling administrators to upload relevant documents for seamless customer interaction.',
        'Leveraged OpenAI API for natural language understanding and generating contextually relevant responses.',
        'Built a user-friendly and intuitive interface using Streamlit for effortless user interaction and document management.'
      ]
    },
    {
      title: 'Machine Learning Intern',
      period: '2 Months',
      company: 'Bharat Intern, Remote',
      description: [
        'Successfully developed three real-time ML projects within a month, demonstrating rapid execution and strong project management skills.',
        'Explored and implemented essential ML preprocessing techniques to enhance data analysis accuracy and model performance.',
        'Utilized advanced tools and methodologies including data cleaning and Convolutional Neural Networks (CNN) for robust model development.'
      ]
    }
  ]

  return (
    <section id="resume">
      <div className="section-title">
        <h2>Resume</h2>
        <p>Graduated with a strong foundation in computing, AI, and software development. Developed projects like DocuBot using AI and IPL Score Prediction with Deep Learning. Currently an AI/ML Developer at TCS, specializing in model training, fine-tuning, and web accessibility improvements.</p>
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
