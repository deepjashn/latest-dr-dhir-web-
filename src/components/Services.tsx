import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, Sparkles, CheckCircle2, Phone, Calendar, ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data";
import { Service } from "../types";
import { DynamicIcon } from "./DynamicIcon";

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Realistic, highly polished, professional clinical dental photography for each category
  const getServiceImage = (id: string) => {
    switch (id) {
      case "rct": 
        return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"; // Microscopic dental setup for Root Canal Treatment (RCT)
      case "checkup": 
        return "https://images.unsplash.com/photo-1579684275673-b3861209f3c3?auto=format&fit=crop&q=80&w=600"; // Close-up of dental instruments examining a tooth model
      case "cleaning": 
        return "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600"; // Professional scaling with water spray mist for Teeth Cleaning & Polishing
      case "extraction": 
        return "https://images.unsplash.com/photo-1512222333319-7a24f0ca68c0?auto=format&fit=crop&q=80&w=600"; // Close-up of clinical surgical metal dental instruments
      case "filling": 
        return "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600"; // Dentist actively performing precision restorations/fillings under clinical light
      case "crowns": 
        return "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600"; // Realistic anatomical dental model showing crowns/bridges structure
      case "smile": 
        return "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"; // Beautiful, symmetric healthy white smile representing Smile Designing (Veneers)
      case "whitening": 
        return "https://images.unsplash.com/photo-1613918431201-44474737b585?auto=format&fit=crop&q=80&w=600"; // Radiant sparkling white teeth for Teeth Whitening
      case "gumcare": 
        return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"; // Root/bone structural examination on screen for Gum Care & Periodontics
      case "dentures": 
        return "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600"; // Fabrication and modeling of removable complete & partial dentures in lab
      case "pediatric": 
        return "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600"; // Comfortable, happy child receiving pediatric dental care
      case "emergency": 
        return "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600"; // Active emergency operatory with protective visor for Emergency Dental Care
      default: 
        return "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600";
    }
  };

  return (
    <section id="services" className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Large Black Rounded Section */}
      <div className="bg-neutral-950 text-white rounded-[3rem] p-8 sm:p-14 lg:p-20 border border-neutral-900 shadow-2xl relative overflow-hidden">
        
        {/* Abstract dark light effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-powder-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-powder-700/5 rounded-full blur-3xl -z-10" />

        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Treatments & Procedures</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl oversized-heading font-medium tracking-tight text-white leading-tight">
            Comprehensive Dental Care, <br />
            <span className="text-powder-300 font-light">Tailored to You.</span>
          </h2>
          
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl font-sans">
            Our clinic offers high-precision specialist care using cutting-edge techniques and pain-free methodology under the direction of Senior specialist Dr. Kuldip Dhir, MDS.
          </p>
        </div>

        {/* Clean horizontal/vertical grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3) }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              id={`service-card-${service.id}`}
              className="group bg-neutral-900/60 border border-neutral-850 hover:border-powder-800 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all shadow-premium"
            >
              <div className="space-y-4 text-left">
                {/* Visual Image/Gradient Wrapper with full background image & subtle overlays */}
                <div className="h-36 rounded-2xl border border-neutral-800 relative overflow-hidden p-4 flex flex-col justify-between transition-colors duration-300 group-hover:border-powder-800/40">
                  {/* Service Stock Image */}
                  <img
                    src={getServiceImage(service.id)}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.45] contrast-[1.05]"
                  />
                  
                  {/* Linear shadow gradient mask so that badge and icon contrast perfectly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/35 to-transparent z-10 pointer-events-none" />
                  
                  {/* Category Identifier */}
                  <div className="relative z-20 text-[9px] font-mono font-bold uppercase tracking-wider text-powder-400/90 bg-neutral-950/85 border border-white/10 px-2 py-0.5 rounded-full w-fit">
                    {service.id === "rct" ? "MDS Speciality" : "Clinical Practice"}
                  </div>

                  {/* Modern Clinical Icon inside subtle interactive background */}
                  <div className="relative z-20 w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-inner self-end group-hover:bg-powder-400 group-hover:text-neutral-950 group-hover:border-powder-400 transition-all duration-300">
                    <DynamicIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-display font-semibold text-lg text-white leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-neutral-850 flex items-center justify-between">
                <button
                  id={`learn-more-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-powder-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                {service.id === "rct" && (
                  <span className="text-[9px] font-mono uppercase bg-powder-900/40 text-powder-300 border border-powder-800/50 px-2.5 py-0.5 rounded-full font-semibold">
                    Highly Advanced
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Treatment Help Call-Out */}
        <div className="mt-20 bg-gradient-to-br from-neutral-900 via-neutral-950 to-powder-950 rounded-[2rem] p-6 sm:p-10 border border-neutral-800 text-left flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-md">
          <div className="space-y-2">
            <span className="text-powder-400 text-xs font-semibold uppercase tracking-wider">Unsure what you need?</span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">Use our advanced AI Dental Assistant for symptom guidance</h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Answer a few questions about your symptoms to receive instant informational awareness, personalized care guides, and seamless booking options.
            </p>
          </div>
          <button
            id="services-consult-ai-btn"
            onClick={() => onNavigate("ai-assistant")}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-white text-neutral-950 font-bold text-xs tracking-wider uppercase hover:bg-powder-100 transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            Launch AI Assistant
          </button>
        </div>

      </div>

      {/* Interactive Detail Modal / Slider Panel for Service Learn More */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              id="service-details-modal"
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 text-left"
            >
              {/* Header */}
              <div className="relative bg-neutral-950 p-6 sm:p-8 text-white flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-powder-300 flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                  <DynamicIcon name={selectedService.iconName} className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-powder-400 font-mono tracking-wider uppercase font-bold">Clinical Treatment Profile</span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">{selectedService.name}</h3>
                </div>
                <button
                  id="close-service-modal-btn"
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto font-sans">
                {/* 1. What is it */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-powder-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-powder-600" />
                    <span>What Is This Treatment?</span>
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedService.details.meaning}
                  </p>
                </div>

                {/* 2. When is it needed */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-powder-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-powder-600" />
                    <span>When Is It Needed?</span>
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedService.details.whenNeeded}
                  </p>
                </div>

                {/* 3. What happens */}
                <div className="space-y-2 bg-powder-50 p-4 rounded-2xl border border-powder-100/50">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-powder-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-powder-600" />
                    <span>What Happens During Your Visit?</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-1">
                    {selectedService.details.procedure}
                  </p>
                </div>

                {/* 4. Why is it important */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-powder-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-powder-600" />
                    <span>Clinical Importance</span>
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedService.details.importance}
                  </p>
                </div>

                {/* Patient Safety Disclaimer */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10px] text-gray-400 leading-normal">
                    *Important Medical Information: All procedural parameters described are standard practices. Every mouth is unique and specific diagnostics are required. Please consult with RCT Specialist Dr. Kuldip Dhir, MDS for actual clinical planning.
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  id="modal-call-btn"
                  href="tel:+917009488220"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-powder-600" />
                  <span>Call 070094 88220</span>
                </a>
                <button
                  id="modal-request-btn"
                  onClick={() => {
                    setSelectedService(null);
                    onNavigate("ai-assistant");
                  }}
                  className="flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-powder-950 hover:bg-powder-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  <span>Request Appointment</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
