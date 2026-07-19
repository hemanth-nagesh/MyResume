const Footer = () => {
  const socialLinks = [
    { name: 'Twitter / X', icon: 'bi-twitter-x', url: 'https://x.com/Nageshehemanth' },
    { name: 'GitHub', icon: 'bi-github', url: 'https://github.com/hemanth-nagesh' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://www.instagram.com/__hemanth__beast_/' },
    { name: 'LinkedIn', icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7' },
  ]

  return (
    <footer className="footer">
      <h3>Hemanth Nagesh E</h3>
      <p>
        Building intelligent systems that bridge the gap between AI research and
        real-world enterprise impact.
      </p>
      <div className="footer-socials">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <i className={`bi ${social.icon}`} aria-hidden="true" />
          </a>
        ))}
      </div>
      <div className="copyright">
        <span>© {new Date().getFullYear()} Hemanth Nagesh. Built with React + Vite.</span>
      </div>
    </footer>
  )
}

export default Footer
