import React from "react";
import { motion } from "motion/react";
import { Users, Cpu, Heart, ShieldCheck, HelpCircle, UserCheck, Star, Sparkles, Scale, ShieldAlert, MapPin, Activity } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";

interface WhyItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const WhyChooseUs: React.FC = () => {
  const points: WhyItem[] = [
    {
      title: "Senior Experienced Dental Specialist",
      description: "Led by Dr. Kuldip Dhir, MDS with over 35 years of clinical and state healthcare leadership (Ex-Deputy Director & Ex-SMO).",
      icon: <UserCheck className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Advanced Dental Treatments",
      description: "State-of-the-art single-visit root canal therapies (RCT), digital diagnostics, and premium bio-compatible dental crowns.",
      icon: <Cpu className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Hygienic & Safe Environment",
      description: "Rigorous international class multi-stage autoclave sterilization protocols and disposable barrier systems.",
      icon: <ShieldAlert className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Personalized Treatment Plans",
      description: "Customized diagnostic roadmaps explained in plain, patient-friendly terms using low-radiation imaging.",
      icon: <Users className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Comfortable Patient Experience",
      description: "Anxiety-free operatory equipped with dental relaxation chairs and extremely gentle clinical hands.",
      icon: <Heart className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Trusted Dental Care in Kot Kapura",
      description: "Over thousands of healthy smiles restored. Recognized as Kot Kapura and Faridkot's preferred dental clinic.",
      icon: <MapPin className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Ethical Consultation",
      description: "Complete cost transparency up-front with zero hidden fees. We advise only the procedures you genuinely require.",
      icon: <Scale className="w-5 h-5 text-powder-900" />,
    },
    {
      title: "Patient-Focused Approach",
      description: "Thorough follow-ups, responsive support, and active patient care tracking for long-term oral well-being.",
      icon: <Activity className="w-5 h-5 text-powder-900" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
        duration: 0.6,
      },
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 14,
      },
    },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.12, rotate: 8, transition: { type: "spring", stiffness: 300, damping: 10 } },
  };

  return (
    <section id="technology" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-left max-w-3xl space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Higher Standard of Care</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading font-medium tracking-tight text-powder-950 leading-none">
          Why Patients Trust Our Clinic
        </h2>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans max-w-2xl">
          We hold ourselves to strict standards of excellence. From senior expertise and ethical consulting to sterile protocols, discover what sets Dr. Dhir’s Dental Care Multispeciality apart.
        </p>
      </motion.div>
 
      {/* Alternating White and Powder-Blue Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {points.map((point, idx) => {
          const isPowderBlue = idx % 2 === 1; // Alternating index
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              whileTap={{ scale: 0.98 }}
              custom={idx}
              className={`rounded-[2rem] p-8 border text-left flex flex-col justify-between space-y-8 shadow-premium hover:shadow-premium-hover hover:border-powder-300/40 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isPowderBlue
                  ? "bg-powder-100 border-powder-200/60"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* Subtle visual glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Icon inside minimal circle with interactive motion */}
                <motion.div 
                  variants={iconVariants}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors duration-300 ${
                    isPowderBlue 
                      ? "bg-white text-powder-950 group-hover:bg-powder-950 group-hover:text-white" 
                      : "bg-powder-50 text-powder-950 group-hover:bg-powder-950 group-hover:text-white"
                  }`}
                >
                  {point.icon}
                </motion.div>
 
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-base text-powder-950 leading-snug transition-colors duration-300 group-hover:text-powder-800">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                    {point.description}
                  </p>
                </div>
              </div>
 
              {/* Card index visual */}
              <div className="pt-4 border-t border-dashed border-gray-200/80 flex items-center justify-between text-gray-300 relative z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-powder-800/50 font-bold group-hover:text-powder-950/60 transition-colors duration-300">
                  0{idx + 1}
                </span>
                <span className="text-[9px] font-mono uppercase text-powder-600/60 font-semibold tracking-wider group-hover:text-powder-800 transition-colors duration-300">
                  Verified Protocol
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
 
      {/* Live counters/statistics row */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-20 border-t border-gray-100 pt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
      >
        <div className="text-center space-y-1">
          <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-powder-950">
            <AnimatedNumber value={35} suffix="+" />
          </h4>
          <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Years Experience</p>
        </div>
        <div className="text-center space-y-1">
          <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-powder-950">
            <AnimatedNumber value={10000} suffix="+" formatter={(val) => Math.floor(val).toLocaleString()} />
          </h4>
          <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Smiles Perfected</p>
        </div>
        <div className="text-center space-y-1">
          <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-powder-950">
            <AnimatedNumber value={100} suffix="%" />
          </h4>
          <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Autoclave Hygiene</p>
        </div>
        <div className="text-center space-y-1">
          <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-powder-950">MDS</h4>
          <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">RCT Specialization</p>
        </div>
      </motion.div>
    </section>
  );
};
