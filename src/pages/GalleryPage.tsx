import React from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { Placeholder, SectionHead, Button } from "../components/ui/Bits";
import { waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";
import clinicExterior from "../assets/images/clinic-exterior.jpg";

const TILES: { label: string; grad?: string; img?: string; alt?: string }[] = [
  { label: "Clinic building — Dhir Complex, Faridkot Road", img: clinicExterior, alt: "Dr. Dhir's Dental Care Multispeciality Hospital building exterior, Dhir Complex, Faridkot Road, Kotkapura" },
  { label: "Reception area photo", grad: "linear-gradient(135deg,#DFF7F4,#a5e6df)" },
  { label: "Consultation room photo", grad: "linear-gradient(135deg,#e7f2f0,#c9e6df)" },
  { label: "Treatment operatory photo", grad: "linear-gradient(135deg,#e0f2ef,#b9e2da)" },
  { label: "Digital imaging / equipment photo", grad: "linear-gradient(135deg,#eaf3f1,#cfe6e0)" },
  { label: "Sterilisation area photo", grad: "linear-gradient(135deg,#e3f1ee,#c2e4db)" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export const GalleryPage: React.FC = () => {
  const { open } = useAppointment();
  return (
    <>
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <SectionHead
            center
            eyebrow="Take a Look Inside"
            title="See the Clinic Before Your Visit"
            intro="A calm, modern and hygienic environment — so your first visit already feels familiar. Real clinic photos will be added here."
          />
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TILES.map((t) => (
              <motion.div key={t.label} {...fadeUp}>
                {t.img ? (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                    <img src={t.img} alt={t.alt} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute bottom-3 left-3 bg-brand-950/70 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold">{t.label}</span>
                  </div>
                ) : (
                  <Placeholder label={t.label} className="aspect-[4/3]" gradient={t.grad} tag="Photo to be added" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center text-center gap-4 bg-brand-50 rounded-2xl p-8">
            <span className="w-12 h-12 rounded-2xl bg-white text-brand-500 grid place-items-center"><Camera className="w-6 h-6" /></span>
            <p className="text-body max-w-md">Have clinic photos ready? Share them and we'll drop them straight into this gallery — reception, treatment rooms, equipment and sterilisation.</p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <Button onClick={() => open("gallery")}>Book a Visit</Button>
              <Button variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "gallery")}>WhatsApp the Clinic</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
