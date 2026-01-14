import { Sparkles, GraduationCap, Package, Award } from "lucide-react";
import "./WhySection.css";

export default function WhySection() {
  return (
    <section className="why-section">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why <span style={{ color: "#FFB800" }}>Mindfulness Labs?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-white border-none shadow-sm rounded-lg">
          <div className="flex gap-4 items-start">
            <Sparkles className="w-12 h-12 flex-shrink-0" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
            <div>
              <h3 className="font-semibold text-lg mb-1">Responsible,</h3>
              <p className="text-base">human-centered AI</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white border-none shadow-sm rounded-lg">
          <div className="flex gap-4 items-start">
            <GraduationCap className="w-12 h-12 flex-shrink-0" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
            <div>
              <p className="text-base">Easy to use for educators and better learning engagement for students</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white border-none shadow-sm rounded-lg">
          <div className="flex gap-4 items-start">
            <Package className="w-12 h-12 flex-shrink-0" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
            <div>
              <h3 className="font-semibold text-lg mb-1">Customizable</h3>
              <p className="text-base">to your preferences</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white border-none shadow-sm rounded-lg">
          <div className="flex gap-4 items-start">
            <Award className="w-12 h-12 flex-shrink-0" style={{ color: "#FFB800", strokeWidth: 1.5 }} />
            <div>
              <h3 className="font-semibold text-lg mb-1">Evidence-based</h3>
              <p className="text-base">lesson plans</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}