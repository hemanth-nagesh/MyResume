const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: 'bi-twitter-x', url: 'https://x.com/Nageshehemanth' },
    { name: 'GitHub', icon: 'bi-github', url: 'https://github.com/hemanth-nagesh' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://www.instagram.com/__hemanth__beast_/' },
    { name: 'Skype', icon: 'bi-skype', url: 'https://www.skype.com/hemanthnagesh.e' },
    { name: 'LinkedIn', icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7' },
  ]

  return (
    <footer className="footer">
      <h3>Hemanth Nagesh E</h3>
      <p>For any kind of connections you can connect from any of the following social networks</p>
      <div className="footer-socials">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <i className={`bi ${social.icon}`}></i>
          </a>
        ))}
      </div>
      <div className="copyright">
        <span>Copyright © {new Date().getFullYear()} All Rights Reserved</span>
      </div>
    </footer>
  )
}

export default Footer
