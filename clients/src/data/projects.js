// src/data/projects.js

import recipeImg from "../assets/projects/recipe.png";
import portfolioImg from "../assets/projects/portfolio.png";
import careerImg from "../assets/projects/career.png";
import fraudImg from "../assets/projects/fraud.png";
import medguardianImg from "../assets/projects/medguardian.png";
// Add or update image imports as you collect thumbnails/screenshots

const projects = [
  {
    title: "Full-Stack Recipe Application",
    description:
      "A secure platform for recipe creation, browsing, and saving. Built with React, Node.js, Express.js, and JWT. Features mobile-responsiveness, JWT auth, and a RESTful API backend.",
    image: recipeImg,
    link: "https://github.com/vamsi2824/FullStackProject", // update with real repo/demo link
    tags: ["React", "Node.js", "Express", "JWT", "FullStack"],
  },
  {
    title: "AI-Integrated Portfolio Website",
    description:
      "Personal portfolio with a voice AI assistant (Gemini, Google TTS). Modern glassmorphic UI, built in React/Node/Tailwind. Live Q&A about my skills and projects.",
    image: portfolioImg,
    link: "https://yourportfolio.com/", // replace with real link if deployed
    tags: ["React", "Node.js", "TailwindCSS", "AI", "Portfolio"],
  },
  {
    title: "Career Guidance Assistant",
    description:
      "Python Streamlit app using Gemini AI to recommend personalized career paths. Prompt engineering and regex logic increase accuracy and clarity.",
    image: careerImg,
    link: "https://github.com/vamsi2824/Brainwonders-Project", // add real repo/demo if available
    tags: ["Python", "Streamlit", "Gemini", "Prompt Engineering", "AI"],
  },
  {
    title: "Fraud Detection System",
    description:
      "Real-time ML fraud detector using the BankSim dataset. Achieved 94% AUC-ROC and 90% recall. Interactive dashboard with live prediction and insights.",
    image: fraudImg,
    link: "https://github.com/vamsi2824/Fraud-Detection", // update with real link
    tags: ["Python", "ML", "SMOTE", "Streamlit", "Data Science"],
  },
  {
    title: "MedGuardian – Early Disease Detection",
    description:
      "AI tool for predicting diabetes and heart disease, achieving 92% model accuracy. Visualization of patient risk factors supports preventative healthcare.",
    image: medguardianImg,
    link: "https://github.com/vamsi2824/disease_detection_app", // update with real repo/demo link
    tags: ["Python", "Data Science", "Healthcare", "ML"],
  },
  // Add more projects if you have them
];

export default projects;
