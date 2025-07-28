import React from "react";
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
        <Home />
        <AssistantWrapper></AssistantWrapper>

        <ProfileSection />
        <SlillsSection />
        <EduExpSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
