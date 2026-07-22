import React from "react";
import { motion } from "motion/react";
import { ScanLine, Microscope, ShieldCheck, Sparkles, Boxes, Stethoscope, ArrowRight, Star, ExternalLink, Quote } from "lucide-react";
import { SectionHead, Eyebrow, fadeUp, TButton } from "./ui";
import { trackEvent } from "../../content/site";
import clinicExterior from "../../assets/images/clinic-exterior.jpg";

/* ---------- TECHNOLOGY & SAFETY ---------- */
const TECH = [
  { icon: ScanLine, title: "Digital Diagnosis", body: "Clearer diagnosis with low-radiation imaging — problems spotted early and shown to you visually." },
  { icon: Boxes, title: "Treatment Planning", body: "Your treatment mapped out step by step, so you understand the plan before it begins." },
  { icon: Microscope, title: "Root Canal Technology", body: "Precise, efficient root canal systems for smoother, more comfortable appointments." },
  { icon: ShieldCheck, title: "Sterilisation Process", body: "Multi-stage sterilisation to strict standards for a safe visit, every time." },
  { icon: Sparkles, title: "Sealed Instruments", body: "Single-use barriers where applicable — an extra layer of everyday infection control." },
  { icon: Stethoscope, title: "Modern Operatory", body: "A calm, well-equipped treatment environment designed around patient comfort." },
];

export const TechSafety: React.FC = () => (
  <section className="bg-cream py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <SectionHead eyebrow="Precision and Patient Safety" title="Modern Technology With Benefits You Can Understand"
        intro="Technology matters most when it makes your diagnosis clearer and your care safer. Here's what each brings to your visit." />
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-start">
        {/* feature image */}
        <motion.div {...fadeUp} className="relative rounded-[28px] overflow-hidden shadow-xl lg:sticky lg:top-24 aspect-[4/5] lg:aspect-auto lg:h-[520px]">
          <img src={clinicExterior} alt="Dr. Dhir's Dental Care clinic building, Kotkapura" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/85 via-teal-deep/10 to-transparent" />
          <div className="absolute bottom-0 p-7 text-white">
            <b className="block font-display text-xl mb-1">All Specialities Under One Roof</b>
            <span className="text-turq-50/80 text-sm">A fully-equipped multispeciality dental hospital in Kotkapura.</span>
          </div>
        </motion.div>
        {/* benefit grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {TECH.map((t) => (
            <motion.div key={t.title} {...fadeUp} className="bg-white border border-neutral-soft rounded-[20px] p-6">
              <span className="w-12 h-12 rounded-2xl bg-turq-50 text-turq-600 grid place-items-center mb-4"><t.icon className="w-6 h-6" /></span>
              <h3 className="font-display font-bold text-[17px] text-teal-deep mb-1.5">{t.title}</h3>
              <p className="text-sm text-muted2">{t.body}</p>
            </motion.div>
          ))}
          <div className="sm:col-span-2">
            <TButton variant="ghost" href="#walkthrough" onClick={() => trackEvent("sterilisation_view", "tech")}>See Our Sterilisation Process <ArrowRight className="w-4 h-4" /></TButton>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- CLINIC WALKTHROUGH (editorial grid) ---------- */
const TILES = [
  { label: "Reception area", grad: "linear-gradient(135deg,#DFF7F4,#a5e6df)" },
  { label: "Consultation room", grad: "linear-gradient(135deg,#e7f0ef,#c9e2dd)" },
  { label: "Treatment operatory", grad: "linear-gradient(135deg,#e3eef2,#c4dbe4)" },
  { label: "Technology & imaging", grad: "linear-gradient(135deg,#eef2f1,#d7e6e2)" },
  { label: "Sterilisation area", grad: "linear-gradient(135deg,#e0f2ef,#b9e2da)" },
];

export const Walkthrough: React.FC = () => (
  <section id="walkthrough" className="py-20 lg:py-24 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <SectionHead center eyebrow="Take a Look Inside" title="See the Clinic Before Your Visit"
        intro="A calm, modern and hygienic environment — so your first visit already feels familiar." />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-[180px] lg:auto-rows-[200px]">
        {/* real exterior — large tile */}
        <div className="col-span-2 row-span-2 relative rounded-[24px] overflow-hidden shadow-sm">
          <img src={clinicExterior} alt="Dr. Dhir's Dental Care Multispeciality Hospital building exterior, Faridkot Road, Kotkapura" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute bottom-3 left-3 bg-teal-deep/75 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold">Clinic building — Faridkot Road</span>
        </div>
        {TILES.map((t) => (
          <div key={t.label} className="relative rounded-[24px] overflow-hidden grid place-items-center text-center px-3" style={{ background: t.grad }}>
            <span className="text-[13px] font-semibold text-teal-deep/60">{t.label}</span>
            <span className="absolute bottom-3 left-3 bg-teal-deep/60 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">Photo to be added</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- PATIENT REVIEWS (dark navy, marked placeholders) ---------- */
export const Reviews: React.FC = () => (
  <section id="reviews" className="bg-navy-deep py-20 lg:py-24 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <SectionHead center invert eyebrow="Patient Experiences" title="Trusted by Patients and Families" />
      <div className="inline-flex flex-wrap items-center justify-center gap-5 bg-white/[0.06] border border-white/10 rounded-2xl px-7 py-5 mb-10 mx-auto w-full max-w-xl">
        <div className="text-4xl font-extrabold text-white font-display">[GOOGLE RATING]</div>
        <div className="text-left">
          <div className="flex gap-0.5 text-[#F0A500]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
          <span className="text-sm text-turq-50/70">Based on <b className="text-white">[NUMBER OF REVIEWS]</b> Google reviews</span>
        </div>
        <a href="https://www.justdial.com/Kotkapura/Dr-Kuldip-Dhir-Dr-Dhirs-Multispeciality-Dental-Hospital-Romana-Albel-Singh/9999P1635-1635-231222162618-A2S6_BZDET" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("reviews_click", "justdial")} className="inline-flex items-center gap-1.5 text-sm font-bold text-turq-300 hover:text-turq-200 sm:ml-auto">
          View on JustDial <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {["A", "B", "C"].map((k) => (
          <motion.div key={k} {...fadeUp} className="bg-white/[0.06] border border-white/10 rounded-[22px] p-6">
            <Quote className="w-8 h-8 text-turq-500/50 mb-3" />
            <div className="flex gap-0.5 text-[#F0A500] mb-3">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
            <p className="text-sm text-turq-50/75 mb-5 min-h-20">[Real Google review excerpt to be added — with patient consent and correct attribution.]</p>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="w-10 h-10 rounded-full bg-turq-500/20 text-turq-200 grid place-items-center font-bold">{k}</span>
              <div><b className="block text-sm text-white">Patient name</b><span className="text-xs text-turq-50/50">Google · date</span></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <TButton variant="light" href="#" onClick={() => trackEvent("reviews_click", "all")}>Read All Google Reviews <ArrowRight className="w-4 h-4" /></TButton>
      </div>
    </div>
  </section>
);
