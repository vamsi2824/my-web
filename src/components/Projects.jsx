import React from "react";
import ProjectCard from "./ProjectCard";

// 1. Define the project data at the top of the file
const projects = [
  {
    title: "ReactBits Web",
    description: "A modern UI library.",
    link: "https://reactbits.dev/",
  },
  // Add more project entries as needed
];

// 2. Use the array inside your component for rendering
const Projects = () => (
  <section id="projects" className="py-16 text-center">
    <h2 className="text-4xl font-bold text-white mb-10">Projects</h2>
    <div className="flex flex-wrap justify-center">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

export default Projects;
