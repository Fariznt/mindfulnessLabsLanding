import './OurStory.css';
import classroomImage from '../assets/classroom.jpg';

export default function OurStory() {
  return (
    <section className="our-story">
      <div className="our-story-grid">
        <div className="our-story-image">
          <img src={classroomImage} alt="Students and teacher in a colorful classroom" />
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