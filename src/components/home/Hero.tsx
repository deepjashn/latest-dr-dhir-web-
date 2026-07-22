import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, ScanLine, Stethoscope, HeartHandshake, Check } from "lucide-react";
import { TButton, WaGlyph } from "./ui";
import { waLink, trackEvent } from "../../content/site";
import { useAppointment } from "../layout/AppointmentModal";
import clinicExterior from "../../assets/images/clinic-exterior.jpg";

const CRED = [
  { icon: Stethoscope, label: "MDS Specialist Care" },
  { icon: ScanLine, label: "Modern Treatment Planning" },
  { icon: ShieldCheck, label: "Multi-stage Sterilisation" },
  { icon: HeartHandshake, label: "Patient-first Guidance" },
];
const CONCERNS = ["Tooth Pain", "Missing Tooth", "Bleeding Gums", "Smile Concern", "Child Dental Care", "Broken Tooth", "Dental Emergency"];

// Maps hero chip labels to the assessment's concern values.
const MAP: Record<string, string> = {
  "Tooth Pain": "Tooth pain", "Missing Tooth": "Missing tooth", "Bleeding Gums": "Bleeding gums",
  "Smile Concern": "Smile / cosmetic concern", "Child Dental Care": "Child dental concern",
  "Broken Tooth": "Broken or chipped tooth", "Dental Emergency": "Swelling",
};

export const Hero: React.FC<{ onPickConcern: (c: string) => void }> = ({ onPickConcern }) => {
  const { open } = useAppointment();
  const [sel, setSel] = useState<string | null>(null);

  const go = () => {
    onPickConcern(MAP[sel ?? "Tooth Pain"]);
    document.getElementById("smart-check")?.scrollIntoView({ behavior: "smooth" });
    trackEvent("smart_check_start", "hero_selector");
  };

  return (
    <section className="relative bg-cream overflow-hidden pb-28 sm:pb-32">
      {/* soft aqua backdrop accent */}
      <div className="absolute top-0 right-0 w-[45%] h-[70%] bg-turq-50/60 rounded-bl-[120px] -z-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-14 lg:pt-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white border border-turq-100 px-4 py-2 rounded-full text-[13px] font-bold text-turq-700 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-turq-500" /> Advanced Multispeciality Dental Care in Kotkapura
            </span>
            <h1 className="font-display font-extrabold tracking-tight text-teal-deep text-[clamp(2.4rem,5.4vw,4.25rem)] leading-[1.04] text-balance">
              Personalised Dental Care for a Healthier, More Confident Smile
            </h1>
            <p className="text-[17px] lg:text-[19px] text-muted2 max-w-xl mt-6 mb-8">
              From persistent tooth pain and missing teeth to smile improvement and preventive care, receive clear treatment guidance from an experienced MDS dental specialist.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-4">
              <TButton onClick={() => open("hero")}>Book Your Consultation</TButton>
              <TButton variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "hero")}><WaGlyph /> WhatsApp the Clinic</TButton>
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              <a href="/treatments" onClick={() => trackEvent("treatment_visit", "hero_link")} className="inline-flex items-center gap-1.5 font-bold text-teal-deep hover:text-turq-600">
                Explore Treatments <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-sm text-muted2">Same-day appointments subject to availability · Clear treatment guidance</span>
            </div>

            {/* credibility row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9">
              {CRED.map((c) => (
                <div key={c.label} className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-white border border-neutral-soft text-turq-600 grid place-items-center shrink-0"><c.icon className="w-4.5 h-4.5" /></span>
                  <span className="text-[13px] font-semibold text-ink2 leading-tight">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — real clinic environment (NOT the portrait) */}
          <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="rounded-[32px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(6,59,59,0.45)] aspect-[4/5]">
              <img src={clinicExterior} alt="Dr. Dhir's Dental Care Multispeciality Hospital — the clinic on Faridkot Road, Kotkapura" className="w-full h-full object-cover" width={1066} height={1600} fetchPriority="high" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Smart concern selector — overlaps lower edge of hero */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 -mb-24 sm:-mb-28 mt-12">
        <div className="bg-white rounded-[26px] shadow-[0_30px_70px_-30px_rgba(6,59,59,0.4)] border border-neutral-soft p-6 sm:p-8 translate-y-16">
          <h2 className="font-display font-bold text-[20px] sm:text-[22px] text-teal-deep mb-1">What can we help you with today?</h2>
          <p className="text-sm text-muted2 mb-5">Pick a concern to get preliminary guidance on the right consultation.</p>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {CONCERNS.map((c) => (
              <button
                key={c}
                onClick={() => setSel(c)}
                aria-pressed={sel === c}
                className={`min-h-[48px] px-4 rounded-xl border text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                  sel === c ? "border-turq-500 bg-turq-50 text-teal-deep" : "border-neutral-soft bg-cream text-ink2 hover:border-turq-400"
                }`}
              >
                {sel === c && <Check className="w-4 h-4 text-turq-600" />} {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <p className="text-xs text-muted2 max-w-sm">This guidance does not replace examination or diagnosis by a qualified dentist.</p>
            <TButton onClick={go}>Get Preliminary Guidance <ArrowRight className="w-4 h-4" /></TButton>
          </div>
        </div>
      </div>
    </section>
  );
};
