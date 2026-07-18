import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Phone, MapPin, Send, Check, ExternalLink, Clock, Sparkles, Map, Info
} from "lucide-react";

interface ContactLocationProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { name: "", phone: "", message: "" };
    let hasError = false;

    if (!formState.name.trim()) {
      newErrors.name = "Full name is required";
      hasError = true;
    }
    if (!formState.phone.trim()) {
      newErrors.phone = "Phone number is required";
      hasError = true;
    }
    if (!formState.message.trim()) {
      newErrors.message = "Message or query is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setIsSubmitting(true);

    const fullMessage = `Hello Dr. Dhir’s Dental Care Multispeciality,

My name is ${formState.name.trim()}.
My phone number is ${formState.phone.trim()}.

Message:
${formState.message.trim()}

I would like to get assistance / book an appointment.`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/917009488220?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", phone: "", message: "" });
      setErrors({ name: "", phone: "", message: "" });
    }, 1000);
  };

  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Dhir+Complex+Near+Petrol+Pump+Faridkot+Road+Kot+Kapura+Punjab+India";

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-left max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading font-medium tracking-tight text-powder-950 leading-none">
          Contact & Consultation
        </h2>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans max-w-2xl">
          Have questions or need assistance? Fill out our secure form below, and our care team will get back to you promptly to arrange your dental appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & General Clinic Contact (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Form Card */}
          <div className="bg-white border border-powder-100 p-6 sm:p-8 rounded-[2rem] shadow-premium text-left relative">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-12 h-12 bg-powder-950 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display font-semibold text-lg text-powder-950">Message Sent Successfully</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-sans">
                    Thank you for contacting Dr. Dhir’s Dental Care Multispeciality. Our Kot Kapura office will reach out on your provided mobile number.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 bg-powder-50 hover:bg-powder-100 text-powder-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-powder-900 uppercase tracking-wider">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Gurpreet Singh"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full bg-white px-4 py-3 border rounded-xl text-xs sm:text-sm focus:outline-none transition-all font-sans ${
                        errors.name 
                          ? "border-red-400 focus:border-red-500 bg-red-50/10" 
                          : "border-powder-100 focus:border-powder-400"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500 font-medium block pl-1 font-sans">{errors.name}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-powder-900 uppercase tracking-wider">Your Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 70094 88220"
                      value={formState.phone}
                      onChange={(e) => {
                        setFormState({ ...formState, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`w-full bg-white px-4 py-3 border rounded-xl text-xs sm:text-sm focus:outline-none transition-all font-sans ${
                        errors.phone 
                          ? "border-red-400 focus:border-red-500 bg-red-50/10" 
                          : "border-powder-100 focus:border-powder-400"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-500 font-medium block pl-1 font-sans">{errors.phone}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 text-left sm:col-span-2">
                    <label className="text-xs font-bold text-powder-900 uppercase tracking-wider">Message or Treatment Query *</label>
                    <textarea
                      rows={4}
                      placeholder="Briefly tell us what you're looking for (e.g., Single-visit root canal consultation, checkup, scaling)"
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      className={`w-full bg-white px-4 py-3 border rounded-xl text-xs sm:text-sm focus:outline-none transition-all resize-none font-sans ${
                        errors.message 
                          ? "border-red-400 focus:border-red-500 bg-red-50/10" 
                          : "border-powder-100 focus:border-powder-400"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-500 font-medium block pl-1 font-sans">{errors.message}</span>
                    )}
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 text-left leading-normal font-sans">
                    * Clicking send opens our official WhatsApp chat for instant coordination. Patient confidentiality is maintained.
                  </p>
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-1.5 px-6 py-3.5 bg-powder-950 hover:bg-powder-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Opening WhatsApp...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Contacts Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border border-powder-100 rounded-[2rem] flex items-start gap-4 bg-white shadow-premium">
              <div className="w-10 h-10 bg-powder-50 text-powder-950 rounded-xl flex items-center justify-center shrink-0 border border-powder-100">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left space-y-1">
                <h4 className="font-display font-semibold text-xs text-powder-950 uppercase tracking-wide">Emergency Call Desk</h4>
                <p className="text-[11px] text-gray-400">Direct line to reception desk coordinator:</p>
                <a href="tel:07009488220" className="text-sm font-bold text-powder-950 hover:underline block pt-1 font-sans">
                  +91 70094 88220
                </a>
              </div>
            </div>

            <div className="p-5 border border-powder-100 rounded-[2rem] flex items-start gap-4 bg-white shadow-premium">
              <div className="w-10 h-10 bg-powder-50 text-powder-950 rounded-xl flex items-center justify-center shrink-0 border border-powder-100">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left space-y-1">
                <h4 className="font-display font-semibold text-xs text-powder-950 uppercase tracking-wide">Working Hours</h4>
                <p className="text-[11px] text-gray-500 font-sans leading-normal">
                  <strong>Mon - Sat:</strong> 09:30 AM – 07:30 PM <br />
                  <strong>Sunday:</strong> On Call / Emergencies Only
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Custom Roadmap Map (5 cols) */}
        <div id="location" className="lg:col-span-5">
          <div className="bg-white border border-powder-100 rounded-[2rem] p-6 sm:p-8 shadow-premium text-left space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-powder-700 text-[10px] font-bold uppercase tracking-widest block">Clinic Location</span>
              <h3 className="font-display font-semibold text-lg text-powder-950 leading-tight">Dhir Complex, Kot Kapura</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Dhir Complex, Near Petrol Pump, Faridkot Road, Kot Kapura, Punjab – 151 204, India.
              </p>
            </div>

            {/* Custom high-contrast minimalist Vector Map Roadmap SVG */}
            <div className="relative w-full aspect-[4/3] bg-powder-50 border border-powder-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              
              <svg viewBox="0 0 400 300" className="w-full h-full opacity-95 z-0">
                {/* Background */}
                <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
                
                {/* Roads representation */}
                <path d="M 0 150 Q 150 160 400 130" stroke="#ffffff" strokeWidth="45" fill="none" />
                <path d="M 0 150 Q 150 160 400 130" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
                
                <path d="M 120 0 L 170 300" stroke="#ffffff" strokeWidth="32" fill="none" />
                <path d="M 120 0 L 170 300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5 4" fill="none" />

                {/* Shading zones */}
                <rect x="200" y="30" width="120" height="70" rx="12" fill="#f1f5f9" />
                <rect x="30" y="190" width="80" height="80" rx="12" fill="#f1f5f9" />

                {/* Petrol Pump Landmark */}
                <rect x="240" y="155" width="110" height="65" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                <circle cx="295" cy="187" r="14" fill="#e0f2fe" />
                <text x="295" y="190" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#0369a1" textAnchor="middle">
                  PETROL PUMP
                </text>

                {/* Dr. Dhir Clinic Map Pin Node */}
                <g>
                  {/* Glowing pulses */}
                  <circle cx="145" cy="115" r="14" fill="#0f172a" fillOpacity="0.08" />
                  <circle cx="145" cy="115" r="28" fill="#0f172a" fillOpacity="0.03" />
                  
                  {/* Clinic Node Box */}
                  <rect x="110" y="65" width="70" height="45" rx="10" fill="#0f172a" />
                  <text x="145" y="84" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                    DR. DHIR
                  </text>
                  <text x="145" y="96" fontFamily="sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">
                    CLINIC
                  </text>
                </g>

                {/* Road Labels */}
                <text x="50" y="142" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#64748b" transform="rotate(-3 50 142)">
                  FARIDKOT RD
                </text>
              </svg>

              {/* Float Map Overlay Button card */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-powder-100 shadow-premium flex items-center justify-between text-xs">
                <div className="text-left space-y-0.5">
                  <strong className="text-powder-950 font-semibold block text-[11px]">Dhir Complex</strong>
                  <span className="text-gray-400 text-[9px] block">Opposite Petrol Pump Station</span>
                </div>
                <a
                  id="map-directions-btn"
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-powder-900 hover:text-black font-bold transition-colors cursor-pointer"
                >
                  <span className="text-[10px] uppercase tracking-wider">Open Map</span>
                  <ExternalLink className="w-3 h-3 text-powder-700" />
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                id="direct-call-cta"
                href="tel:07009488220"
                className="flex items-center justify-center gap-2 py-3.5 bg-powder-50 hover:bg-powder-100 text-powder-950 text-xs font-bold uppercase tracking-wider rounded-2xl border border-powder-100/60 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-powder-700" />
                <span>Call Desk</span>
              </a>
              <a
                id="google-directions-link"
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-powder-950 hover:bg-powder-800 text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-powder-300" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
