// src/components/Navbar.jsx
import React, { useState } from "react";

const Navbar = ({ brand, links }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="w-full flex justify-center pt-6">
      <div className="flex items-center justify-between w-full max-w-4xl bg-white/20 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-white/30 relative z-50">
        {/* Logo and brand */}
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="8" fill="#a2fffe" />
            </svg>
          </span>
          <span className="ml-2 text-white font-bold text-xl">{brand}</span>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-lg hover:text-cyan-300 px-3 py-1 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md text-white"
        >
          {/* Hamburger icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg border border-white/20 flex flex-col py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)} // Close menu on link click
                className="text-white px-4 py-2 hover:bg-cyan-500/30 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
