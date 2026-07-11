import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Heart, UserCheck, Star, Sparkles, BookOpen, Clock } from "lucide-react";
import { DOCTOR_PROFILE } from "../data";
import doctorImg from "../assets/images/dr_kuldip_dhir_portrait_1783748372792.jpg";

export const DoctorProfile: React.FC = () => {
  return (
    <section id="doctors" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      {/* Outer subtle glow background container */}
      <div className="relative bg-gradient-to-tr from-white via-powder-50 to-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-powder-100 shadow-premium">
        
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-powder-200/40 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clean Portrait Layout (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden border border-powder-200 shadow-premium group"
            >
              {/* Actual photo of doctor */}
              <img
                src={doctorImg}
                alt="Dr. Kuldip Dhir, MDS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-powder-950 via-powder-950/20 to-transparent opacity-80" />

              {/* Micro badge over image */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col text-left text-white">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-powder-300">
                  RCT Specialist
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl mt-1 text-white leading-none">
                  Dr. Kuldip Dhir, MDS
                </h3>
                <p className="text-[11px] text-gray-300 mt-1.5 font-medium leading-relaxed">
                  Ex-Deputy Director &bull; Ex-Deputy Medical Commissioner
                </p>
              </div>

              {/* Floating certificate stamp badge */}
              <div className="absolute top-4 right-4 bg-white/95 border border-powder-100/50 p-2.5 rounded-2xl shadow-premium flex items-center gap-1.5">
                <Award className="w-5 h-5 text-powder-600" />
                <div className="text-left">
                  <span className="text-[8px] font-mono font-bold text-gray-400 block uppercase tracking-wider leading-none">Registered</span>
                  <span className="text-[10px] font-display font-semibold text-gray-900 block leading-none">MDS Endodontics</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Information (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-700"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Senior Medical Director</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading font-medium tracking-tight text-powder-950 leading-none">
                Dr. Kuldip Dhir, MDS
              </h2>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-powder-600 font-mono">
                Root Canal Treatment Specialist & Ex-Deputy Director (Health)
              </p>
              <div className="w-12 h-1 bg-powder-600 rounded-full" />
            </div>

            {/* Treatment Philosophy */}
            <div className="bg-white border border-powder-100 p-6 rounded-[2rem] shadow-premium space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-powder-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-powder-600" />
                <span>Clinical Treatment Philosophy</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                "We advise only what you genuinely need. Complete sterile standards, autoclaved procedural instruments, and deep technical rotary precision are utilized to deliver a highly reliable, painless dental care experience for patients of all ages."
              </p>
            </div>

            {/* Qualifications & Roles List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-powder-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-powder-600" />
                <span>Professional Roles & State Contributions</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-powder-100 rounded-2xl flex items-start gap-3 shadow-premium">
                  <div className="w-8 h-8 rounded-lg bg-powder-50 flex items-center justify-center shrink-0 text-powder-700">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-powder-950">Ex-Deputy Director</h4>
                    <p className="text-[11px] text-gray-500 leading-tight">Health Department Government of Punjab</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-powder-100 rounded-2xl flex items-start gap-3 shadow-premium">
                  <div className="w-8 h-8 rounded-lg bg-powder-50 flex items-center justify-center shrink-0 text-powder-700">
                    <UserCheck className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-powder-950">Ex-Deputy Med. Comm.</h4>
                    <p className="text-[11px] text-gray-500 leading-tight">Ensuring clinical administrative standards</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-powder-100 rounded-2xl flex items-start gap-3 shadow-premium">
                  <div className="w-8 h-8 rounded-lg bg-powder-50 flex items-center justify-center shrink-0 text-powder-700">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-powder-950">35+ Years Active Experience</h4>
                    <p className="text-[11px] text-gray-500 leading-tight">Saving natural teeth and root structures</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-powder-100 rounded-2xl flex items-start gap-3 shadow-premium">
                  <div className="w-8 h-8 rounded-lg bg-powder-50 flex items-center justify-center shrink-0 text-powder-700">
                    <Star className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-powder-950">Ex-Senior Med. Officer</h4>
                    <p className="text-[11px] text-gray-500 leading-tight">Trusted ethical clinical practice</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
