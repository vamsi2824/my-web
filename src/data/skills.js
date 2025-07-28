// src/data/skills.js

import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGit,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiTypescript,
  SiExpress,
  SiJupyter,
  SiStreamlit,
  SiSqlite,
  SiJavascript,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiGooglecloud,
  SiGithub,
} from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-400" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-400" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-200" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "SQL (SQLite)", icon: <SiSqlite className="text-blue-700" /> },
  { name: "Python", icon: <FaPython className="text-yellow-500" /> },
  { name: "Pandas", icon: <SiPandas className="text-pink-500" /> },
  { name: "NumPy", icon: <SiNumpy className="text-indigo-400" /> },
  { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-500" /> },
  { name: "Streamlit", icon: <SiStreamlit className="text-red-500" /> },
  { name: "Jupyter Notebook", icon: <SiJupyter className="text-orange-400" /> },
  {
    name: "Google Gemini API",
    icon: <SiGooglecloud className="text-yellow-400" />,
  },
  { name: "Git", icon: <FaGit className="text-orange-600" /> },
  { name: "GitHub", icon: <SiGithub className="text-gray-200" /> },
];

export default skills;
