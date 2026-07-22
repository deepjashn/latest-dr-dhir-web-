import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { SERVICES } from "../data";
import { DynamicIcon } from "../components/DynamicIcon";
import { Button, SectionHead } from "../components/ui/Bits";
import { CLINIC, waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

// Soft teal-family gradient per card so the grid doesn't read as identical tiles.
const GRADS = [
  "linear-gradient(135deg,#DFF7F4,#a5e6df)",
  "linear-gradient(135deg,#e7f2f0,#c9e6df)",
  "linear-gradient(135deg,#e0f2ef,#b9e2da)",
  "linear-gradient(135deg,#eaf3f1,#cfe6e0)",
  "linear-gradient(135deg,#dff3f0,#aee0d6)",
  "linear-gradient(135deg,#eef4f2,#d3e8e2)",
  "linear-gradient(135deg,#e3f1ee,#c2e4db)",
  "linear-gradient(135deg,#e8f4f2,#c7e7e0)",
];

export const TreatmentsPage: React.FC = () => {
  const { open } = useAppointment();

  return (
    <>
      {/* Page hero */}
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <SectionHead
            eyebrow="Dental Care for Every Stage of Life"
            title="Explore Our Dental Treatments"
            intro="From pain relief and root canals to implants, smile design and preventive care — every treatment is explained clearly, so you always understand your options before you decide."
          />
          <div className="flex flex-wrap gap-3.5">
            <Button onClick={() => open("treatments_hero")}>Book a Consultation</Button>
            <Button variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "treatments_hero")}>WhatsApp the Clinic</Button>
          </div>
        </div>
      </section>

      {/* Grid of ALL real services */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.id} {...fadeUp}>
                <Link
                  to={`/treatments/${s.id}`}
                  className="group flex flex-col h-full bg-white border border-hairline rounded-2xl overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-xl hover:border-transparent"
                >
                  <div className="relative aspect-[16/9] grid place-items-center" style={{ background: GRADS[i % GRADS.length] }}>
                    <span className="w-14 h-14 rounded-2xl bg-white/85 backdrop-blur text-brand-600 grid place-items-center shadow-sm">
                      <DynamicIcon name={s.iconName} className="w-7 h-7" />
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-[18px] text-ink mb-2">{s.name}</h3>
                    <p className="text-sm text-body flex-1">{s.description}</p>
                    <span className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-500 mt-4">
                      Know More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency strip */}
      <section className="bg-brand-950 py-14">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-6 justify-between text-center sm:text-left">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-1.5">Dental emergency?</h3>
            <p className="text-brand-100/80">Severe pain, swelling, or a knocked-out tooth — call us as early as possible.</p>
          </div>
          <Button variant="light" href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "treatments_emergency")}>
            <Phone className="w-4 h-4" /> Call {CLINIC.phoneDisplay}
          </Button>
        </div>
      </section>
    </>
  );
};
