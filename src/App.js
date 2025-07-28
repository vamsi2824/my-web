import React from "react";
import Navbar from "./components/Navbar";
import ProfileSection from "./components/ProfileSection";
import EduExpSection from "./components/EduExpSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import SlillsSection from "./components/SkillsSection";
import AssistantWrapper from "./components/AssistantWrapper";
import Home from "./components/Home"; // ...other imports

function App() {
  return (
    <div className="min-h-screen bg-[#12041b] flex flex-col">
      <main>
        <AssistantWrapper></AssistantWrapper>
        <Home />

        <ProfileSection />
        <SlillsSection />
        <EduExpSection />
        <ProjectsSection />
        <ContactSection />
        {/* Add other components like Contact, Footer, etc. */}
      </main>
    </div>
  );
}

export default App;
