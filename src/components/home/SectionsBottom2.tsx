import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, CalendarClock, BadgeCheck, Phone, MapPin, Clock, Navigation, Plus, ArrowRight } from "lucide-react";
import { SectionHead, Eyebrow, fadeUp, TButton, WaGlyph } from "./ui";
import { CLINIC, waLink, trackEvent } from "../../content/site";
import { useAppointment } from "../layout/AppointmentModal";

/* ---------- APPOINTMENT PROCESS ---------- */
const STEPS = [
  { icon: MessageSquare, title: "Tell Us Your Concern", body: "Share what's bothering you or the treatment you're considering." },
  { icon: CalendarClock, title: "Choose a Convenient Time", body: "Pick a preferred date and time that suits your schedule." },
  { icon: BadgeCheck, title: "Receive WhatsApp Confirmation", body: "Our team confirms your appointment and shares any details." },
];

export const AppointmentSteps: React.FC = () => {
  const { open } = useAppointment();
  return (
    <section className="bg-turq-50/50 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHead center eyebrow="Easy Appointment Booking" title="Your Visit Starts in Three Simple Steps" />
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {STEPS.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} className="relative bg-white border border-neutral-soft rounded-[24px] p-7 text-center">
              <span className="w-14 h-14 rounded-2xl bg-teal-deep text-white grid place-items-center mx-auto mb-4"><s.icon className="w-7 h-7" /></span>
              <span className="absolute top-5 right-6 font-display font-extrabold text-4xl text-neutral-soft">{i + 1}</span>
              <h3 className="font-display font-bold text-[18px] text-teal-deep mb-2">{s.title}</h3>
              <p className="text-sm text-muted2">{s.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <TButton onClick={() => open("appointment_steps")}>Book Appointment</TButton>
          <TButton variant="ghost" href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "appointment_steps")}><Phone className="w-4 h-4" /> Call {CLINIC.phoneDisplay}</TButton>
          <TButton variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "appointment_steps")}><WaGlyph /> WhatsApp</TButton>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "Do I need an appointment?", a: "Appointments are recommended so we can keep your waiting time short and plan enough time for your visit. Walk-ins and urgent cases are accommodated wherever possible — please call ahead if you can." },
  { q: "What should I bring to my first visit?", a: "Please bring any previous dental records, X-rays or reports, a list of current medications, and details of any medical conditions. This helps us plan the safest, most suitable care for you." },
  { q: "Is emergency dental care available?", a: "Yes. For severe pain, swelling, injury or a knocked-out tooth, please call as early as possible so we can advise you and arrange prompt attention." },
  { q: "How long does a consultation take?", a: "An initial consultation usually takes around 20–30 minutes, including examination and discussion of your options. Treatment time depends on the procedure and is explained beforehand." },
  { q: "How is treatment cost determined?", a: "Cost depends on your diagnosis, the treatment needed and the materials involved. After your examination you'll receive clear options and an estimate before any treatment begins." },
  { q: "Will different treatment options be explained?", a: "Yes. Wherever more than one suitable approach exists, we explain the options, their benefits and trade-offs, so you can make an informed decision that fits your needs." },
  { q: "What payment methods are accepted?", a: "We accept common payment methods including cash and digital payments (UPI/cards). Please ask reception for current options and any available plans for larger treatments." },
  { q: "How can I reschedule?", a: "Simply call or WhatsApp us with your preferred new time. We'll do our best to accommodate you at the earliest convenient slot." },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <SectionHead center eyebrow="Common Questions" title="Frequently Asked Questions" />
        <div className="divide-y divide-neutral-soft border-y border-neutral-soft">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q}>
                <button onClick={() => setOpenIdx(isOpen ? null : i)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                  <span className="font-display font-bold text-[17px] text-teal-deep">{f.q}</span>
                  <Plus className={`w-6 h-6 shrink-0 text-turq-600 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[15px] text-muted2 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- LOCATION & CONTACT ---------- */
export const LocationContact: React.FC = () => {
  const { open } = useAppointment();
  return (
    <section id="location" className="bg-cream py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHead eyebrow="Visit Us" title="Find Us in Kotkapura"
          intro="On Faridkot Road, near the petrol pump — easy to reach from across Kotkapura and Faridkot." />
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="space-y-1 mb-7">
              <Row icon={MapPin} title="Clinic Address">{CLINIC.addressLine}, {CLINIC.city}, {CLINIC.state} – {CLINIC.pin}</Row>
              <Row icon={Clock} title="Clinic Hours">{CLINIC.hours}</Row>
              <Row icon={Phone} title="Phone & WhatsApp"><a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "location")} className="text-turq-600 font-semibold">{CLINIC.phoneDisplay}</a></Row>
              <Row icon={Navigation} title="Landmark">{CLINIC.landmark}</Row>
            </div>
            <div className="flex flex-wrap gap-3">
              <TButton variant="ghost" href={CLINIC.mapsUrl} onClick={() => trackEvent("directions_click", "location")}><MapPin className="w-4 h-4" /> Get Directions</TButton>
              <TButton variant="ghost" href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "location")}><Phone className="w-4 h-4" /> Call Clinic</TButton>
              <TButton onClick={() => open("location")}>Book Appointment</TButton>
            </div>
          </div>
          <div className="rounded-[24px] overflow-hidden shadow-sm border border-neutral-soft">
            <iframe title="Map to Dr. Dhir's Dental Care Multispeciality Hospital, Kotkapura" src={CLINIC.mapEmbedUrl} className="w-full aspect-[16/11] block" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Row: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 py-4 border-b border-neutral-soft last:border-0">
    <span className="w-11 h-11 rounded-xl bg-turq-50 text-turq-600 grid place-items-center shrink-0"><Icon className="w-5 h-5" /></span>
    <div><b className="block text-teal-deep text-[15px] mb-0.5">{title}</b><span className="text-sm text-muted2">{children}</span></div>
  </div>
);

/* ---------- FINAL CTA ---------- */
export const FinalCTA: React.FC = () => {
  const { open } = useAppointment();
  return (
    <section className="bg-navy-deep py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <Eyebrow invert>We're Here to Help</Eyebrow>
        <h2 className="font-display font-extrabold tracking-tight text-[clamp(2rem,4vw,3rem)] text-white mt-4 mb-4 text-balance">
          Ready to Discuss Your Dental Concern?
        </h2>
        <p className="text-[18px] text-turq-50/75 max-w-xl mx-auto mb-8">
          Book a consultation or share your concern with the clinic team on WhatsApp.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <TButton variant="light" onClick={() => open("final_cta")}>Book Appointment</TButton>
          <TButton variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "final_cta")}><WaGlyph /> Chat on WhatsApp</TButton>
        </div>
        <p className="text-sm text-turq-50/60">Dental emergency? Call <a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "final_cta")} className="text-turq-300 font-bold">{CLINIC.phoneDisplay}</a></p>
      </div>
    </section>
  );
};
