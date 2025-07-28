// src/components/SkillsSection.jsx
import React from "react";
import skills from "../data/skills";

const SkillsSection = () => (
  <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
      Skills
    </h2>
    <div className="flex flex-wrap gap-6 justify-center">
      {skills.map((skill, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-md p-4 w-36 hover:scale-105 transition"
        >
          <span className="text-4xl mb-2">{skill.icon}</span>
          <span className="text-cyan-100 text-lg font-medium text-center">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
