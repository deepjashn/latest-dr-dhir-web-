import React from "react";
import { motion } from "motion/react";
import { Star, Quote, ExternalLink } from "lucide-react";
import { SectionHead, Button, Eyebrow } from "../components/ui/Bits";
import { waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

// Placeholder cards — replaced with real, consented Google/JustDial excerpts.
const PLACEHOLDER_REVIEWS = ["A", "B", "C", "D", "E", "F"];

export const ReviewsPage: React.FC = () => {
  const { open } = useAppointment();
  return (
    <>
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 text-center">
          <Eyebrow>Patient Experiences</Eyebrow>
          <h1 className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3rem)] text-ink mt-3.5 mb-4 text-balance">Trusted by Patients and Families</h1>
          <p className="text-[17px] text-body max-w-2xl mx-auto">Real experiences from patients across Kotkapura, Faridkot and nearby areas. Verified review content will be added with consent and correct attribution.</p>

          {/* Rating summary — awaiting verified JustDial / Google numbers */}
          <div className="inline-flex flex-wrap items-center justify-center gap-5 bg-white border border-hairline rounded-2xl px-7 py-5 mt-9">
            <div className="text-4xl font-extrabold text-ink font-display">[RATING]</div>
            <div className="text-left">
              <div className="flex gap-0.5 text-[#F0A500]">{[0,1,2,3,4].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
              <span className="text-sm text-body/70">Based on <b className="text-ink">[NUMBER]</b> verified reviews</span>
            </div>
            <a href="https://www.justdial.com/Kotkapura/Dr-Kuldip-Dhir-Dr-Dhirs-Multispeciality-Dental-Hospital-Romana-Albel-Singh/9999P1635-1635-231222162618-A2S6_BZDET" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("reviews_click", "justdial")} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-500 hover:text-brand-700">
              View on JustDial <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_REVIEWS.map((k) => (
              <motion.div key={k} {...fadeUp} className="bg-white border border-hairline rounded-2xl p-6">
                <Quote className="w-8 h-8 text-brand-200 mb-3" />
                <div className="flex gap-0.5 text-[#F0A500] mb-3">{[0,1,2,3,4].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-sm text-body mb-5 min-h-20">[Real patient review to be added — with consent and correct attribution from Google or JustDial.]</p>
                <div className="flex items-center gap-3 border-t border-hairline pt-4">
                  <span className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 grid place-items-center font-bold">{k}</span>
                  <div><b className="block text-sm text-ink">Patient name</b><span className="text-xs text-body/70">Source · date to be added</span></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-body mb-5">Been treated at the clinic? Your feedback helps other patients.</p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <Button onClick={() => open("reviews")}>Book an Appointment</Button>
              <Button variant="wa" href={waLink("Hello, I'd like to share my experience with the clinic.")} onClick={() => trackEvent("wa_click", "reviews")}>Share Your Experience</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
