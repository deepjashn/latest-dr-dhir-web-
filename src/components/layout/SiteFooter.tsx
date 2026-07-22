import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";
import { CLINIC, trackEvent } from "../../content/site";

const TREATMENT_LINKS = [
  { label: "Root Canal Treatment", to: "/treatments/rct" },
  { label: "Dental Implants", to: "/treatments/implants" },
  { label: "Crowns & Bridges", to: "/treatments/crowns" },
  { label: "Smile Designing", to: "/treatments/smile" },
  { label: "Teeth Whitening", to: "/treatments/whitening" },
  { label: "Child Dental Care", to: "/treatments/pediatric" },
];
const QUICK_LINKS = [
  { label: "Meet Dr. Dhir", to: "/dentist" },
  { label: "Smart Dental Check", to: "/#smart-check" },
  { label: "All Treatments", to: "/treatments" },
  { label: "Contact", to: "/contact" },
];

export const SiteFooter: React.FC = () => (
  <footer className="bg-navy-deep text-[#9db3b0] pt-16 pb-7">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 mb-11">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl grid place-items-center text-white" style={{ background: "linear-gradient(140deg,#063B3B,#12B8B0)" }}>
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.5c-1.5-1.5-4-2-5.5-1C5 5.5 4.5 7.5 5 10c.4 2 .8 3.5 1.2 5.5.3 1.6.6 3 1.3 3s.9-1.2 1.2-2.6c.3-1.3.6-2.4 1.3-2.4s1 1.1 1.3 2.4c.3 1.4.5 2.6 1.2 2.6s1-1.4 1.3-3c.4-2 .8-3.5 1.2-5.5.5-2.5 0-4.5-1.5-5.5-1.5-1-4-.5-5.5 1z" />
              </svg>
            </span>
            <span className="leading-tight">
              <b className="block text-white font-extrabold font-display">Dr. Dhir's</b>
              <span className="block text-[11px] text-[#9db3b0]">Dental Care Multispeciality</span>
            </span>
          </Link>
          <p className="text-sm my-4 max-w-xs">
            Advanced multispeciality dental care in Kotkapura, Punjab — combining experienced clinical care with modern digital dentistry.
          </p>
          <div className="flex gap-2.5">
            <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 grid place-items-center text-white hover:bg-brand-500 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href={CLINIC.whatsappBase} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-lg bg-white/10 grid place-items-center text-white hover:bg-brand-500 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" /></svg>
            </a>
            <a href={CLINIC.phoneTel} aria-label="Call" className="w-9 h-9 rounded-lg bg-white/10 grid place-items-center text-white hover:bg-brand-500 transition-colors"><Phone className="w-5 h-5" /></a>
          </div>
        </div>

        <FooterCol title="Treatments" links={TREATMENT_LINKS} />
        <FooterCol title="Quick Links" links={QUICK_LINKS} />

        <div>
          <h4 className="text-white font-bold text-[15px] mb-4">Visit &amp; Contact</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" />{CLINIC.addressLine}, {CLINIC.city}, {CLINIC.state} – {CLINIC.pin}</li>
            <li>{CLINIC.hours}</li>
            <li><a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "footer")} className="hover:text-white">{CLINIC.phoneDisplay}</a></li>
            <li><a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("directions_click", "footer")} className="hover:text-white">Get Directions</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <p className="text-[13px] text-[#7a918d] leading-relaxed">
          Website information is for general awareness and does not replace professional dental examination or diagnosis.
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-3.5 mt-4 text-sm">
          <span>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</span>
          <div className="flex gap-4.5 flex-wrap">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/disclaimer" className="hover:text-white">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const FooterCol: React.FC<{ title: string; links: { label: string; to: string }[] }> = ({ title, links }) => (
  <div>
    <h4 className="text-white font-bold text-[15px] mb-4">{title}</h4>
    <ul className="flex flex-col gap-2.5 text-sm">
      {links.map((l) => (
        <li key={l.to + l.label}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
      ))}
    </ul>
  </div>
);
