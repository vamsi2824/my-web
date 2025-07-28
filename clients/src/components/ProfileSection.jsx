import React from "react";
import myAvatar from "../assets/my.png";
import ProfileCard from "./ProfileCard";
import TextType from "./TextType";

const ProfileSection = () => (
  <section
    id="profile"
    className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12"
  >
    {/* Profile Info */}
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Boddapati Veeravenkata Vamsi
      </h2>
      <h3 className="text-xl md:text-2xl text-cyan-400 font-semibold mb-2">
        Full-Stack Developer & AI Enthusiast
      </h3>
      <p className="text-cyan-100 mb-4 max-w-xl">
        <TextType text="Full-stack web developer and AI engineer, passionate about building secure, interactive apps using React, Node.js, and Python. From modern portfolios to fraud detection and career AI, I love bringing tech to life that helps people solve problems and discover new opportunities." />
      </p>

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a
          href="#contact"
          className="inline-block mt-2 px-6 py-2 bg-cyan-500 text-white rounded-full shadow hover:bg-cyan-600 transition"
        >
          Contact Me
        </a>
        <a
          href="https://linkedin.com/in/boddapati-veeravenkata-vamsi-bbb853299"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-6 py-2 bg-blue-700 text-white rounded-full shadow hover:bg-blue-800 transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/vamsi2824"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-6 py-2 bg-gray-800 text-white rounded-full shadow hover:bg-black transition"
        >
          GitHub
        </a>
      </div>
    </div>

    {/* Image Column */}
    <div className="flex-1 flex justify-center md:justify-end">
      <ProfileCard avatarUrl={myAvatar} miniAvatarUrl={myAvatar} />
    </div>
  </section>
);

export default ProfileSection;
