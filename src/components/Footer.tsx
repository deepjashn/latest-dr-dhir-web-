import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Phone, MapPin, Award } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const quickLinks = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "About Dentist", target: "about" },
    { label: "AI Dental Assistant", target: "ai-assistant" },
    { label: "Patient Care Portal", target: "patient-portal" },
    { label: "Contact Us", target: "contact" },
  ];

  const serviceLinks = [
    { label: "Root Canal Treatment", target: "services" },
    { label: "Smile Designing", target: "services" },
    { label: "Teeth Cleaning & Polishing", target: "services" },
    { label: "Teeth Whitening", target: "services" },
    { label: "Complete Dentures", target: "services" },
    { label: "Pediatric Dental Care", target: "services" },
  ];

  return (
    <footer id="main-footer" className="bg-neutral-950 text-gray-400 border-t border-neutral-900 pt-16 pb-8 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 border-b border-neutral-900 pb-12">
          
          {/* Column 1: Clinic Overview */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-powder-100 text-neutral-950 flex items-center justify-center font-bold text-lg border border-powder-200">
                D
              </span>
              <span className="font-display font-semibold text-lg tracking-tight text-white">
                Dr. Dhir’s Dental Care
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Advanced multispeciality dental treatments directed by <strong>Dr. Kuldip Dhir, MDS</strong> — RCT Specialist with over 35 years of medical excellence. Bringing healthy, beautiful smiles to Kot Kapura, Punjab.
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-2.5 pt-2">
              {["facebook", "instagram", "twitter", "youtube"].map((sc) => (
                <a
                  key={sc}
                  id={`social-link-${sc}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-powder-100 hover:text-neutral-950 border border-neutral-850 flex items-center justify-center transition-all cursor-pointer"
                  aria-label={sc}
                >
                  {sc === "facebook" && <Facebook className="w-4 h-4" />}
                  {sc === "twitter" && <Twitter className="w-4 h-4" />}
                  {sc === "instagram" && <Instagram className="w-4 h-4" />}
                  {sc === "youtube" && <Youtube className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="hover:text-white transition-colors cursor-pointer text-gray-400 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white">Featured Treatments</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="hover:text-white transition-colors cursor-pointer text-gray-400 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Address */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white">Clinic Address</h4>
            <div className="text-xs sm:text-sm space-y-3.5">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-powder-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-relaxed">
                  Dhir Complex, Near Petrol Pump,<br />
                  Faridkot Road, Kot Kapura,<br />
                  Punjab, India
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-powder-400 shrink-0" />
                <a href="tel:07009488220" className="hover:text-white transition-colors font-semibold text-gray-300">
                  +91 70094 88220
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-powder-400 shrink-0" />
                <span className="text-gray-400 font-medium">Dr. Kuldip Dhir, MDS (Endodontist)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center sm:text-left leading-normal">
            &copy; 2026 Dr. Dhir’s Dental Care Multispeciality. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-850">
            <span className="w-1.5 h-1.5 rounded-full bg-powder-400 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-powder-300 font-bold">
              Certified Endodontic Care &bull; Kot Kapura, Punjab
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
