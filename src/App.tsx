import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { DoctorProfile } from "./components/DoctorProfile";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { AIDentalAssistant } from "./components/AIDentalAssistant";
import { PatientPortal } from "./components/PatientPortal";
import { ContactLocation } from "./components/ContactLocation";
import { Chatbot } from "./components/Chatbot";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [bookingTriggerCounter, setBookingTriggerCounter] = useState(0);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium expo ease out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [activeSection]);

  // Smooth page navigation and scroll resetting
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({
      top: 0,
      behavior: "instant" as any // instant is cleaner with transition layout shifts
    });
  };

  const handleAppointmentBooked = (appointment: any) => {
    setBookingTriggerCounter((prev) => prev + 1);
  };

  // Define premium animation configurations for slide/fade transitions
  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 0.995 }
  };

  const pageTransition = {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1] // Out-quintic premium transition
  };

  const renderActivePage = () => {
    switch (activeSection) {
      case "home":
        return (
          <motion.div
            key="home-page"
            id="home-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            <Hero onNavigate={handleNavigate} />
            <WhyChooseUs />
          </motion.div>
        );
      case "services":
        return (
          <motion.div
            key="services-page"
            id="services-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            <Services onNavigate={handleNavigate} />
          </motion.div>
        );
      case "about":
        return (
          <motion.div
            key="about-page"
            id="about-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full space-y-4"
          >
            <About />
            <DoctorProfile />
          </motion.div>
        );
      case "ai-assistant":
        return (
          <motion.div
            key="ai-assistant-page"
            id="ai-assistant-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            <AIDentalAssistant 
              onNavigate={handleNavigate} 
              onAppointmentBooked={handleAppointmentBooked} 
            />
          </motion.div>
        );
      case "patient-portal":
        return (
          <motion.div
            key="patient-portal-page"
            id="patient-portal-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            <PatientPortal 
              onNavigate={handleNavigate} 
              bookingTriggerCounter={bookingTriggerCounter} 
            />
          </motion.div>
        );
      case "contact":
      case "location":
        return (
          <motion.div
            key="contact-location-page"
            id="contact-location-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            <ContactLocation onNavigate={handleNavigate} />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home-page"
            id="home-page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            <Hero onNavigate={handleNavigate} />
            <WhyChooseUs />
          </motion.div>
        );
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-stone-50/20 flex flex-col justify-between selection:bg-powder-200 selection:text-powder-950 relative">
      {/* Sticky Premium Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Animated Page Container */}
      <main className="flex-1 overflow-x-hidden pt-16">
        <AnimatePresence mode="wait">
          {renderActivePage()}
        </AnimatePresence>
      </main>

      {/* Floating Dhir AI Chatbot (Bottom Right corner) */}
      <Chatbot />

      {/* Footing Details */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
