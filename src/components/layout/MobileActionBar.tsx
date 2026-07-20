import React from "react";
import { Phone, Calendar } from "lucide-react";
import { CLINIC, trackEvent } from "../../content/site";
import { useAppointment } from "./AppointmentModal";

// Persistent bottom action bar on mobile: Call · WhatsApp · Book.
export const MobileActionBar: React.FC = () => {
  const { open } = useAppointment();
  return (
    <div
      className="sm:hidden fixed bottom-0 inset-x-0 z-[800] bg-white border-t border-hairline shadow-[0_-4px_20px_rgba(16,42,67,0.1)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 gap-2.5 p-2.5">
        <a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "mobile_bar")} className="flex flex-col items-center justify-center gap-1 min-h-12 rounded-xl bg-brand-50 text-brand-950 text-xs font-bold">
          <Phone className="w-5 h-5" /> Call
        </a>
        <a href={CLINIC.whatsappBase} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("wa_click", "mobile_bar")} className="flex flex-col items-center justify-center gap-1 min-h-12 rounded-xl bg-wa text-white text-xs font-bold">
          <WaMark /> WhatsApp
        </a>
        <button onClick={() => open("mobile_bar")} className="flex flex-col items-center justify-center gap-1 min-h-12 rounded-xl bg-brand-950 text-white text-xs font-bold">
          <Calendar className="w-5 h-5" /> Book
        </button>
      </div>
    </div>
  );
};

const WaMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
  </svg>
);
