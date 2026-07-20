import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Calendar } from "lucide-react";
import { NAV, CLINIC, trackEvent } from "../../content/site";
import { useAppointment } from "./AppointmentModal";

// Sticky primary header with router-aware nav, WhatsApp action + booking CTA.
export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useAppointment();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-[900] bg-white/95 backdrop-blur-md transition-shadow ${scrolled ? "shadow-sm border-b border-hairline" : "border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[74px] flex items-center gap-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="w-11 h-11 rounded-xl grid place-items-center text-white shrink-0" style={{ background: "linear-gradient(140deg,#102A43,#2878B5)" }}>
            <ToothMark />
          </span>
          <span className="leading-tight">
            <b className="block text-[17px] font-extrabold text-brand-950 tracking-tight font-display">Dr. Dhir's</b>
            <span className="block text-[11px] font-semibold text-body/70">Dental Care Multispeciality Hospital</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `text-[15px] font-semibold px-3 py-2 rounded-lg transition-colors ${isActive ? "text-brand-950 bg-brand-50" : "text-body hover:bg-brand-50 hover:text-brand-950"}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 ml-auto">
          <a href={CLINIC.whatsappBase} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("wa_click", "header")} aria-label="WhatsApp the clinic" className="w-11 h-11 rounded-xl bg-wa text-white grid place-items-center hover:bg-wa-dark transition-colors">
            <WaMark />
          </a>
          <button onClick={() => open("header")} className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-950 text-white font-semibold text-[15px] hover:bg-brand-900 transition-colors">
            Book Appointment
          </button>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="lg:hidden w-11 h-11 rounded-lg grid place-items-center text-brand-950 hover:bg-brand-50">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="fixed inset-0 bg-brand-950/50 z-[950] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />
            <motion.aside className="fixed top-0 right-0 h-full w-[86vw] max-w-[340px] bg-white z-[960] p-5 flex flex-col lg:hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
              <div className="flex items-center justify-between mb-6">
                <b className="font-display text-lg font-extrabold text-brand-950">Dr. Dhir's</b>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="w-10 h-10 rounded-lg grid place-items-center text-brand-950 hover:bg-brand-50"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((n) => (
                  <NavLink key={n.to} to={n.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `px-3 py-3 rounded-lg font-semibold text-[17px] ${isActive ? "bg-brand-50 text-brand-950" : "text-ink hover:bg-brand-50"}`}>
                    {n.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto pt-5 flex flex-col gap-2.5">
                <button onClick={() => { setMenuOpen(false); open("mobile_drawer"); }} className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-950 text-white font-semibold">
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
                <a href={CLINIC.whatsappBase} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("wa_click", "mobile_drawer")} className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-wa text-white font-semibold">
                  <WaMark /> WhatsApp the Clinic
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

const ToothMark = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5.5c-1.5-1.5-4-2-5.5-1C5 5.5 4.5 7.5 5 10c.4 2 .8 3.5 1.2 5.5.3 1.6.6 3 1.3 3s.9-1.2 1.2-2.6c.3-1.3.6-2.4 1.3-2.4s1 1.1 1.3 2.4c.3 1.4.5 2.6 1.2 2.6s1-1.4 1.3-3c.4-2 .8-3.5 1.2-5.5.5-2.5 0-4.5-1.5-5.5-1.5-1-4-.5-5.5 1z" />
  </svg>
);
const WaMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
  </svg>
);
