import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Award, Clock, ShieldCheck, ScanLine, ArrowRight, Activity } from "lucide-react";
import { SERVICES } from "../../data";
import { DynamicIcon } from "../DynamicIcon";
import { SectionHead, fadeUp, TButton } from "./ui";
import { trackEvent } from "../../content/site";
import { treatmentImage } from "../../content/images";

/* ---------- TRUST STRIP ---------- */
const PILLARS = [
  { icon: Award, title: "MDS Specialist Care", body: "Treatment led by a postgraduate-qualified dental specialist." },
  { icon: Clock, title: "Extensive Clinical Experience", body: "Years of hands-on practice across a wide range of dental care." },
  { icon: ShieldCheck, title: "Safe Sterilisation Protocols", body: "Multi-stage sterilisation for a hygienic visit, every time." },
  { icon: ScanLine, title: "Digital Diagnosis & Planning", body: "Clearer diagnosis and treatment you can actually see and understand." },
];

export const TrustStrip: React.FC = () => (
  <section className="bg-neutral-soft py-14">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {PILLARS.map((p) => (
        <div key={p.title} className="flex gap-4">
          <span className="w-12 h-12 rounded-2xl bg-white text-turq-600 grid place-items-center shrink-0 shadow-sm"><p.icon className="w-6 h-6" /></span>
          <div>
            <b className="block text-teal-deep font-display font-bold text-[16px] mb-1">{p.title}</b>
            <span className="text-sm text-muted2">{p.body}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- PATIENT-CONCERN CARDS (bento, 2 larger) ---------- */
const CONCERN_CARDS = [
  { icon: "FlameKindling", title: "I Have Tooth Pain", body: "Persistent aches, sensitivity or throbbing pain — let's find the cause and relieve it, preserving your natural tooth where possible.", cats: "Root canal · Fillings · Emergency care", to: "/treatments/rct", grad: "linear-gradient(135deg,#063B3B,#0c7d77)", big: true },
  { icon: "Zap", title: "I Have a Missing Tooth", body: "Restore function and confidence with stable, natural-looking replacements.", cats: "Implants · Bridges · Dentures", to: "/treatments/implants", grad: "linear-gradient(135deg,#0f9c95,#12B8B0)", big: false },
  { icon: "Heart", title: "I Want to Improve My Smile", body: "Reshape, brighten and balance your smile with a plan built around your face.", cats: "Smile design · Whitening · Veneers", to: "/treatments/smile", grad: "linear-gradient(135deg,#0c7d77,#0f9c95)", big: false },
  { icon: "Baby", title: "My Child Needs Dental Care", body: "Gentle, reassuring care that helps children build healthy habits early — from check-ups to sealants and cavity care.", cats: "Pediatric dentistry · Preventive care", to: "/treatments/pediatric", grad: "linear-gradient(135deg,#071F2B,#063B3B)", big: true },
];

export const ConcernCards: React.FC = () => (
  <section className="py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <SectionHead eyebrow="Care That Starts With Your Concern" title="Tell Us What's Troubling You"
        intro="Not sure which treatment fits? Start from what you're feeling — we'll point you to the right kind of care." />
      <div className="grid md:grid-cols-2 gap-6">
        {CONCERN_CARDS.map((c) => (
          <motion.div key={c.title} {...fadeUp} className={c.big ? "md:col-span-1" : ""}>
            <Link to={c.to} onClick={() => trackEvent("treatment_visit", c.title)} className="group relative flex flex-col justify-end min-h-[240px] md:min-h-[280px] rounded-[26px] overflow-hidden p-7 text-white transition-all hover:-translate-y-1.5 hover:shadow-2xl" style={{ background: c.grad }}>
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 45%)" }} />
              <span className="relative w-14 h-14 rounded-2xl bg-white/15 backdrop-blur grid place-items-center mb-auto"><DynamicIcon name={c.icon} className="w-7 h-7 text-white" /></span>
              <div className="relative mt-6">
                <h3 className="font-display font-bold text-[24px] mb-2">{c.title}</h3>
                <p className="text-white/85 text-[15px] mb-3 max-w-md">{c.body}</p>
                <span className="text-turq-100/80 text-[13px] font-semibold">{c.cats}</span>
                <span className="flex items-center gap-1.5 font-bold text-sm mt-4">Get guidance <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- FEATURED TREATMENTS (photo-led premium cards) ---------- */
const FEATURED = ["rct", "implants", "crowns", "smile", "gumcare", "pediatric"];

export const FeaturedTreatments: React.FC = () => {
  const items = FEATURED.map((id) => SERVICES.find((s) => s.id === id)!).filter(Boolean);
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHead center eyebrow="Comprehensive Dental Care" title="Specialised Treatments, Clearly Explained"
          intro="Each treatment is explained in plain language — what it's for, and how it helps — so you always know your options." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s) => (
            <motion.div key={s.id} {...fadeUp}>
              <Link to={`/treatments/${s.id}`} onClick={() => trackEvent("treatment_visit", s.id)} className="group flex flex-col h-full bg-white border border-neutral-soft rounded-[24px] overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="relative h-44 overflow-hidden">
                  <img src={treatmentImage(s.id)} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <span className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white/90 backdrop-blur grid place-items-center text-turq-700 shadow"><DynamicIcon name={s.iconName} className="w-6 h-6" /></span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-[19px] text-teal-deep mb-2">{s.name}</h3>
                  <p className="text-sm text-muted2 flex-1">{s.description}</p>
                  <span className="inline-flex items-center gap-1.5 font-bold text-sm text-turq-600 mt-4">Explore Treatment <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <TButton variant="ghost" to="/treatments"><Activity className="w-4 h-4" /> View All Treatments</TButton>
        </div>
      </div>
    </section>
  );
};
