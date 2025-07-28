import React from "react";

const ContactSection = () => (
  <section
    id="contact"
    className="max-w-4xl mx-auto px-6 py-20 bg-white/10 backdrop rounded-2xl shadow-lg border border-white/20"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
      Get in Touch
    </h2>
    <p className="text-cyan-100 mb-10 text-center max-w-xl mx-auto">
      Whether you want to collaborate, ask questions, or just say hello, feel
      free to reach out using the form below or via social links!
    </p>

    <form
      action="https://formspree.io/f/your-form-id" // Replace with your form endpoint
      method="POST"
      className="max-w-lg mx-auto flex flex-col gap-6"
    >
      <label className="flex flex-col text-white">
        Name
        <input
          type="text"
          name="name"
          required
          placeholder="Your full name"
          className="mt-2 px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </label>

      <label className="flex flex-col text-white">
        Email
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="mt-2 px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </label>

      <label className="flex flex-col text-white">
        Message
        <textarea
          name="message"
          rows="5"
          required
          placeholder="Write your message here..."
          className="mt-2 px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
        />
      </label>

      <button
        type="submit"
        className="self-center bg-cyan-500 hover:bg-cyan-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
      >
        Send Message
      </button>
    </form>

    <div className="mt-12 flex justify-center space-x-8">
      {/* Add your social links as icons */}
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-white hover:text-cyan-400 transition"
      >
        {/* GitHub SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8 0-.8 0-.8 1.4.1 2 1.4 2 1.4 1.2 2 3.2 1.4 4 .8.1-.9.5-1.4.9-1.8-2.6-.3-5.3-1.4-5.3-6A4.7 4.7 0 016.4 6.6c-.1-.3-.6-1.5.1-3.3 0 0 1.2-.4 3.4 1.5a11.8 11.8 0 016.2 0c2.2-1.9 3.4-1.5 3.4-1.5.7 1.8.2 3 .1 3.3.9 1 1.4 2.2 1.4 3.7 0 4.6-2.7 5.7-5.3 6 .5.5.9 1.3.9 2.7v4c0 .3.2.7.8.6A12 12 0 0012 .3" />
        </svg>
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-white hover:text-cyan-400 transition"
      >
        {/* LinkedIn SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554V14.86c0-1.333-.024-3.054-1.858-3.054-1.859 0-2.143 1.448-2.143 2.946v5.701H9.341V9h3.414v1.561h.049c.476-.899 1.637-1.848 3.37-1.848 3.601 0 4.266 2.37 4.266 5.455v6.284zM5.337 7.433A2.07 2.07 0 113.27 5.363a2.072 2.072 0 012.067 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      {/* Add more social icons if you want */}
    </div>
  </section>
);

export default ContactSection;
