import React from "react";
import { motion } from "motion/react";
import { Award, ScanLine, ShieldCheck, MessageCircle, ArrowRight, Stethoscope } from "lucide-react";
import { Eyebrow, TButton } from "./ui";
import { IMG } from "../../content/images";

const REASONS = [
  { icon: Award, title: "Experienced Specialist Care", body: "Treatment led by an MDS-qualified dental specialist, with your diagnosis explained clearly." },
  { icon: ScanLine, title: "Modern Digital Dentistry", body: "Digital diagnosis and treatment planning for care you can actually see and understand." },
  { icon: ShieldCheck, title: "Safe, Sterile Environment", body: "Multi-stage sterilisation and strict hygiene protocols on every single visit." },
  { icon: MessageCircle, title: "Transparent Guidance", body: "Honest options and upfront estimates — no pressure, no over-treatment." },
];

export const WhyChoose: React.FC = () => (
  <section className="py-20 lg:py-24 bg-cream">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
      {/* image */}
      <motion.div initial={{ y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="relative">
        <div className="rounded-[30px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(6,59,59,0.4)] aspect-[4/5]">
          <img src={IMG.dentalExam} alt="Careful dental examination at Dr. Dhir's Dental Care, Kotkapura" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="hidden sm:flex absolute -bottom-6 -right-5 bg-teal-deep text-white rounded-2xl shadow-xl px-5 py-4 items-center gap-3 max-w-[240px]">
          <span className="w-11 h-11 rounded-xl bg-white/15 grid place-items-center shrink-0"><Stethoscope className="w-5 h-5" /></span>
          <span className="text-[13px] leading-snug font-semibold">Every visit begins with a clear diagnosis.</span>
        </div>
      </motion.div>

      {/* content */}
      <div>
        <Eyebrow>Why Patients Choose Us</Eyebrow>
        <h2 className="font-display font-extrabold tracking-tight text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] text-teal-deep mt-4 mb-8 text-balance">
          Care Built on Trust, Clarity and Comfort
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-9">
          {REASONS.map((r) => (
            <div key={r.title} className="flex gap-3.5">
              <span className="w-11 h-11 rounded-2xl bg-white border border-neutral-soft text-turq-600 grid place-items-center shrink-0 shadow-sm"><r.icon className="w-5 h-5" /></span>
              <div>
                <b className="block font-display font-bold text-[16px] text-teal-deep mb-1">{r.title}</b>
                <span className="text-sm text-muted2">{r.body}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Dental Check CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between bg-white border border-neutral-soft rounded-[20px] p-5">
          <div>
            <b className="block font-display font-bold text-teal-deep">Not sure what you need?</b>
            <span className="text-sm text-muted2">Try our Smart Dental Check for preliminary guidance.</span>
          </div>
          <TButton to="/smart-dental-check" className="shrink-0">Start Smart Dental Check <ArrowRight className="w-4 h-4" /></TButton>
        </div>
      </div>
    </div>
  </section>
);
