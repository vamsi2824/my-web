import React from "react";
import Ballpit from "./Ballpit";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="relative min-h-[100vh] flex flex-col items-center justify-start overflow-hidden"
      >
        <Ballpit
          className="absolute inset-0 z-0"
          count={120}
          colors={[
            "rgba(64, 25, 209, 1)",
            "rgba(47, 33, 207, 1)",
            "rgba(242, 242, 243, 1)",
          ]}
        />
        <div className="w-full relative z-50">
          <Navbar
            brand="My Portfolio"
            links={[
              { label: "Home", href: "#home" },
              { label: "Projects", href: "#projects" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ]}
          />
          <Hero />
        </div>
      </section>
    </>
  );
};

export default Home;
