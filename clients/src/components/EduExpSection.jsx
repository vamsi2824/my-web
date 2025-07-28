// src/components/EduExpSection.jsx
import React from "react";
import { educationList, experienceList } from "../data/profileData";
import SpotlightCard from "./SpotlightCard";
const combined = [
  ...educationList.map((item) => ({ ...item, type: "education" })),
  ...experienceList.map((item) => ({ ...item, type: "experience" })),
];

// Optional: custom sort logic if you want a timeline mix

const EduExpSection = () => (
  <div className="w-full bg-gradient-to-tr from-[#281a40] via-[#151a2f] to-[#081139] rounded-2xl shadow-2xl">
    <section id="edu-exp" className="max-w-5xl mx-auto px-6 py-16 ">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Education & Experience
      </h2>
      <div className="space-y-6">
        {combined.map((item, idx) => (
          <SpotlightCard
            key={idx}
            className="bg-white/10 backdrop-blur rounded-xl shadow-lg p-5 border border-white/15"
          >
            <div>
              <h4 className="text-lg font-semibold text-cyan-200">
                {item.type === "education" ? item.degree : item.title}
              </h4>
              <div className="text-cyan-100">
                {item.type === "education" ? item.school : item.company}
              </div>
              <div className="text-cyan-200 font-mono text-sm mb-2">
                {item.period}
              </div>
              {item.details && (
                <ul className="list-disc ml-5 mt-1 text-cyan-100 space-y-1 text-sm">
                  {item.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              )}
              <span className="inline-block text-xs mt-2 px-3 py-1 rounded-full bg-cyan-900/50 text-cyan-200 uppercase tracking-wide">
                {item.type === "education" ? "Education" : "Experience"}
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  </div>
);

export default EduExpSection;
