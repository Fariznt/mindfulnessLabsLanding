import './OurStory.css';

export default function OurStory() {
  return (
    <section className="our-story">
      <div className="our-story-grid">
        <div className="our-story-image">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5L5 21" strokeWidth="2" />
          </svg>
        </div>
        <div className="our-story-content">
          <h2>
            Our <span className="highlight">Story</span>
          </h2>
          <p>
            Mindfulness Labs grew out of our lived experience of trying to succeed in school while social and
            emotional needs quietly went unseen. After decades of working alongside educators, families, and students,
            we built Mindfulness Labs to help schools proactively support well-being as a core part of learning.
          </p>
        </div>
      </div>
    </section>
  );
}