import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '9c7a9d4a-b9b7-4aa3-b323-309e13bc997b',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: 'bi-geo-alt',
      title: 'Address',
      details: 'Bangalore, KA, INDIA 560001'
    },
    {
      icon: 'bi-telephone',
      title: 'Call Me',
      details: '+91 9980 14 4503'
    },
    {
      icon: 'bi-envelope',
      title: 'Email Me',
      details: 'hemanthnagesh082@gmail.com'
    }
  ]

  return (
    <section id="contact">
      <div className="section-title">
        <h2>Contact</h2>
        <p>For any details or to hire me connect here</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="contact-item">
              <i className={`bi ${info.icon}`}></i>
              <div>
                <h4>{info.title}</h4>
                <p>{info.details}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitStatus === 'success' && (
            <div style={{
              padding: '15px',
              marginBottom: '20px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '5px',
              border: '1px solid #c3e6cb'
            }}>
              <i className="bi bi-check-circle"></i> Your message has been sent successfully!
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              padding: '15px',
              marginBottom: '20px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '5px',
              border: '1px solid #f5c6cb'
            }}>
              <i className="bi bi-exclamation-circle"></i> There was an error sending your message. Please try again.
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              className="form-control"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              className="form-control"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <i className="bi bi-arrow-clockwise" style={{ animation: 'spin 1s linear infinite' }}></i>
                {' '}Sending...
              </>
            ) : (
              <>
                <i className="bi bi-send"></i>
                {' '}Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
