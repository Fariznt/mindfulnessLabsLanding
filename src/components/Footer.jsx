import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">Mindfulness Labs</h3>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Mindfulness Labs. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
