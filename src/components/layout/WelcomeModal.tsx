import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const STORAGE_KEY = "dhir-welcome-seen-v1";

// One-time welcome shown on a visitor's FIRST view of the site.
export const WelcomeModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* private mode / storage blocked — still show once per session */
    }
    if (!seen) {
      // small delay so it lands after the first paint, not jarringly instant
      const t = setTimeout(() => setOpen(true), 450);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" onClick={dismiss} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            className="relative w-full max-w-lg overflow-hidden rounded-[26px] bg-teal-deep text-turq-50 shadow-2xl border border-turq-500/20"
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* soft turquoise glow */}
            <div className="absolute inset-0 opacity-[0.16] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 20% 15%, #12B8B0, transparent 45%), radial-gradient(circle at 85% 90%, #12B8B0, transparent 45%)" }} />

            <button onClick={dismiss} aria-label="Close" className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg grid place-items-center text-turq-50/60 hover:text-white hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="relative px-7 sm:px-10 py-11 text-center">
              <span className="block w-10 h-px bg-turq-400/70 mx-auto mb-5" aria-hidden="true" />
              <p className="text-[12px] font-bold tracking-[0.28em] uppercase text-turq-300 mb-4">A First Look</p>
              <h2 id="welcome-title" className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold tracking-tight text-white mb-5">
                Welcome, <span className="italic font-bold text-turq-300">Dr. Dhir.</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-turq-50/85 max-w-md mx-auto">
                This is the <span className="text-turq-300 font-semibold">first look</span> of your new web presence — a foundation, not the finished picture. With your photographs, your patient reviews and your ideas, it can grow into something even more beautiful and truly yours.
              </p>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-turq-50/65 max-w-md mx-auto mt-4">
                Explore every page, and tell me what feels right and what you'd love to change. We'll shape it together.
              </p>
              <button
                onClick={dismiss}
                className="mt-8 inline-flex items-center justify-center min-h-[52px] px-9 rounded-2xl bg-turq-500 text-white font-bold tracking-[0.12em] uppercase text-[13px] hover:bg-turq-400 transition-colors shadow-[0_10px_30px_-8px_rgba(18,184,176,0.6)]"
              >
                Take a Look
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
