import { useEffect, useRef, useState } from "react";
import { Heart, Sliders, Calendar, Sun } from "lucide-react";
import "./About.css";

const steps = [
  {
    Icon: Heart,
    title: "Understand Community Needs",
    body: (
      <>
        Schools assess well-being and identify areas of support using{" "}
        <span className="underline">guided, collaborative input.</span>
      </>
    ),
  },
  {
    Icon: Sliders,
    title: "Customize Wellness Support",
    body: (
      <>
        Educators select or adapt mindfulness, mental health, and wellness resources to{" "}
        <span className="underline">fit their community.</span>
      </>
    ),
  },
  {
    Icon: Calendar,
    title: "Practice & Integrate",
    body: (
      <>
        Educators engage with wellness practices that fit{" "}
        <span className="underline">naturally into daily routines.</span>
      </>
    ),
  },
  {
    Icon: Sun,
    title: "Reflect & Grow",
    body: (
      <>
        Schools build consistency and <span className="underline">strengthen well-being</span>{" "}
        using <span className="underline">evidence-based</span> strategies over time.
      </>
    ),
  },
];

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="aboutSection" ref={sectionRef}>
      <div className={`aboutContainer ${isVisible ? "fadeIn" : ""}`}>
        <h2 className="aboutTitle">
          How <span className="accent">Mindfulness Labs</span> Works
        </h2>

        <div className="steps">
          {steps.map(({ Icon, title, body }) => (
            <div className="step" key={title}>
              <div className="iconWrap" aria-hidden="true">
                <Icon className="stepIcon" strokeWidth={2} />
              </div>

              <div className="stepText">
                <h3 className="stepTitle">{title}</h3>
                <p className="stepBody">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;