import { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import { Instagram, Linkedin } from 'lucide-react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo-container">
          <img src={logo} alt="Mindfulness Labs" className="navbar-logo" />
          <div className="logo">Mindfulness Labs</div>
        </div>
        
        <div className="nav-right">
          <a 
            href="https://www.instagram.com/mindfulnesslabs_ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Visit our Instagram"
          >
            <Instagram size={24} strokeWidth={2} />
          </a>

          <a 
            href="https://www.linkedin.com/company/mindfulness-labs/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Visit our LinkedIn"
          >
            <Linkedin size={24} strokeWidth={2} />
          </a>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
