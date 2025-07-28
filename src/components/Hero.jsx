import React from "react";

const Hero = () => (
  <section
    id="home"
    className="relative min-h-[90vh] flex flex-col items-center justify-start overflow-hidden"
  >
    {/* Ballpit animated background - behind everything */}
    {/* NavBar - z-50 ensures it's above the background */}

    {/* Hero content */}
    <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 w-full">
      {/* Optional: New Background button disabled, or put your own background toggler here */}

      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
        Boddapati Veeravenkata Vamsi
      </h1>
      <h2 className="text-xl md:text-2xl text-cyan-300 font-semibold mb-6">
        Full-Stack Developer & AI Engineer
      </h2>
      <p className="max-w-2xl text-lg md:text-xl text-cyan-100 mb-10">
        I design, build, and deploy secure web applications and AI-powered
        tools.
        <br />
        Passionate about React, Node.js, Python, and bringing data science to
        life.
        <br />
        Let’s turn ideas into smart, interactive products!
      </p>
      <div className="flex gap-4 mt-4">
        <a
          href="#projects"
          className="px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold shadow hover:bg-cyan-300 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-8 py-3 rounded-full bg-white/10 border border-white/30 text-white font-semibold shadow hover:bg-white/20 transition"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
