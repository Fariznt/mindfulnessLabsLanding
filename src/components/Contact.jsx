import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('Successfully subscribed to our mailing list!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('Error: ' + data.error);
      }
    } catch (error) {
        const status = error?.response?.status;
        const data = error?.response?.data;

        console.log("=== WIX ERROR RAW ===");
        console.log(error);

        console.log("=== WIX ERROR STATUS ===");
        console.log(status);

        console.log("=== WIX ERROR DATA (stringified) ===");
        console.log(JSON.stringify(data, null, 2));

        // Some Wix SDK errors also store details here:
        console.log("=== WIX ERROR DETAILS (stringified) ===");
        console.log(JSON.stringify(error?.details, null, 2));

        res.status(status || 500).json({
            success: false,
            status: status || 500,
            wixData: data || null,
        });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              />

              <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
