import React from "react";
import { Clock, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { CLINIC, trackEvent } from "../../content/site";

// Slim bar above the header. Full detail on desktop, 3 quick actions on mobile.
export const UtilityBar: React.FC = () => (
  <div className="bg-brand-950 text-brand-100 text-[13px]">
    {/* desktop */}
    <div className="hidden sm:flex max-w-7xl mx-auto px-6 h-[42px] items-center gap-7">
      <span className="flex items-center gap-2"><Clock className="w-[15px] h-[15px] opacity-80" />{CLINIC.hours}</span>
      <span className="flex items-center gap-2"><MapPin className="w-[15px] h-[15px] opacity-80" />Faridkot Road, Kotkapura</span>
      <span className="ml-auto flex items-center gap-2"><Phone className="w-[15px] h-[15px] opacity-80" />Emergency: {CLINIC.phoneDisplay}</span>
      <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("directions_click", "utility_bar")} className="flex items-center gap-1 text-brand-300 font-semibold hover:text-white transition-colors">
        Get Directions <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
    {/* mobile */}
    <div className="sm:hidden grid grid-cols-3 text-white">
      <a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "utility_bar")} className="flex items-center justify-center gap-1.5 h-11 font-semibold border-r border-white/10"><Phone className="w-4 h-4" />Call</a>
      <a href={CLINIC.whatsappBase} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("wa_click", "utility_bar")} className="flex items-center justify-center gap-1.5 h-11 font-semibold border-r border-white/10">WhatsApp</a>
      <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("directions_click", "utility_bar")} className="flex items-center justify-center gap-1.5 h-11 font-semibold"><MapPin className="w-4 h-4" />Directions</a>
    </div>
  </div>
);
