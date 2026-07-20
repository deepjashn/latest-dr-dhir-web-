import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Award, Clock, ShieldCheck, ScanLine, ArrowRight, Check, Star,
  Stethoscope, Sparkles, Users, MessageCircle,
} from "lucide-react";
import { Button, SectionHead, Eyebrow, Placeholder } from "../components/ui/Bits";
import { CLINIC, waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";
import drDhirPortrait from "../assets/images/dr-kuldip-dhir.png";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const TREATMENTS = [
  { slug: "rct", name: "Root Canal Treatment", benefit: "Relieve tooth pain and preserve the natural tooth where clinically possible.", tag: "For persistent tooth pain", grad: "linear-gradient(135deg,#E4EEF6,#CFE0EE)" },
  { slug: "implants", name: "Dental Implants", benefit: "Replace missing teeth with a stable, natural-looking restoration.", tag: "For missing teeth", grad: "linear-gradient(135deg,#E3F0EC,#CBE4DA)" },
  { slug: "crowns", name: "Crowns & Bridges", benefit: "Restore damaged or missing teeth with durable, custom-fitted caps.", tag: "For broken or weak teeth", grad: "linear-gradient(135deg,#EDEAF5,#DCD5EC)" },
  { slug: "smile", name: "Smile Designing", benefit: "Plan a natural, balanced smile tailored to your face.", tag: "For cosmetic concerns", grad: "linear-gradient(135deg,#F5EEE4,#ECDDCB)" },
  { slug: "whitening", name: "Teeth Whitening", benefit: "Reduce staining and brighten your smile under supervision.", tag: "For stained teeth", grad: "linear-gradient(135deg,#E4F1F4,#C9E5EA)" },
  { slug: "dentures", name: "Dentures", benefit: "Comfortable, well-fitted options to restore chewing and confidence.", tag: "For multiple missing teeth", grad: "linear-gradient(135deg,#EAEEF3,#D2DCE8)" },
  { slug: "pediatric", name: "Child Dental Care", benefit: "Gentle, reassuring dental care that builds healthy habits early.", tag: "For children", grad: "linear-gradient(135deg,#E5F0E6,#CDE3CF)" },
  { slug: "emergency", name: "Emergency Dental Care", benefit: "Prompt attention for severe pain, swelling, injury or trauma.", tag: "For urgent situations", grad: "linear-gradient(135deg,#F5E6E6,#ECD0D0)" },
];

const TRUST = [
  { icon: Award, title: "MDS Dental Specialist", sub: "Postgraduate-qualified care" },
  { icon: Clock, title: "[VERIFIED]+ Years Experience", sub: "Clinical dental practice" },
  { icon: ShieldCheck, title: "Multi-Stage Sterilisation", sub: "Strict hygiene protocols" },
  { icon: ScanLine, title: "Digital Diagnosis", sub: "Imaging & treatment planning" },
];

const PILLARS = [
  { icon: Stethoscope, title: "Experienced Specialist Care", body: "Treatment led by an MDS-qualified dentist with extensive clinical experience." },
  { icon: ScanLine, title: "Modern Digital Dentistry", body: "Digital diagnosis and planning for clearer, more predictable treatment." },
  { icon: ShieldCheck, title: "Safe & Sterile Environment", body: "Multi-stage sterilisation and strict hygiene protocols on every visit." },
  { icon: MessageCircle, title: "Transparent Patient Guidance", body: "Clear options and honest advice so you can decide with confidence." },
];

export const HomePage: React.FC = () => {
  const { open } = useAppointment();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-mist">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.15fr_0.95fr] gap-12 lg:gap-14 items-center">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 bg-white border border-hairline px-4 py-2 rounded-full text-[13px] font-semibold text-brand-500 shadow-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Advanced Multispeciality Dental Care · Kotkapura
              </span>
              <h1 className="font-display font-bold tracking-tight text-[clamp(2.4rem,5vw,3.5rem)] text-ink text-balance leading-[1.08]">
                Expert Dental Care for Healthier, Confident Smiles
              </h1>
              <p className="text-[18px] text-body max-w-xl mt-5 mb-8">
                From root canal treatment and dental implants to smile design and preventive care — receive transparent, personalised treatment from an experienced MDS specialist.
              </p>
              <div className="flex flex-wrap gap-3.5 mb-5">
                <Button onClick={() => open("hero")}>Book Your Consultation</Button>
                <Button variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "hero")}>
                  <WaMark /> WhatsApp the Clinic
                </Button>
              </div>
              <p className="flex items-center gap-2 text-sm text-body/70">
                <Check className="w-4 h-4 text-accent" /> Same-day appointments subject to availability · Transparent guidance
              </p>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-brand-50">
                <img
                  src={drDhirPortrait}
                  alt="Dr. Kuldip Dhir, MDS — Senior Dental Specialist at Dr. Dhir's Dental Care Multispeciality Hospital, Kotkapura"
                  className="w-full h-full object-cover object-top"
                  width={1131}
                  height={1414}
                />
              </div>
              <div className="hidden sm:flex absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3.5 items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 grid place-items-center"><Award className="w-5 h-5" /></span>
                <div><b className="block text-[15px] text-ink">MDS Specialist</b><span className="text-xs text-body/70">Dr. Kuldip Dhir</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-brand-50 py-11">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {TRUST.map((t, i) => (
            <div key={t.title} className={`flex items-start gap-3.5 lg:px-7 ${i > 0 ? "lg:border-l border-hairline" : ""} ${i === 0 ? "lg:pl-0" : ""}`}>
              <span className="w-10 h-10 rounded-xl bg-white text-brand-500 grid place-items-center shrink-0 shadow-sm"><t.icon className="w-5 h-5" /></span>
              <div><b className="block text-ink text-[15px] leading-tight">{t.title}</b><span className="text-[13px] text-body/70">{t.sub}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TREATMENTS ===== */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            eyebrow="Dental Care for Every Stage of Life"
            title="Explore Our Dental Treatments"
            intro="Find the right care for pain relief, missing teeth, smile improvement and long-term oral health — each explained in clear, patient-friendly terms."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TREATMENTS.map((t) => (
              <motion.div key={t.slug} {...fadeUp}>
                <Link to={`/treatments/${t.slug}`} className="group flex flex-col h-full bg-white border border-hairline rounded-2xl overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-xl hover:border-transparent">
                  <Placeholder label={`${t.name} photo`} className="!rounded-none aspect-[3/2]" gradient={t.grad} />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-[18px] text-ink mb-2">{t.name}</h3>
                    <p className="text-sm text-body flex-1">{t.benefit}</p>
                    <span className="inline-flex self-start items-center gap-1.5 text-[12px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full my-3.5"><Check className="w-3 h-3" />{t.tag}</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-500">Know More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" to="/treatments">View All Treatments <ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </section>

      {/* ===== MEET THE DENTIST ===== */}
      <section className="bg-mist py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-14 items-center">
          <motion.div {...fadeUp}>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-brand-50">
              <img
                src={drDhirPortrait}
                alt="Dr. Kuldip Dhir, MDS — Senior Dental Specialist, Kotkapura"
                className="w-full h-full object-cover object-top"
                width={1131}
                height={1414}
              />
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <Eyebrow>Meet Your Dentist</Eyebrow>
            <h2 className="font-display font-bold tracking-tight text-[clamp(1.7rem,3.5vw,2.6rem)] mt-3.5 mb-5 text-ink text-balance">
              Experienced Care. Modern Dentistry. Honest Guidance.
            </h2>
            <p className="text-[17px] text-body max-w-xl mb-7">
              Dr. Kuldip Dhir brings extensive clinical experience to modern, digitally supported dental care in Kotkapura. Every treatment begins with a clear diagnosis, understandable options and a plan based on the patient's individual needs.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {["MDS Dental Specialist", "Advanced Root Canal Expertise", "Digital Treatment Planning", "FDILB 2024 Recognition"].map((c) => (
                <span key={c} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-950 bg-brand-50 px-3.5 py-2 rounded-lg"><Check className="w-4 h-4 text-brand-500" />{c}</span>
              ))}
            </div>
            <Button to="/dentist">Meet Dr. Dhir <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead center eyebrow="Why Patients Choose Us" title="Care Built on Trust and Clarity" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map((p) => (
              <motion.div key={p.title} {...fadeUp}>
                <span className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 grid place-items-center mb-4.5"><p.icon className="w-7 h-7" /></span>
                <h3 className="font-display font-bold text-[18px] text-ink mb-2.5">{p.title}</h3>
                <p className="text-sm text-body">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS TEASER ===== */}
      <section className="bg-mist py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead center eyebrow="Patient Experiences" title="Trusted by Patients and Families" />
          <div className="flex flex-wrap items-center justify-center gap-5 mb-10 bg-white border border-hairline rounded-2xl px-6 py-5 max-w-xl mx-auto">
            <div className="text-4xl font-extrabold text-ink font-display">[RATING]</div>
            <div>
              <div className="flex gap-0.5 text-[#F0A500]">{[0,1,2,3,4].map((i) => <Star key={i} className="w-4.5 h-4.5 fill-current" />)}</div>
              <span className="text-sm text-body/70">Based on <b className="text-ink">[NUMBER]</b> Google reviews</span>
            </div>
            <Button variant="outline" sm to="/reviews" className="sm:ml-auto">Read Reviews</Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {["A", "B", "C"].map((k) => (
              <div key={k} className="bg-white border border-hairline rounded-2xl p-6">
                <div className="flex gap-0.5 text-[#F0A500] mb-3">{[0,1,2,3,4].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-sm text-body mb-4 min-h-16">[Real Google review excerpt to be added — with patient consent and correct attribution.]</p>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 grid place-items-center font-bold">{k}</span>
                  <div><b className="block text-sm text-ink">Patient name</b><span className="text-xs text-body/70">Google · date</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-brand-950 py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold tracking-tight text-[clamp(1.8rem,4vw,2.8rem)] text-white text-balance mb-4">
            Ready to Discuss Your Dental Concern?
          </h2>
          <p className="text-[18px] text-brand-100/80 max-w-xl mx-auto mb-8">
            Book a consultation or share your concern with the clinic team on WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-5">
            <Button variant="light" onClick={() => open("final_cta")}>Book Appointment</Button>
            <Button variant="wa" href={waLink()} onClick={() => trackEvent("wa_click", "final_cta")}><WaMark /> Chat on WhatsApp</Button>
          </div>
          <p className="text-sm text-brand-100/60">Dental emergency? Call <a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "final_cta")} className="text-brand-300 font-bold">{CLINIC.phoneDisplay}</a></p>
        </div>
      </section>
    </>
  );
};

const WaMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
  </svg>
);
