import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Heart, Sparkles, Star, Users, CheckCircle } from "lucide-react";
import { DOCTOR_PROFILE } from "../data";
import doctorThumbImg from "../assets/images/dr_kuldip_dhir_portrait_1783748372792.jpg";

export const About: React.FC = () => {
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      {/* Editorial layout: grid split on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8">
        
        {/* Left Column: Large heading & Supporting paragraphs (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-700"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Clinical Heritage</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading font-medium tracking-tight text-powder-950 leading-[1.02]">
            Experience, <br />
            Expertise and <br />
            Care You Can Trust.
          </h2>

          <div className="w-16 h-1 bg-powder-900 rounded-full" />

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans pt-2">
            Dr. Dhir’s Dental Care Multispeciality is committed to providing reliable, advanced, and comfortable dental care with modern techniques, ethical treatment, and a compassionate approach. Led by Dr. Kuldip Dhir, the clinic focuses on patient comfort, proper diagnosis, and long-term oral health.
          </p>

          {/* Mission Statement Block */}
          <div className="bg-white border-l-4 border-powder-600 p-4.5 rounded-r-2xl shadow-sm text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-powder-700 block mb-1">Our Mission</span>
            <p className="text-xs sm:text-sm text-gray-800 font-medium italic leading-relaxed">
              "To provide trusted, ethical, and advanced dental care for patients of all ages in a comfortable and hygienic environment."
            </p>
          </div>

          {/* Small Natural Photo with credential note */}
          <div className="flex items-center gap-4 p-4 bg-powder-50 border border-powder-100 rounded-2xl">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-powder-200">
              <img
                src={doctorThumbImg}
                alt="Dr. Kuldip Dhir MDS Portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase text-powder-600">State Credentialed</span>
              <p className="text-xs text-gray-700 font-semibold leading-tight">Dr. Kuldip Dhir, MDS</p>
              <p className="text-[10px] text-gray-400 font-medium">Ex Deputy Director (Health Department Punjab)</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Information Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1: Academic Excellence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 hover:border-powder-200 rounded-[2rem] p-6 text-left space-y-4 shadow-premium hover:shadow-premium-hover transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-powder-50 text-powder-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-powder-950 uppercase tracking-wider">
                Academic Excellence
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Post-graduation specialization (MDS) in Endodontics and Root Canal Treatment. Representing the highest clinical standard in saving damaged teeth.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Clinical Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-gray-100 hover:border-powder-200 rounded-[2rem] p-6 text-left space-y-4 shadow-premium hover:shadow-premium-hover transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-powder-50 text-powder-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-powder-950 uppercase tracking-wider">
                Clinical Leadership
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Over 35+ years of clinical and administrative leadership, serving the state of Punjab as Senior Medical Officer (SMO) and Deputy Director.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Painless Technology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-gray-100 hover:border-powder-200 rounded-[2rem] p-6 text-left space-y-4 shadow-premium hover:shadow-premium-hover transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-powder-50 text-powder-700 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-powder-950 uppercase tracking-wider">
                Painless RCT Care
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Utilizing high-end rotary endodontic equipment, digital visual checkups, and gentle techniques to ensure an anxiety-free single-visit therapy.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Sterile Standards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-gray-100 hover:border-powder-200 rounded-[2rem] p-6 text-left space-y-4 shadow-premium hover:shadow-premium-hover transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-powder-50 text-powder-700 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-powder-950 uppercase tracking-wider">
                Autoclave Sterility
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Strict adherence to international class autoclave medical protocols. Standardized single-use disposable kits and completely sterilized equipment.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
