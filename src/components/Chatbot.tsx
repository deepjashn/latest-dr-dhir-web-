import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, X, Send, Sparkles, Phone, MapPin, 
  Clock, ShieldCheck, AlertCircle, Trash2, HelpCircle 
} from "lucide-react";
import { ChatMessage } from "../types";

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Default introductory message
  const welcomeMessage: ChatMessage = {
    id: "welcome",
    sender: "assistant",
    text: `Hello! I am **Dhir AI Dental Assistant** 🦷. 

I can help guide you with:
• Clinic hours & Services offered
• Working address & Location in Kot Kapura
• Gentle dental self-care tips
• Symptom guidance and booking options

**Disclaimers:** I am an informational AI assistant, not a dentist. I cannot provide diagnoses. For physical care, please consult Dr. Kuldip Dhir, MDS at our clinic.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  useEffect(() => {
    // Load initial greeting
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    // Scroll to bottom on new messages
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({
            role: m.sender === "user" ? "user" : "model",
            text: m.text
          }))
        }),
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat failure:", err);
      // fallback generic
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now()}-fallback`,
        sender: "assistant",
        text: `My apologies, I had a brief connection issue. 

Please remember:
• **Clinic Address**: Dhir Complex, Near Petrol Pump, Faridkot Road, Kot Kapura, Punjab.
• **Contact Telephone**: 070094 88220 (Call for bookings).
• **RCT Specialist**: Led by Senior Specialist Dr. Kuldip Dhir, MDS.

Disclaimer: For any severe toothache, swelling, or clinical consultation, please consult the clinic physically.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
  };

  const quickPrompts = [
    "Where is the clinic?",
    "Root Canal Treatment info",
    "How do I book an appointment?",
    "Severe Toothache emergency",
    "Clinic working hours"
  ];

  return (
    <div id="floating-chatbot-container" className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Sparkly Button */}
      <motion.button
        id="chatbot-trigger-bubble"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-powder-950 text-white flex items-center justify-center shadow-lg hover:bg-powder-800 cursor-pointer relative"
        title="Dhir AI Dental Assistant"
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-powder-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-powder-400"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-powder-950 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-powder-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  D
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-xs sm:text-sm leading-tight">Dhir AI Assistant</h4>
                  <span className="text-[9px] text-powder-300 font-mono flex items-center gap-1 leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Clinic Informational AI</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                  title="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                  title="Hide Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed text-left whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-powder-600 text-white rounded-tr-none shadow-sm"
                        : "bg-white border border-gray-150 text-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {/* Basic safe rendering of bullet list markdown */}
                    {msg.text.split("\n").map((line, idx) => {
                      if (line.trim().startsWith("•")) {
                        return (
                          <li key={idx} className="list-disc list-inside pl-1 text-[11px] sm:text-xs text-gray-700 font-medium">
                            {line.replace("•", "").trim()}
                          </li>
                        );
                      }
                      // Handle simple double asterisks for bolding
                      if (line.includes("**")) {
                        const parts = line.split("**");
                        return (
                          <p key={idx} className="mb-1 text-xs sm:text-sm">
                            {parts[0]}<strong>{parts[1]}</strong>{parts[2]}
                          </p>
                        );
                      }
                      return <p key={idx} className="mb-1 text-xs sm:text-sm">{line}</p>;
                    })}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 font-mono px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="p-3 bg-white border border-gray-150 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(p)}
                    className="inline-block px-3 py-1.5 bg-stone-50 border border-gray-100 hover:border-powder-200 hover:bg-powder-50 text-[10px] font-bold text-powder-800 rounded-full transition-all cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                className="flex-1 bg-stone-50 text-xs sm:text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-powder-500 text-gray-800"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-powder-600 text-white hover:bg-powder-700 disabled:opacity-40 transition-all cursor-pointer"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
