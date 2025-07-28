// server/index.js
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
// ====== CONFIG ======
dotenv.config();

// Replace with your secure Gemini API key in production
const GEMINI_API_KEY = "AIzaSyB5b-n_XMkW-2sNt4QFfjRIqhrx7OZKohk"; // <-- CHANGE THIS!
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const app = express();
app.use(cors());
app.use(express.json());

// ====== YOUR RESUME DATA ======
const aboutMeData = `
My name is Vamsi. I am a Full-Stack Developer who builds secure web apps, APIs, and AI-powered tools using React, Node.js, Express.js, Python, and modern data science frameworks. I specialize in delivering robust ML solutions and interactive UIs.

Contact:
- Chennai, India | +91 8143841082 | b.v.v.vamsi@gmail.com
- LinkedIn: linkedin.com/in/boddapati-veeravenkata-vamsi-bbb853299
- GitHub: github.com/vamsi2824

Education:
- B.Tech ECE, Bharath Institute, Chennai (2025, expected)
- Intermediate MPC, Narayana Jr. College, Kakinada (2021)

Work Experience:
1. Data Science & ML Intern, Zaalima Development Pvt Ltd (May–Aug 2025)
   - Built fraud detection models, deployed ML pipelines, boosted monitoring by 40%
2. Junior Software Developer, GradTwin (Feb–May 2025)
   - Enhanced process efficiency by 20%, led data analysis on 100k+ rows

Major Projects:
- Full-Stack Recipe App: React, Node.js, JWT, mobile-ready secure platform
- AI Portfolio Website: Glassmorphic UI, voice assistant, React/Node/Tailwind
- Career Guidance Assistant: Python, Streamlit, Gemini API, prompt engineering
- Fraud Detection System: Python ML, SMOTE, ROC-AUC 94%
- MedGuardian: Early disease diagnosis with ML (92% accuracy)

Skills:
JavaScript, React.js, Node.js, Express.js, Python, Tailwind CSS, HTML5, CSS3, SQL, JWT, REST API, Pandas, NumPy, scikit-learn, Matplotlib, Seaborn, Streamlit, Prompt Engineering, Git, Google Gemini API.

Certifications:
- Data Science (GradTwin), Technology Simulation (Deloitte), GenAI Data Analytics (Tata), Data Analytics (Deloitte)
`;

// ====== STRICT SYSTEM PROMPT ======
const systemPrompt = {
  role: "user",
  parts: [
    {
      text: `
You are an AI assistant for Vamsi.

You can ONLY answer questions about him, his projects, experience, skills, or bio as provided below.
If a user asks anything unrelated, reply: "Sorry, I only answer questions about Boddapati Veeravenkata Vamsi and their projects."
Use ONLY the information below as your source:

${aboutMeData}
      `.trim(),
    },
  ],
};

// ====== MAIN CHAT ENDPOINT ======
app.post("/api/assistant", async (req, res) => {
  let { contents } = req.body;
  if (!Array.isArray(contents)) contents = [];

  // === TOKEN SAVING: Only keep last N turns of chat history (plus system prompt)
  // Each turn = one user or assistant (model) message
  const MAX_TURNS = 6; // Increase/decrease for more/less context (for example: 6 = last 3 questions/answers)
  const lastMsgs = contents.slice(-MAX_TURNS);

  // Always put the system prompt at the front (unless already present)
  let context = lastMsgs;
  if (
    !context.some(
      (msg) =>
        msg.role === "user" &&
        msg.parts &&
        msg.parts[0]?.text?.includes("You are an AI assistant for Boddapati")
    )
  ) {
    context = [systemPrompt, ...context];
  }

  try {
    // Optional: CAP GEMINI OUTPUT TOKENS for even lower usage
    const requestBody = {
      contents: context,
      generationConfig: {
        maxOutputTokens: 256, // Lower this for even shorter replies (try 128, 256, etc)
      },
    };

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      { headers: { "Content-Type": "application/json" }, timeout: 15000 }
    );

    const data = response.data;
    let reply = "Sorry, I could not get a valid response from Gemini.";
    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    res.json({ reply });
  } catch (error) {
    // Show full Gemini API error in log
    console.error(
      "Gemini API error:",
      error.response?.data || error.message || error
    );
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});

// ====== START SERVER ======
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gemini assistant backend running on port ${PORT}`);
});
