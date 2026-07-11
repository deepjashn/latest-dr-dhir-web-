import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "About", target: "about" },
    { label: "AI Dental Assistant", target: "ai-assistant" },
    { label: "Patient Care Portal", target: "patient-portal" },
    { label: "Contact & Location", target: "contact" },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 max-w-7xl mx-auto ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-premium border border-gray-100 rounded-2xl py-2.5 px-6"
          : "bg-white/30 backdrop-blur-sm border border-white/20 rounded-2xl py-3 px-6"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left: Clinic logo and clinic name */}
        <div
          id="brand-logo-container"
          onClick={() => handleItemClick("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-powder-950 flex items-center justify-center text-white font-semibold text-lg shadow-sm transition-transform group-hover:scale-105">
            D
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-sm tracking-tight text-powder-950 leading-none">
              Dr. Dhir’s
            </span>
            <span className="text-[10px] font-medium text-powder-600 mt-0.5 leading-none">
              Dental Care Multispeciality
            </span>
          </div>
        </div>

        {/* Centre navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navItems.map((item) => (
            <button
              key={item.target}
              id={`nav-link-${item.target}`}
              onClick={() => handleItemClick(item.target)}
              className={`relative text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer py-1 ${
                activeSection === item.target
                  ? "text-powder-950 font-bold"
                  : "text-gray-500 hover:text-powder-950"
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.target && (
                <motion.div
                  layoutId="activeNavDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-powder-900 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Book Appointment */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Book Appointment button */}
          <button
            id="header-book-btn"
            onClick={() => handleItemClick("contact")}
            className="px-4.5 py-2 rounded-xl bg-powder-950 text-white font-semibold text-xs tracking-wide uppercase hover:bg-powder-800 shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            id="mobile-phone-shortcut-btn"
            href="tel:+917009488220"
            className="p-2 rounded-xl border border-gray-100 text-powder-950 hover:bg-powder-50"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            id="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-600 hover:text-powder-950 hover:bg-powder-50 focus:outline-none cursor-pointer border border-transparent hover:border-gray-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden mt-3 bg-white border border-gray-100 rounded-2xl overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  id={`mobile-nav-link-${item.target}`}
                  onClick={() => handleItemClick(item.target)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeSection === item.target
                      ? "bg-powder-50 text-powder-950 font-bold"
                      : "text-gray-500 hover:bg-gray-50 hover:text-powder-950"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100 flex flex-col gap-2.5">
                <button
                  id="mobile-drawer-book-btn"
                  onClick={() => handleItemClick("contact")}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-powder-950 text-white font-semibold text-xs tracking-wider uppercase shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
