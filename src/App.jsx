import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'
import WhySection from './components/WhySection'
import OurStory from './components/OurStory'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <WhySection />
      <OurStory />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
