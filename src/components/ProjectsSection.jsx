// src/components/ProjectsSection.jsx
import React from "react";
import projects from "../data/projects"; // Your array of project objects
import SpotlightCard from "./SpotlightCard";

const ProjectsSection = () => (
  <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
      Projects
    </h2>
    <div className="flex flex-row flex-wrap justify-center gap-8">
      {projects.map((project, idx) => (
        <SpotlightCard
          spotlightColor="rgba(242, 0, 149, 0.25)"
          key={idx}
          className="w-80 bg-white/10 backdrop-blur rounded-2xl shadow-xl border border-white/15 flex flex-col p-6 transition-transform hover:scale-105"
        >
          <div className="flex flex-col flex-grow h-full items-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-xl mb-4 border border-cyan-200 shadow"
            />
            <h3 className="text-xl font-semibold text-cyan-300 mb-2 text-center">
              {project.title}
            </h3>
            <p className="text-cyan-100 mb-3 text-center">
              {project.description}
            </p>
            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-900/40 text-cyan-200 rounded-full text-xs uppercase font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-700 transition"
            >
              View Project
            </a>
          </div>
        </SpotlightCard>
      ))}
    </div>
  </section>
);

export default ProjectsSection;
