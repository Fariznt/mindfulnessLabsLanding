import { Sparkles, GraduationCap, Package, Award } from "lucide-react";
import "./WhySection.css";

export default function WhySection() {
  return (
    <section className="why-section">
      <h2 className="why-heading">
        Why <span style={{ color: "#FFB800" }}>Mindfulness Labs?</span>
      </h2>
      
      <div className="why-grid">
        <div className="why-card">
          <Sparkles className="why-icon" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
          <div className="why-content">
            <p className="why-description">Responsible, human-centered AI</p>
          </div>
        </div>

        <div className="why-card">
          <GraduationCap className="why-icon" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
          <div className="why-content">
            <p className="why-description">Easy to use for educators and better learning engagement for students</p>
          </div>
        </div>

        <div className="why-card">
          <Package className="why-icon" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
          <div className="why-content">
            <p className="why-description">Customizable to your preferences</p>
          </div>
        </div>

        <div className="why-card">
          <Award className="why-icon" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
          <div className="why-content">
            <p className="why-description">Evidence-based lesson plans</p>
          </div>
        </div>
      </div>
    </section>
  );
}