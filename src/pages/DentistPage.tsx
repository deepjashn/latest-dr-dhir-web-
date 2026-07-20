import React from "react";
import { motion } from "motion/react";
import { Check, Quote, ArrowRight } from "lucide-react";
import { DOCTOR_PROFILE, TRUST_BADGES } from "../data";
import { DynamicIcon } from "../components/DynamicIcon";
import { Button, Eyebrow, SectionHead } from "../components/ui/Bits";
import { waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";
import drDhirPortrait from "../assets/images/dr-kuldip-dhir.png";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export const DentistPage: React.FC = () => {
  const { open } = useAppointment();
  const d = DOCTOR_PROFILE;

  return (
    <>
      {/* Hero: portrait + intro */}
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-14 items-center">
          <motion.div {...fadeUp} className="relative">
            <div className="aspect-[4/5] rounded-[26px] overflow-hidden shadow-xl bg-brand-50">
              <img src={drDhirPortrait} alt={`${d.name} — ${d.role}`} className="w-full h-full object-cover object-top" width={1131} height={1414} />
            </div>
            <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3.5 items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 grid place-items-center"><DynamicIcon name="Award" className="w-5 h-5" /></span>
              <div><b className="block text-[15px] text-ink">{d.qualifications}</b><span className="text-xs text-body/70">{d.role}</span></div>
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <Eyebrow>Meet Your Dentist</Eyebrow>
            <h1 className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3rem)] text-ink mt-3.5 mb-2 text-balance">{d.name}</h1>
            <p className="text-brand-600 font-semibold text-lg mb-5">{d.role}</p>
            <p className="text-[17px] text-body max-w-xl mb-7">{d.aboutText}</p>
            <div className="flex flex-wrap gap-3.5">
              <Button onClick={() => open("dentist_hero")}>Book with Dr. Dhir</Button>
              <Button variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "dentist_hero")}>WhatsApp the Clinic</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead center eyebrow="Qualifications & Recognition" title="Credentials You Can Trust" />
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {d.credentials.map((c) => (
              <motion.div key={c} {...fadeUp} className="flex items-start gap-3.5 bg-white border border-hairline rounded-2xl p-5">
                <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 grid place-items-center shrink-0"><Check className="w-5 h-5" /></span>
                <span className="text-ink font-semibold pt-1.5">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience highlights */}
      <section className="bg-brand-950 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead invert center eyebrow="Experience & Expertise" title="Decades of Clinical Practice" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {d.experienceHighlights.map((h) => (
              <motion.div key={h} {...fadeUp} className="bg-white/[0.06] border border-white/10 rounded-2xl p-6">
                <span className="w-11 h-11 rounded-xl bg-brand-500/20 text-brand-300 grid place-items-center mb-4"><Check className="w-6 h-6" /></span>
                <p className="text-brand-100/90">{h}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {TRUST_BADGES.map((b) => (
              <div key={b.id} className="text-center">
                <span className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 grid place-items-center mx-auto mb-4"><DynamicIcon name={b.iconName} className="w-7 h-7" /></span>
                <b className="block text-ink font-display font-bold">{b.title}</b>
                <span className="text-sm text-body/70">{b.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission quote */}
      <section className="bg-mist py-20 lg:py-24 border-t border-hairline">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Quote className="w-10 h-10 text-brand-300 mx-auto mb-6" />
          <p className="font-display font-medium text-[clamp(1.3rem,2.6vw,1.8rem)] text-ink leading-snug text-balance">{d.missionStatement}</p>
          <p className="text-brand-600 font-semibold mt-6">— {d.name}</p>
          <div className="mt-9">
            <Button onClick={() => open("dentist_mission")}>Book an Appointment <ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </section>
    </>
  );
};
