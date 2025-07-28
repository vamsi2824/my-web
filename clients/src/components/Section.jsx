// src/components/Section.jsx
import React from "react";

const Section = ({ id, title, children }) => (
  <section id={id} className="py-16 text-center">
    <h2 className="text-4xl font-bold text-white mb-8">{title}</h2>
    <div>{children}</div>
  </section>
);

export default Section;
