import React, { useState, useEffect, useRef } from "react";

// ========== Core AetherAssistant Component ==========
const AetherAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setup voice recognition and speech
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        addMessage("system", "Listening...");
      };
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        sendMessage(transcript);
      };
      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        addMessage(
          "system",
          `Voice input error: ${event.error}. Please try again.`
        );
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setMessages((msgs) =>
          msgs.filter(
            (msg) => !(msg.sender === "system" && msg.text === "Listening...")
          )
        );
      };
    }
    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (synthRef.current) synthRef.current.cancel();
    };
    // eslint-disable-next-line
  }, []);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text, timestamp: new Date() }]);
  };

  const speakText = (text) => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      synthRef.current.speak(utterance);
    }
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    addMessage("user", messageText);
    setInput("");
    setIsLoading(true);
    try {
      let chatHistory = messages.map((msg) => ({
        role:
          msg.sender === "user"
            ? "user"
            : msg.sender === "assistant"
            ? "model"
            : "user",
        parts: [{ text: msg.text }],
      }));
      chatHistory.push({ role: "user", parts: [{ text: messageText }] });

      const payload = { contents: chatHistory };
      // Change this URL and port to your backend!
      const apiUrl = "http://localhost:3001/api/assistant";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API error: ${response.status} - ${
            errorData.error?.message || errorData.error || "Unknown error"
          }`
        );
      }

      const result = await response.json();
      if (result.reply) {
        addMessage("assistant", result.reply);
        speakText(result.reply);
      } else if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const assistantResponse = result.candidates[0].content.parts[0].text;
        addMessage("assistant", assistantResponse);
        speakText(assistantResponse);
      } else {
        addMessage(
          "assistant",
          "Sorry, I could not get a response from the assistant."
        );
        console.error(
          "Unexpected API response structure from backend:",
          result
        );
      }
    } catch (error) {
      addMessage(
        "assistant",
        `Error: ${error.message || "The assistant could not answer."}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setMessages((msgs) =>
        msgs.filter(
          (msg) => !(msg.sender === "system" && msg.text === "Listening...")
        )
      );
      recognitionRef.current.start();
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking((prev) => {
      if (prev && synthRef.current) synthRef.current.cancel();
      return !prev;
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md bg-gray-800 rounded-lg shadow-2xl p-6 border border-purple-700 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-800">
        <h2 className="text-2xl font-bold text-purple-400">Aether Assistant</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSpeaking}
            className={`p-2 rounded-full ${
              isSpeaking
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-lg`}
            title={
              isSpeaking ? "Disable Speech Output" : "Enable Speech Output"
            }
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {isSpeaking ? (
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 6.343a1 1 0 01.175 1.493l-1.493 1.494a1 1 0 01-1.414-1.414l1.494-1.494a1 1 0 011.414 0zM16.071 5a1 1 0 01.175 1.493L14.752 8.5a1 1 0 01-1.414-1.414l1.494-1.494A1 1 0 0116.071 5zm-1.414 7.071a1 1 0 011.414 1.414l-1.494 1.494a1 1 0 01-1.414-1.414l1.494-1.494z"
                  clipRule="evenodd"
                ></path>
              ) : (
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 6.343a1 1 0 01.175 1.493l-1.493 1.494a1 1 0 01-1.414-1.414l1.494-1.494a1 1 0 011.414 0zM16.071 5a1 1 0 01.175 1.493L14.752 8.5a1 1 0 01-1.414-1.414l1.494-1.494A1 1 0 0116.071 5zm-1.414 7.071a1 1 0 011.414 1.414l-1.494 1.494a1 1 0 01-1.414-1.414l1.494-1.494z"
                  clipRule="evenodd"
                ></path>
              )}
            </svg>
          </button>
          <span className="text-sm text-gray-400">
            {isSpeaking ? "Speaking" : "Muted"}
          </span>
        </div>
      </div>
      {/* Scrollable chat area */}
      <div
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
        style={{ minHeight: 320, maxHeight: 400 }}
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p>Hello! How can I assist you today?</p>
            <p className="text-sm mt-2">
              Try asking about my projects or skills.
            </p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : msg.sender === "assistant"
                  ? "bg-gray-700 text-gray-200 rounded-bl-none"
                  : "bg-green-700 text-white text-sm rounded-lg"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs text-gray-400 block mt-1 text-right">
                {msg.timestamp
                  ? msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="max-w-[80%] p-3 rounded-lg shadow-md bg-gray-700 text-gray-200 rounded-bl-none">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce mr-1"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce mr-1 delay-150"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                <span className="ml-2 text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="flex mt-4 pt-4 border-t border-purple-800">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-purple-500 placeholder-gray-400"
          placeholder={isListening ? "Listening..." : "Type your message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || isListening}
        />
        <button
          onClick={toggleListening}
          className={`p-3 rounded-none ${
            isListening
              ? "bg-red-600 hover:bg-red-700"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center`}
          title={isListening ? "Stop Listening" : "Start Voice Input"}
          disabled={isLoading}
        >
          {isListening ? (
            <svg
              className="w-6 h-6 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a4 4 0 01-4-4V6a4 4 0 014-4 4 4 0 014 4v2a4 4 0 01-4 4z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a4 4 0 01-4-4V6a4 4 0 014-4 4 4 0 014 4v2a4 4 0 01-4 4z"
              />
            </svg>
          )}
        </button>
        <button
          onClick={() => sendMessage(input)}
          className="p-3 rounded-r-lg bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ml-1 flex items-center justify-center"
          title="Send Message"
          disabled={isLoading || !input.trim()}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #881337; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #be185d; }
      `}</style>
    </div>
  );
};

// ========== Floating Launcher ==========
const AssistantWrapper = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  // Escape key closes assistant
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setShowAssistant(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Launcher button */}
      {!showAssistant && (
        <button
          onClick={() => setShowAssistant(true)}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-purple-600 shadow-lg text-white text-2xl hover:bg-purple-800 transition"
          aria-label="Open Aether Assistant"
        >
          🤖
        </button>
      )}
      {/* Assistant Panel */}
      {showAssistant && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative">
            <AetherAssistant />
            <button
              onClick={() => setShowAssistant(false)}
              className="absolute -top-4 -right-4 bg-gray-900 text-white rounded-full p-2 shadow hover:bg-red-600 transition"
              aria-label="Close Assistant"
              title="Close Assistant"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistantWrapper;
