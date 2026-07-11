import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Lock, Calendar, FileText, Activity, Phone, Search, 
  RefreshCw, AlertCircle, Info, Clock, Sparkles
} from "lucide-react";
import { Appointment } from "../types";

interface PatientPortalProps {
  onNavigate: (sectionId: string) => void;
  bookingTriggerCounter: number;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ onNavigate, bookingTriggerCounter }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [queriedAppointments, setQueriedAppointments] = useState<Appointment[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleLookup = async (phoneToQuery?: string) => {
    const targetPhone = phoneToQuery || phoneNumber;
    if (!targetPhone.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    try {
      const response = await fetch(`/api/appointments?phone=${encodeURIComponent(targetPhone.trim())}`);
      if (!response.ok) {
        throw new Error("Failed to retrieve records");
      }
      const data = await response.json();
      setQueriedAppointments(data.appointments || []);
    } catch (err) {
      setSearchError("Unable to load appointment details. Please try again later.");
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDemoLookupFill = (num: string) => {
    setPhoneNumber(num);
    handleLookup(num);
  };

  return (
    <section id="patient-portal" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="text-left max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Digital Health Office</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading font-medium tracking-tight text-powder-950 leading-none">
          Patient Care Portal
        </h2>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans max-w-2xl">
          Access your dental logs, print diagnostic receipts, and check appointment triage statuses using our integrated modern health workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Workspace Card (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-powder-100 rounded-[2rem] p-6 sm:p-8 shadow-premium text-left space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-powder-500 animate-pulse" />
              <h3 className="font-display font-semibold text-sm sm:text-base text-powder-950">Patient Workspace Console</h3>
            </div>
            <span className="text-[10px] bg-powder-100 text-powder-800 px-2.5 py-1 rounded-full font-mono font-bold tracking-wide uppercase">
              v2026.1 Secure
            </span>
          </div>

          {/* Secure disclaimer */}
          <div className="p-4 bg-powder-50/60 border border-powder-100/50 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-powder-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-left">
              <p className="text-xs font-semibold text-powder-950">
                Care Portal Authentication Notice
              </p>
              <p className="text-[11px] text-gray-500 leading-normal font-sans">
                To protect confidential clinical records, direct visual patient database access requires physical verification. For immediate changes, please contact our Kot Kapura reception directly at <strong>070094 88220</strong>.
              </p>
            </div>
          </div>

          {/* Locked Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Login */}
            <div className="border border-gray-100 p-5 rounded-2xl space-y-3 opacity-60 relative group bg-stone-50/50">
              <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold">
                Locked
              </div>
              <div className="w-10 h-10 bg-white border border-gray-150 rounded-xl flex items-center justify-center text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-powder-950 uppercase tracking-wide">Secure Patient Login</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Protected with 6-digit OTP passcode.</p>
              </div>
            </div>

            {/* History */}
            <div className="border border-gray-100 p-5 rounded-2xl space-y-3 opacity-60 relative bg-stone-50/50">
              <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold">
                Locked
              </div>
              <div className="w-10 h-10 bg-white border border-gray-150 rounded-xl flex items-center justify-center text-gray-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-powder-950 uppercase tracking-wide">Treatment History</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Review teeth restoration records.</p>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="border border-gray-100 p-5 rounded-2xl space-y-3 opacity-60 relative bg-stone-50/50">
              <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold">
                Locked
              </div>
              <div className="w-10 h-10 bg-white border border-gray-150 rounded-xl flex items-center justify-center text-gray-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-powder-950 uppercase tracking-wide">Reports & Radiographs</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Download diagnostic x-ray files.</p>
              </div>
            </div>

            {/* Book slot */}
            <button
              onClick={() => onNavigate("ai-assistant")}
              className="border border-powder-100 hover:border-powder-300 p-5 rounded-2xl space-y-3 text-left bg-powder-100/30 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-10 h-10 bg-white text-powder-950 border border-powder-200 rounded-xl flex items-center justify-center group-hover:bg-powder-950 group-hover:text-white transition-all">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-powder-950 uppercase tracking-wide flex items-center gap-1">
                  <span>Schedule Consultation</span>
                  <span className="text-powder-600 group-hover:translate-x-0.5 transition-all">&rarr;</span>
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Submit appointment slot request instantly.</p>
              </div>
            </button>

          </div>
        </div>

        {/* Live Lookup Board (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-powder-950 rounded-[2rem] p-6 sm:p-8 text-white text-left space-y-6 border border-powder-900 shadow-2xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-powder-400 font-bold block">Live Records Board</span>
              <h3 className="font-display font-semibold text-lg text-white">Appointment Live Status</h3>
              <p className="text-xs text-gray-300 leading-normal font-sans">
                Type the phone number used during scheduling to verify status and slot details.
              </p>
            </div>

            {/* Input search */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter phone (e.g. 070094 88220)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                  className="w-full bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-powder-400 pr-10"
                />
                <button
                  onClick={() => handleLookup()}
                  disabled={isSearching}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-powder-300 hover:text-white transition-all cursor-pointer"
                >
                  {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </div>

              {/* Demo quick trigger */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-gray-400">
                <span>Demo Lookup:</span>
                <button 
                  onClick={() => handleDemoLookupFill("070094 88220")} 
                  className="underline hover:text-white cursor-pointer text-powder-300"
                >
                  070094 88220
                </button>
                <span>or</span>
                <button 
                  onClick={() => handleDemoLookupFill("9876543210")} 
                  className="underline hover:text-white cursor-pointer text-powder-300"
                >
                  9876543210
                </button>
              </div>
            </div>

            {/* Output status */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              {isSearching && (
                <div className="flex items-center justify-center gap-2 py-6 text-xs text-gray-300">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Loading from clinical registry...</span>
                </div>
              )}

              {searchError && (
                <div className="p-3 bg-red-950/40 border border-red-900 text-red-200 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {!isSearching && !searchError && queriedAppointments !== null && (
                <div className="space-y-3">
                  <span className="text-[9px] font-mono tracking-wider text-powder-400 uppercase block font-bold">
                    Registered Records ({queriedAppointments.length})
                  </span>

                  {queriedAppointments.length === 0 ? (
                    <div className="text-center py-6 text-xs text-gray-400 border border-white/5 border-dashed rounded-xl">
                      No matches found for this number.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      {queriedAppointments.map((apt) => (
                        <div 
                          key={apt.id} 
                          className="bg-white/5 border border-white/10 p-4 rounded-xl text-left space-y-2 text-xs"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-white">{apt.name}</span>
                            <span className="text-[9px] font-mono font-bold text-powder-400 bg-white/10 px-2 py-0.5 rounded">
                              {apt.id}
                            </span>
                          </div>
                          <div className="text-gray-300 text-[11px] space-y-1 font-sans">
                            <p className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-powder-400" />
                              <span>{apt.service}</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-powder-400" />
                              <span>{apt.date} at {apt.time}</span>
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-[10px] text-gray-400">Triage:</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              apt.status === "Confirmed" 
                                ? "bg-powder-900/40 text-powder-300 border border-powder-800" 
                                : "bg-amber-950 text-amber-400 border border-amber-800"
                            }`}>
                              {apt.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Quick contact trigger */}
          <div className="bg-powder-50 border border-powder-100 p-6 rounded-3xl text-left flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-display font-semibold text-sm text-powder-950">Immediate Questions?</h4>
              <p className="text-xs text-gray-500 font-sans">Call reception desk directly.</p>
            </div>
            <a
              href="tel:+917009488220"
              className="px-4 py-2.5 bg-white text-powder-950 border border-powder-200 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4 text-powder-700" />
              <span>Call Now</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
