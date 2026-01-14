import './Video.css';

export default function Video() {
  return (
    <section className="video-section">
      <div className="video-container">
        <h2 className="video-header">Reimagining Wellness in Schools</h2>
        <iframe
          className="video-frame"
          src="https://www.youtube.com/embed/iGMCB7iNHZ0?autoplay=1&mute=1"
          title="Mindfulness Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p className="video-caption">
          This short video introduces the mission behind Mindfulness Labs and how we're building an easy-to-use, customizable, and evidence-based platform to support well-being across school communities.{' '}
          <a href="#about" className="video-link">See how it works.</a>
        </p>
      </div>
    </section>
  );
}
