import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Phone, Sparkles, MapPin, Clock, Star, Award, Zap, ShieldCheck, Stethoscope, Activity, Heart, HelpCircle, Info, Trophy } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>("crown");
  return (
    <section id="home" className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-16 max-w-7xl mx-auto">
      {/* Soft Powder Blue rounded hero container */}
      <div className="relative bg-gradient-to-br from-powder-50 via-powder-100 to-powder-200/60 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 overflow-hidden border border-powder-100 shadow-premium">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-powder-300/30 rounded-full blur-3xl -z-10" />

        {/* Hero Grid layout: Left (7 cols), Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left-side content (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-powder-200 text-powder-900 text-[10px] font-bold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-powder-600" />
              <span>Fully-Digital Multispeciality Dental Hospital</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading text-powder-950 font-bold leading-tight">
              Dr. Dhir’s Dental Care Multispeciality Hospital
            </h1>
            <p className="text-base sm:text-lg font-display font-semibold text-powder-800 tracking-tight leading-snug">
              Smiles Guaranteed — Faridkot Road, Kot Kapura
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans max-w-lg"
            >
              Advanced dental treatments led by <strong>Dr. Kuldip Dhir, MDS</strong> — RCT Specialist, Ex Deputy Director, Ex Deputy Medical Commissioner, and Ex SMO. Trusted, ethical, and patient-focused dental care for every smile.
            </motion.p>

            {/* Primary & Secondary Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                id="hero-book-appt-btn"
                onClick={() => onNavigate("contact")}
                className="px-5 py-3 rounded-xl bg-powder-950 text-white font-bold text-xs tracking-wider uppercase hover:bg-powder-800 transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                Book Appointment
              </button>

              <a
                id="hero-call-now-btn"
                href="tel:+917009488220"
                className="px-5 py-3 rounded-xl bg-white border border-powder-200 text-powder-950 font-bold text-xs tracking-wider uppercase hover:bg-powder-50 transition-all shadow-sm hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-powder-700" />
                <span>Call Now</span>
              </a>

              <button
                id="hero-explore-services-btn"
                onClick={() => onNavigate("services")}
                className="group px-3 py-3 text-gray-600 hover:text-powder-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Services</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </motion.div>

            {/* Micro Stats inside Hero */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-powder-200/50">
              <div className="text-left space-y-1">
                <div className="text-lg sm:text-xl font-display font-bold text-powder-950">35+</div>
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider leading-tight">Years Exp.</div>
              </div>
              <div className="text-left space-y-1">
                <div className="text-lg sm:text-xl font-display font-bold text-powder-950">10k+</div>
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider leading-tight">Smiles</div>
              </div>
              <div className="text-left space-y-1">
                <div className="text-lg sm:text-xl font-display font-bold text-powder-950">#1</div>
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider leading-tight">Faridkot Rank</div>
              </div>
            </div>
          </div>

          {/* Right 3D dental visual (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-premium p-4"
            >
              {/* Spinning background organic rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-white/40 border-dashed rounded-full -z-10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-powder-300/30 rounded-full -z-10"
              />

              {/* Float container with custom SVG tooth/implant 3D structure */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-44 h-56 sm:w-52 sm:h-64 flex items-center justify-center"
              >
                <svg viewBox="0 0 200 280" className="w-full h-full select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Natural Molar Base Dentin Gradient */}
                    <linearGradient id="dentinGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#f5efe0" />
                      <stop offset="35%" stopColor="#fdfbf7" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>

                    {/* Translucent Enamel Layer Gradient */}
                    <linearGradient id="enamelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="25%" stopColor="#f8fbfd" />
                      <stop offset="75%" stopColor="#f3f8fd" />
                      <stop offset="100%" stopColor="#d1e2f5" />
                    </linearGradient>

                    {/* Crown Shadow/Glow Gradient */}
                    <radialGradient id="crownGlow" cx="50%" cy="40%" r="50%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="70%" stopColor="#f0f6fc" />
                      <stop offset="100%" stopColor="#cbdbe9" />
                    </radialGradient>

                    {/* Highly Polished Chrome/Platinum Abutment */}
                    <linearGradient id="polishedMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="20%" stopColor="#94a3b8" />
                      <stop offset="40%" stopColor="#e2e8f0" />
                      <stop offset="45%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#cbd5e1" />
                      <stop offset="80%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    {/* Warm Gold-Nitride Medical Coating */}
                    <linearGradient id="goldCollar" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="15%" stopColor="#d97706" />
                      <stop offset="35%" stopColor="#fcd34d" />
                      <stop offset="50%" stopColor="#fffbeb" />
                      <stop offset="65%" stopColor="#f59e0b" />
                      <stop offset="85%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>

                    {/* Deep Medical-Grade Titanium Screw Base */}
                    <linearGradient id="titaniumScrew" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="15%" stopColor="#334155" />
                      <stop offset="35%" stopColor="#64748b" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="65%" stopColor="#475569" />
                      <stop offset="85%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>

                    {/* Soft Inner Shadow/Ambient Occlusion */}
                    <linearGradient id="aoShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Organic Gingival Collar Warmth */}
                    <linearGradient id="gingivalWarmth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fda4af" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* 3D Base Ambient Shadow */}
                  <ellipse cx="100" cy="268" rx="42" ry="7" fill="#000000" fillOpacity="0.14" filter="blur(4px)" />
                  <ellipse cx="100" cy="268" rx="20" ry="3.5" fill="#000000" fillOpacity="0.25" filter="blur(1.5px)" />

                  {/* ==================== 1. DEEP TITANIUM IMPLANT SCREW ==================== */}
                  <g id="implant-screw">
                    {/* Tapered screw core solid silhouette */}
                    <path d="M 74 168 L 126 168 L 112 254 C 112 257, 88 257, 88 254 Z" fill="url(#titaniumScrew)" />

                    {/* Individual Helical 3D Thread Flanges */}
                    {/* Thread 1 (Top) */}
                    <path d="M 72 173 C 72 173, 100 177, 128 173 L 125 180 C 125 180, 100 184, 75 180 Z" fill="url(#titaniumScrew)" />
                    <path d="M 73 173 C 85 175, 115 175, 127 173" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" />
                    
                    {/* Thread 2 */}
                    <path d="M 74 186 C 74 186, 100 190, 126 186 L 123 193 C 123 193, 100 197, 77 193 Z" fill="url(#titaniumScrew)" />
                    <path d="M 75 186 C 85 188, 115 188, 125 186" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />

                    {/* Thread 3 */}
                    <path d="M 76 199 C 76 199, 100 203, 124 199 L 121 206 C 121 206, 100 210, 79 206 Z" fill="url(#titaniumScrew)" />
                    <path d="M 77 199 C 85 201, 115 201, 123 199" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />

                    {/* Thread 4 */}
                    <path d="M 78 212 C 78 212, 100 216, 122 212 L 119 219 C 119 219, 100 223, 81 219 Z" fill="url(#titaniumScrew)" />
                    <path d="M 79 212 C 87 214, 113 214, 121 212" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />

                    {/* Thread 5 */}
                    <path d="M 81 225 C 81 225, 100 229, 119 225 L 116 232 C 116 232, 100 236, 84 232 Z" fill="url(#titaniumScrew)" />
                    <path d="M 82 225 C 90 227, 110 227, 118 225" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />

                    {/* Thread 6 (Bottom narrow) */}
                    <path d="M 84 238 C 84 238, 100 242, 116 238 L 112 245 C 112 245, 100 249, 88 245 Z" fill="url(#titaniumScrew)" />
                    <path d="M 85 238 C 92 240, 108 240, 115 238" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />

                    {/* Vertical relief grooves (3D cutting notches typical of bio-integrable implants) */}
                    <path d="M 92 170 Q 94 210, 93 250" stroke="#0f172a" strokeWidth="2.5" strokeOpacity="0.45" strokeLinecap="round" />
                    <path d="M 108 170 Q 106 210, 107 250" stroke="#0f172a" strokeWidth="2.5" strokeOpacity="0.45" strokeLinecap="round" />
                    
                    {/* Core cylindrical light reflection streak */}
                    <path d="M 100 170 L 100 252" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.18" strokeLinecap="round" filter="blur(1px)" />
                  </g>

                  {/* ==================== 2. GOLD-ANODIZED TRANSITION RING ==================== */}
                  <g id="gold-collar">
                    <path d="M 76 168 C 76 168, 100 172, 124 168 L 122 163 C 122 163, 100 167, 78 163 Z" fill="url(#goldCollar)" />
                    {/* Metal rim highlight */}
                    <path d="M 76 168 Q 100 172, 124 168" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.8" />
                  </g>

                  {/* ==================== 3. PRECISION MILLED METALLIC ABUTMENT ==================== */}
                  <g id="abutment">
                    {/* Main conical connection post */}
                    <path d="M 78 163 L 122 163 L 114 140 L 86 140 Z" fill="url(#polishedMetal)" />
                    
                    {/* Interlocking hexagonal shoulder */}
                    <path d="M 83 140 L 117 140 L 113 134 L 87 134 Z" fill="url(#polishedMetal)" />
                    
                    {/* High-contrast metallic horizontal segments / grooves */}
                    <line x1="81" y1="156" x2="119" y2="156" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.3" />
                    <line x1="84" y1="148" x2="116" y2="148" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                    
                    {/* Bright specular vertical shine */}
                    <path d="M 100 134 L 100 163" stroke="#ffffff" strokeWidth="4" strokeOpacity="0.6" filter="blur(1px)" />
                    <path d="M 98 134 L 98 163" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
                  </g>

                  {/* ==================== 4. BIOLOGICAL PORCELAIN CROWN ==================== */}
                  <g id="porcelain-crown">
                    {/* Underlying warm dentin core to give anatomical light-scattering */}
                    <path d="M 68 131 
                             C 56 120, 52 90, 55 75 
                             C 58 60, 72 52, 82 60 
                             C 88 65, 95 65, 100 60 
                             C 105 65, 112 65, 118 60 
                             C 128 52, 142 60, 145 75 
                             C 148 90, 144 120, 132 131 Z" 
                          fill="url(#dentinGrad)" opacity="0.8" />

                    {/* Outer premium high-translucent porcelain envelope */}
                    <path d="M 58 134 
                             C 40 125, 36 82, 42 60 
                             C 48 38, 68 28, 80 42 
                             C 88 51, 95 51, 100 42 
                             C 105 51, 112 51, 120 42 
                             C 132 28, 152 38, 158 60 
                             C 164 82, 160 125, 142 134 
                             C 134 138, 66 138, 58 134 Z" 
                          fill="url(#crownGlow)" stroke="#94a3b8" strokeWidth="1.25" strokeOpacity="0.4" />

                    {/* Incisal glass translucent blue edge gradient */}
                    <path d="M 58 134 
                             C 40 125, 36 82, 42 60 
                             C 48 38, 68 28, 80 42 
                             C 88 51, 95 51, 100 42 
                             C 105 51, 112 51, 120 42 
                             C 132 28, 152 38, 158 60 
                             C 164 82, 160 125, 142 134 Z" 
                          fill="url(#enamelGrad)" opacity="0.75" style={{ mixBlendMode: "multiply" }} />

                    {/* Biological molar grooves & fissure anatomy */}
                    <path d="M 80 42 C 86 58, 94 62, 100 78" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 120 42 C 114 58, 106 62, 100 78" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 100 78 C 100 88, 100 95, 100 110" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                    
                    <path d="M 80 42 C 86 58, 94 62, 100 78" stroke="#a5f3fc" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />
                    <path d="M 120 42 C 114 58, 106 62, 100 78" stroke="#a5f3fc" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />

                    {/* Cervical margin warm shadow - merges tooth naturally into collar */}
                    <path d="M 58 134 C 66 138, 134 138, 142 134 L 128 135 C 110 137, 90 137, 72 135 Z" fill="url(#gingivalWarmth)" />

                    {/* Deep occlusal fissure shading */}
                    <circle cx="100" cy="78" r="4" fill="#64748b" opacity="0.3" filter="blur(1px)" />

                    {/* 3D Curved surface highlights & glossy reflections */}
                    {/* Main left vertical gloss highlight */}
                    <path d="M 48 70 C 45 55, 52 44, 64 38 C 55 45, 49 56, 50 72 C 51 86, 54 98, 58 110" 
                          fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.75" filter="blur(0.5px)" />
                    
                    {/* Secondary right small specular dot */}
                    <path d="M 148 58 C 151 68, 149 82, 145 94" 
                          fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
                    
                    {/* Crown cusp crest glossy accent dots */}
                    <circle cx="72" cy="46" r="2.5" fill="#ffffff" fillOpacity="0.8" />
                    <circle cx="128" cy="46" r="2.5" fill="#ffffff" fillOpacity="0.8" />
                  </g>
                </svg>

                {/* Hotspot indicators on model */}
                {/* 1. Crown Hotspot */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("crown")}
                  className={`absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${activeHotspot === "crown" ? "bg-powder-950 scale-110" : "bg-white border border-powder-200 hover:bg-powder-50"} shadow-md z-20 cursor-pointer`}
                  title="Porcelain Crown"
                >
                  <span className={`absolute inset-0 rounded-full animate-ping bg-powder-400 opacity-60 ${activeHotspot === "crown" ? "" : "hidden"}`} />
                  <span className={`w-2 h-2 rounded-full ${activeHotspot === "crown" ? "bg-white" : "bg-powder-800"}`} />
                </button>

                {/* 2. Abutment Hotspot */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("abutment")}
                  className={`absolute top-[58%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${activeHotspot === "abutment" ? "bg-powder-950 scale-110" : "bg-white border border-powder-200 hover:bg-powder-50"} shadow-md z-20 cursor-pointer`}
                  title="Precision Abutment"
                >
                  <span className={`absolute inset-0 rounded-full animate-ping bg-powder-400 opacity-60 ${activeHotspot === "abutment" ? "" : "hidden"}`} />
                  <span className={`w-2 h-2 rounded-full ${activeHotspot === "abutment" ? "bg-white" : "bg-powder-800"}`} />
                </button>

                {/* 3. Implant Hotspot */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot("implant")}
                  className={`absolute top-[78%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${activeHotspot === "implant" ? "bg-powder-950 scale-110" : "bg-white border border-powder-200 hover:bg-powder-50"} shadow-md z-20 cursor-pointer`}
                  title="Titanium Implant Root"
                >
                  <span className={`absolute inset-0 rounded-full animate-ping bg-powder-400 opacity-60 ${activeHotspot === "implant" ? "" : "hidden"}`} />
                  <span className={`w-2 h-2 rounded-full ${activeHotspot === "implant" ? "bg-white" : "bg-powder-800"}`} />
                </button>
              </motion.div>

            </motion.div>

            {/* Dynamic Interactive Description Card for selected hotspot */}
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 max-w-xs bg-white border border-gray-100 rounded-2xl p-3.5 shadow-premium text-left relative"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded bg-powder-50 flex items-center justify-center text-powder-800">
                      <Info className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-bold text-powder-950 uppercase tracking-wider">
                      {activeHotspot === "crown" && "1. Porcelain Crown"}
                      {activeHotspot === "abutment" && "2. Precision Abutment"}
                      {activeHotspot === "implant" && "3. Titanium Implant Root"}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-normal font-sans">
                    {activeHotspot === "crown" && "Individually handcrafted biocompatible porcelain crown styled to perfectly mimic natural enamel luster with premium fracture-resistant durability."}
                    {activeHotspot === "abutment" && "A titanium connector collar that anchors the porcelain crown to the underlying implant, creating a solid hermetic biological seal."}
                    {activeHotspot === "implant" && "Surgical-grade tapered titanium screw threads reproducing natural root biology to stimulate bone integrity and offer lifetime dental stability."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Trust Badges Row */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "RCT Specialist", desc: "MDS Specialization", icon: Stethoscope },
          { label: "MDS Qualified", desc: "Highest Dental Credentials", icon: Award },
          { label: "35+ Years Experience", desc: "Senior Specialist Since 1990s", icon: Clock },
          { label: "Faridkot Rank #1", desc: "FDILB 2024 Edition", icon: Star },
          { label: "Fully Digital Clinic", desc: "Advanced Digital Dentistry", icon: ShieldCheck },
        ].map((badge, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-powder-50 border border-powder-100 flex items-center justify-center text-powder-950 mb-3 group-hover:bg-powder-950 group-hover:text-white transition-all duration-300">
              <badge.icon className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 tracking-tight leading-tight">{badge.label}</h3>
            <p className="text-[10px] text-gray-500 font-medium mt-1 leading-none">{badge.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Short Introduction Section */}
      <div className="mt-16 bg-white border border-gray-150 rounded-[2rem] p-8 sm:p-10 shadow-premium relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-powder-50/50 rounded-full blur-3xl -z-10" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-800">
            <span className="w-1.5 h-1.5 rounded-full bg-powder-500 animate-pulse" />
            <span>Welcome to Dr. Dhir's Dental Care Multispeciality Hospital</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight">
            Kot Kapura's Fully-Digital Dental Hospital — Smiles Guaranteed
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            At Dr. Dhir's Dental Care Multispeciality Hospital, we run Kot Kapura's most advanced fully-digital dental clinic — complete dental care and treatments for all, with every smile guaranteed. Led by <strong>Dr. Kuldip Dhir, MDS</strong>, former Deputy Director and Ex-SMO with over 35 years of clinical excellence, we are proud recipients of the <strong>FDILB 2024 Faridkot Rank #1</strong> and the AIC Medal Ceremony recognition. From painless single-visit root canals to complete cosmetic smile design, we deliver Punjab's highest standard of dental care.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-powder-600" />
                Rigid clinical hygiene
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed pl-3.5">
                We implement rigid multi-stage autoclave sterilization protocols and single-use barrier supplies to guarantee your complete physical safety.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-powder-600" />
                Anxiety-free patient experience
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed pl-3.5">
                Our treatment operatory features modern, ergonomic relaxation chairs and exceptionally gentle clinical hand techniques to ease all dental worries.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
