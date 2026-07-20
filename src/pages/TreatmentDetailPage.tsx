import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, Check, HelpCircle, Stethoscope, ListChecks, ShieldCheck } from "lucide-react";
import { SERVICES } from "../data";
import { DynamicIcon } from "../components/DynamicIcon";
import { Button } from "../components/ui/Bits";
import { CLINIC, waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";
import { StubPage } from "./StubPage";

const DETAIL_BLOCKS = [
  { key: "meaning", label: "What it is", icon: HelpCircle },
  { key: "whenNeeded", label: "When it's needed", icon: ListChecks },
  { key: "procedure", label: "How it's done", icon: Stethoscope },
  { key: "importance", label: "Why it matters", icon: ShieldCheck },
] as const;

export const TreatmentDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { open } = useAppointment();
  const service = SERVICES.find((s) => s.id === slug);
  const related = SERVICES.filter((s) => s.id !== slug).slice(0, 3);

  if (!service) {
    return <StubPage title="Treatment not found" eyebrow="Treatments" />;
  }

  return (
    <>
      {/* Header band */}
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-5xl mx-auto px-6 py-14 lg:py-16">
          <Link to="/treatments" className="inline-flex items-center gap-1.5 text-sm font-semibold text-body hover:text-brand-950 mb-6">
            <ArrowLeft className="w-4 h-4" /> All Treatments
          </Link>
          <div className="flex items-start gap-5">
            <span className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-hairline text-brand-600 grid place-items-center shadow-sm">
              <DynamicIcon name={service.iconName} className="w-8 h-8" />
            </span>
            <div>
              <h1 className="font-display font-bold tracking-tight text-[clamp(1.9rem,4vw,2.8rem)] text-ink text-balance">{service.name}</h1>
              <p className="text-[17px] text-body mt-3 max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body: detail blocks + sticky CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1.6fr_0.9fr] gap-10 lg:gap-14 items-start">
          <div className="space-y-8">
            {DETAIL_BLOCKS.map((b) => (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-hairline rounded-2xl p-6 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 grid place-items-center"><b.icon className="w-5 h-5" /></span>
                  <h2 className="font-display font-bold text-[19px] text-ink">{b.label}</h2>
                </div>
                <p className="text-body leading-relaxed">{service.details[b.key]}</p>
              </motion.div>
            ))}

            <div className="flex items-start gap-3 bg-[#FFF7E8] border border-[#F3E1B8] rounded-2xl p-4 text-sm text-[#7A5C1E]">
              <HelpCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#C99A2E]" />
              <span>This information is for general awareness. The right treatment for you depends on a clinical examination and diagnosis by Dr. Dhir.</span>
            </div>
          </div>

          {/* CTA card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-brand-950 rounded-[26px] p-7 text-white">
              <h3 className="font-display font-bold text-xl mb-2">Considering {service.name}?</h3>
              <p className="text-brand-100/80 text-sm mb-6">Book a consultation to get a clear diagnosis and a personalised plan — with your options explained upfront.</p>
              <div className="flex flex-col gap-3">
                <Button variant="light" onClick={() => open(`treatment_${service.id}`)} className="w-full">Book a Consultation</Button>
                <Button variant="wa" href={waLink(`Hello ${CLINIC.shortName}, I'd like to know more about ${service.name}.`)} onClick={() => trackEvent("wa_click", `treatment_${service.id}`)} className="w-full">WhatsApp Us</Button>
                <a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", `treatment_${service.id}`)} className="flex items-center justify-center gap-2 text-brand-100 text-sm font-semibold mt-1 hover:text-white">
                  <Phone className="w-4 h-4" /> {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-5 bg-white border border-hairline rounded-2xl p-6">
              <h4 className="font-bold text-ink text-sm mb-3">Good to know</h4>
              <ul className="space-y-2.5 text-sm text-body">
                <li className="flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />Clear diagnosis before any treatment</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />Options and estimate explained upfront</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />Comfort-focused, unhurried care</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-mist py-16 lg:py-20 border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display font-bold text-2xl text-ink mb-8">Related Treatments</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} to={`/treatments/${r.id}`} className="group bg-white border border-hairline rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 grid place-items-center mb-4"><DynamicIcon name={r.iconName} className="w-6 h-6" /></span>
                <h3 className="font-display font-bold text-ink mb-2">{r.name}</h3>
                <span className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-500">Know More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
