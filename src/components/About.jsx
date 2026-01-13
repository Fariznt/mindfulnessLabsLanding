import { useState, useEffect, useRef } from 'react'
import './About.css'

function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className={`container ${isVisible ? 'fade-in' : ''}`}>
        <h2 className="section-title">How <span style={{ color: "#FFB800" }}>Mindfulness Labs</span> Works</h2>
        <div className="about-content">
          <h3>Mindful Learning</h3>
          <p>Integrating mindfulness practices into educational experiences to enhance focus, retention, and well-being.</p>
        </div>
      </div>
    </section>
  )
}

export default About
