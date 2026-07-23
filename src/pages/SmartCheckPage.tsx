import React from "react";
import { motion } from "motion/react";
import { ClipboardList, MapPin, Gauge, MessageCircle, AlertTriangle, Phone } from "lucide-react";
import { Eyebrow, SectionHead, fadeUp, TButton } from "../components/home/ui";
import { ConcernAssessment } from "../components/home/ConcernAssessment";
import { CLINIC, trackEvent } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";

const STEPS = [
  { icon: ClipboardList, title: "Select your concern", body: "Tell us what's bothering you — pain, sensitivity, swelling, a missing tooth and more." },
  { icon: MapPin, title: "Pinpoint the location", body: "Show us roughly where it is and what feels affected — tooth, gum or jaw." },
  { icon: Gauge, title: "Severity & duration", body: "How strong is it, when it started, and any swelling, fever or bleeding." },
  { icon: MessageCircle, title: "Get guidance + WhatsApp", body: "See an urgency level and next step, then send a structured enquiry to the clinic." },
];

export const SmartCheckPage: React.FC = () => {
  usePageMeta(
    "Smart Dental Check — Preliminary Dental Guidance | Dr. Dhir's Dental Care",
    "Answer a few simple questions about your dental concern to understand its urgency and prepare a structured enquiry for the clinic in Kotkapura. Preliminary guidance only."
  );

  return (
    <>
      {/* Hero band */}
      <section className="bg-teal-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, #12B8B0, transparent 40%), radial-gradient(circle at 85% 80%, #12B8B0, transparent 40%)" }} />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 py-16 lg:py-20 text-center">
          <Eyebrow invert>Smart Patient Guidance</Eyebrow>
          <h1 className="font-display font-extrabold tracking-tight text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] text-white mt-4 mb-5 text-balance">
            Not Sure Which Dental Consultation You Need?
          </h1>
          <p className="text-turq-50/80 text-[18px] max-w-xl mx-auto">
            Answer a few simple questions to understand the urgency of your concern and prepare useful information before contacting the clinic.
          </p>
        </div>
      </section>

      {/* The interactive assessment */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 -mt-24 relative z-10">
          <ConcernAssessment preset={null} />
        </div>
      </section>

      {/* How it works */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <SectionHead center eyebrow="How It Works" title="Four Simple Steps" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} className="bg-white border border-neutral-soft rounded-[22px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-11 h-11 rounded-2xl bg-turq-50 text-turq-600 grid place-items-center"><s.icon className="w-6 h-6" /></span>
                  <span className="font-display font-extrabold text-3xl text-neutral-soft">{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-[17px] text-teal-deep mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted2">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency + disclaimer */}
      <section className="pb-20 lg:pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-5">
          <div className="bg-[#FDECEC] border border-[#F5C9C9] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-2 text-[#C0392B]"><AlertTriangle className="w-5 h-5" /><b className="font-display text-lg">Dental emergency?</b></div>
            <p className="text-sm text-[#8a4a44] mb-4">For severe pain, facial swelling, uncontrolled bleeding, a knocked-out tooth, or difficulty breathing or swallowing, don't wait for the online check — contact the clinic straight away.</p>
            <TButton variant="wa" href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "smart_check_emergency")}><Phone className="w-4 h-4" /> Call {CLINIC.phoneDisplay}</TButton>
          </div>
          <div className="bg-white border border-neutral-soft rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-2 text-teal-deep"><AlertTriangle className="w-5 h-5 text-turq-600" /><b className="font-display text-lg">A note on this tool</b></div>
            <p className="text-sm text-muted2">This tool offers preliminary guidance only. It does not provide a medical diagnosis and does not replace clinical examination or imaging by a qualified dentist. Your answers simply help you and the clinic prepare for your visit.</p>
          </div>
        </div>
      </section>
    </>
  );
};
