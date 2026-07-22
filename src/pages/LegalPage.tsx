import React from "react";
import { CLINIC } from "../content/site";
import { Eyebrow } from "../components/ui/Bits";
import { usePageMeta } from "../hooks/usePageMeta";

type Kind = "privacy" | "terms" | "disclaimer";

const CONTENT: Record<Kind, { eyebrow: string; title: string; body: { h: string; p: string }[] }> = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    body: [
      { h: "What we collect", p: "When you book an appointment or send an enquiry, we collect the details you provide — typically your name, phone number and the reason for your visit. We do not collect sensitive health information through the website's general forms." },
      { h: "How we use it", p: "Your details are used only to respond to your enquiry, arrange your appointment and provide the care you request. We do not sell or rent your information to third parties." },
      { h: "WhatsApp & phone", p: "Enquiries sent via WhatsApp are handled through WhatsApp's own platform and are subject to their privacy terms. Calls are handled by our reception team." },
      { h: "Data retention", p: "Enquiry details are retained only as long as needed to serve your request and meet our record-keeping obligations, then securely removed." },
      { h: "Your choices", p: `You may ask us what information we hold about you, or request its correction or deletion, by contacting the clinic at ${CLINIC.phoneDisplay}.` },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Use",
    body: [
      { h: "Website purpose", p: "This website provides general information about Dr. Dhir's Dental Care Multispeciality Hospital and a way to request appointments. It does not provide medical or dental diagnosis." },
      { h: "No guarantee of outcome", p: "Information here is for general awareness. Treatment suitability and outcomes depend on a clinical examination. Nothing on this site should be taken as a promise of a specific result." },
      { h: "Appointments", p: "Submitting an enquiry or appointment request does not confirm a booking. Our team will contact you to confirm availability and a suitable time." },
      { h: "Content", p: "We aim to keep information accurate and current, but details such as timings and services may change. Please confirm with the clinic before relying on any specific detail." },
    ],
  },
  disclaimer: {
    eyebrow: "Legal",
    title: "Medical Disclaimer",
    body: [
      { h: "Not a substitute for examination", p: "Website information — including any smart guidance tools — is for general awareness only. It does not provide a medical or dental diagnosis and does not replace clinical examination, imaging or advice from a qualified dentist." },
      { h: "Smart guidance tools", p: "The Smart Dental Check offers preliminary guidance on urgency and the type of consultation that may be appropriate. It never diagnoses a condition or recommends medication." },
      { h: "In an emergency", p: `For severe pain, facial swelling, uncontrolled bleeding, or difficulty breathing or swallowing, seek urgent care and contact the clinic at ${CLINIC.phoneDisplay} as early as possible.` },
      { h: "Individual results", p: "Any treatment outcomes described are illustrative. Actual results vary according to each patient's individual clinical condition." },
    ],
  },
};

export const LegalPage: React.FC<{ kind: Kind }> = ({ kind }) => {
  const c = CONTENT[kind];
  usePageMeta(`${c.title} | Dr. Dhir's Dental Care`);
  return (
    <>
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14 lg:py-16">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="font-display font-extrabold tracking-tight text-[clamp(2rem,4vw,2.8rem)] text-ink mt-3.5">{c.title}</h1>
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 space-y-8">
          {c.body.map((s) => (
            <div key={s.h}>
              <h2 className="font-display font-bold text-[19px] text-ink mb-2">{s.h}</h2>
              <p className="text-body leading-relaxed">{s.p}</p>
            </div>
          ))}
          <p className="text-sm text-body/70 pt-4 border-t border-hairline">
            Questions about this page? Contact {CLINIC.name}, {CLINIC.addressLine}, {CLINIC.city} — {CLINIC.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
};
