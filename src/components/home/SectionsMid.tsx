import React from "react";
import { motion } from "motion/react";
import { Check, Quote, ArrowRight } from "lucide-react";
import { DOCTOR_PROFILE } from "../../data";
import { SectionHead, Eyebrow, fadeUp, TButton, WaGlyph } from "./ui";
import { ConcernAssessment } from "./ConcernAssessment";
import { BeforeAfter } from "./BeforeAfter";
import { waLink, trackEvent } from "../../content/site";
import { useAppointment } from "../layout/AppointmentModal";
import drDhirPortrait from "../../assets/images/dr-kuldip-dhir.png";

/* ---------- MEET DR. DHIR (portrait used ONLY here) ---------- */
const CREDENTIALS = [
  "MDS – Endodontics (Root Canal Specialist)",
  "Ex Deputy Director, Health Department",
  "Advanced Root Canal Expertise",
  "Digital Treatment Planning",
];

export const MeetDoctor: React.FC = () => {
  const { open } = useAppointment();
  return (
    <section id="meet-dhir" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
        {/* portrait */}
        <motion.div {...fadeUp} className="relative">
          <div className="absolute -top-4 -left-4 w-32 h-32 rounded-[28px] bg-turq-50 -z-0" aria-hidden="true" />
          <div className="absolute -bottom-5 -right-4 w-40 h-40 rounded-full bg-turq-100/60 -z-0" aria-hidden="true" />
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(6,59,59,0.45)] aspect-[4/5]">
            <img src={drDhirPortrait} alt={`${DOCTOR_PROFILE.name} — ${DOCTOR_PROFILE.role}`} className="w-full h-full object-cover object-top" width={1131} height={1414} loading="lazy" />
          </div>
        </motion.div>

        {/* content */}
        <motion.div {...fadeUp}>
          <Eyebrow>Meet Your Dentist</Eyebrow>
          <h2 className="font-display font-extrabold tracking-tight text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] text-teal-deep mt-4 mb-3 text-balance">
            Experience, Precision and Honest Patient Guidance
          </h2>
          <p className="text-turq-700 font-semibold text-lg mb-5">{DOCTOR_PROFILE.name}</p>
          <p className="text-[17px] text-muted2 max-w-xl mb-7">
            Dr. Kuldip Dhir combines extensive clinical experience with modern, digitally supported dentistry. Every treatment begins with a clear diagnosis, understandable options and a plan tailored to the patient's individual needs.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {CREDENTIALS.map((c) => (
              <div key={c} className="flex items-center gap-3 bg-cream border border-neutral-soft rounded-xl px-4 py-3">
                <span className="w-7 h-7 rounded-lg bg-turq-50 text-turq-600 grid place-items-center shrink-0"><Check className="w-4 h-4" /></span>
                <span className="text-[14px] font-semibold text-ink2">{c}</span>
              </div>
            ))}
          </div>
          <blockquote className="border-l-3 border-turq-500 pl-5 mb-8" style={{ borderLeftWidth: 3 }}>
            <Quote className="w-6 h-6 text-turq-300 mb-2" />
            <p className="font-display text-[18px] text-teal-deep italic leading-snug">"My priority is to help every patient understand their condition and treatment options before making a decision."</p>
          </blockquote>
          <div className="flex flex-wrap gap-3.5">
            <TButton to="/dentist">Meet Dr. Dhir <ArrowRight className="w-4 h-4" /></TButton>
            <TButton variant="ghost" onClick={() => open("meet_doctor")}>Book a Consultation</TButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- SMART DENTAL CHECK (dark teal feature) ---------- */
export const SmartCheck: React.FC<{ preset: string | null }> = ({ preset }) => (
  <section id="smart-check" className="relative bg-teal-deep py-20 lg:py-28 overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, #12B8B0, transparent 40%), radial-gradient(circle at 85% 80%, #12B8B0, transparent 40%)" }} />
    <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
      <div>
        <Eyebrow invert>Smart Patient Guidance</Eyebrow>
        <h2 className="font-display font-extrabold tracking-tight text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] text-white mt-4 mb-5 text-balance">
          Not Sure Which Dental Consultation You Need?
        </h2>
        <p className="text-turq-50/75 text-[18px] mb-8 max-w-md">
          Answer a few simple questions to understand the urgency and prepare useful information before contacting the clinic.
        </p>
        <ul className="space-y-3.5">
          {["Select your concern", "Pinpoint the location", "Choose severity & duration", "Get preliminary guidance", "Send a structured enquiry on WhatsApp"].map((t, i) => (
            <li key={t} className="flex items-center gap-3.5 text-white/90">
              <span className="w-8 h-8 rounded-full bg-turq-500/25 text-turq-200 grid place-items-center font-bold text-sm shrink-0">{i + 1}</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <ConcernAssessment preset={preset} />
    </div>
  </section>
);

/* ---------- REAL TREATMENT OUTCOMES ---------- */
const CASES = [
  { title: "Smile Restoration", context: "Reshaping and colour-matching for a balanced front-tooth appearance." },
  { title: "Crowns", context: "Restoring a damaged tooth's shape, strength and natural look." },
  { title: "Teeth Whitening", context: "Reducing staining for a brighter, refreshed smile under supervision." },
  { title: "Missing-Tooth Replacement", context: "Filling the gap with a stable, natural-looking restoration." },
];

export const Outcomes: React.FC = () => (
  <section className="py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <SectionHead center eyebrow="Real Patient Outcomes" title="Treatment Results Built Around Individual Needs"
        intro="Drag each slider to compare. Real, consented patient cases will be added here." />
      <p className="flex items-center justify-center gap-2 text-sm text-muted2 mb-9 text-center">
        <Check className="w-4 h-4 text-turq-600" /> Actual patient shown with consent. Results vary according to individual clinical conditions.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CASES.map((c) => (
          <motion.div key={c.title} {...fadeUp}>
            <BeforeAfter title={c.title} context={c.context} meta="Visits noted when verified · View Case" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* re-export a WhatsApp CTA helper used elsewhere if needed */
export const WaCTA: React.FC<{ source: string }> = ({ source }) => (
  <TButton variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", source)}><WaGlyph /> WhatsApp the Clinic</TButton>
);
