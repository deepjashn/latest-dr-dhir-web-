import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, AlertTriangle, Check } from "lucide-react";
import { CLINIC, waLink, trackEvent } from "../../content/site";
import { WaGlyph } from "./ui";

interface Props {
  preset?: string | null; // concern preselected from the hero selector
}

const CONCERNS = [
  "Tooth pain", "Sensitivity", "Bleeding gums", "Swelling",
  "Missing tooth", "Broken or chipped tooth", "Smile / cosmetic concern",
  "Child dental concern", "Dental injury",
];
const QUADS = ["Upper left", "Upper right", "Lower left", "Lower right"];
const AREAS = ["Tooth", "Gum", "Jaw"];
const SEVERITIES = ["Mild", "Moderate", "Severe"];
const DURATIONS = ["Today", "Within a week", "Longer than a week"];
const EXTRAS = ["Swelling", "Fever", "Bleeding", "Constant pain"];

type State = {
  concern: string | null; quad: string | null; area: string | null;
  severity: string | null; duration: string | null; extras: string[];
};
const EMPTY: State = { concern: null, quad: null, area: null, severity: null, duration: null, extras: [] };

export const ConcernAssessment: React.FC<Props> = ({ preset }) => {
  const [step, setStep] = useState(1);
  const [s, setS] = useState<State>(EMPTY);

  // Jump-start from the hero concern selector.
  useEffect(() => {
    if (preset) {
      setS({ ...EMPTY, concern: preset });
      setStep(1);
      trackEvent("smart_check_start", "hero_preset");
    }
  }, [preset]);

  const canNext =
    (step === 1 && !!s.concern) ||
    (step === 2 && !!s.quad && !!s.area) ||
    (step === 3 && !!s.severity && !!s.duration);

  const result = computeResult(s);

  const toggleExtra = (v: string) =>
    setS((p) => ({ ...p, extras: p.extras.includes(v) ? p.extras.filter((x) => x !== v) : [...p.extras, v] }));

  const next = () => {
    if (step < 3) setStep(step + 1);
    else if (step === 3) { setStep(4); trackEvent("smart_check_complete", result.level); }
  };

  const waMessage =
    `Hello ${CLINIC.shortName}, I used the online dental concern check.\n\n` +
    `Concern: ${s.concern ?? "-"}\nLocation: ${s.quad ?? "-"}, ${s.area ?? "-"}\n` +
    `Severity: ${s.severity ?? "-"}\nDuration: ${s.duration ?? "-"}\n` +
    `Other: ${s.extras.length ? s.extras.join(", ") : "None"}\n` +
    `Suggested urgency: ${result.label}\n\nI'd like to book an appointment. My name is ____ and preferred time is ____.`;

  return (
    <div className="bg-white rounded-[26px] shadow-[0_30px_70px_-30px_rgba(6,59,59,0.5)] overflow-hidden">
      {/* progress */}
      <div className="h-1.5 bg-neutral-soft">
        <motion.div className="h-full bg-gradient-to-r from-turq-500 to-teal-deep" animate={{ width: `${step * 25}%` }} transition={{ duration: 0.35 }} />
      </div>

      <div className="p-6 sm:p-9">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28 }}>
            {step < 4 && <div className="text-xs font-bold uppercase tracking-[0.1em] text-turq-600 mb-2">Step {step} of 4</div>}

            {step === 1 && (
              <>
                <h3 className="font-display font-bold text-[22px] text-ink2 mb-6">What is your main concern?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CONCERNS.map((c) => (
                    <Opt key={c} active={s.concern === c} onClick={() => setS({ ...s, concern: c })}>{c}</Opt>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="font-display font-bold text-[22px] text-ink2 mb-6">Where is it located?</h3>
                <label className="block font-bold text-[15px] text-teal-deep mb-3">Area of the mouth</label>
                <div className="grid grid-cols-2 gap-2.5 max-w-sm mb-7">
                  {QUADS.map((q) => <Opt key={q} active={s.quad === q} onClick={() => setS({ ...s, quad: q })}>{q}</Opt>)}
                </div>
                <label className="block font-bold text-[15px] text-teal-deep mb-3">What feels affected?</label>
                <div className="grid grid-cols-3 gap-2.5 max-w-md">
                  {AREAS.map((a) => <Opt key={a} active={s.area === a} onClick={() => setS({ ...s, area: a })}>{a}</Opt>)}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="font-display font-bold text-[22px] text-ink2 mb-6">Tell us about the symptoms</h3>
                <label className="block font-bold text-[15px] text-teal-deep mb-3">How severe is it?</label>
                <div className="grid grid-cols-3 gap-2.5 mb-6">{SEVERITIES.map((v) => <Opt key={v} active={s.severity === v} onClick={() => setS({ ...s, severity: v })}>{v}</Opt>)}</div>
                <label className="block font-bold text-[15px] text-teal-deep mb-3">When did it start?</label>
                <div className="grid grid-cols-3 gap-2.5 mb-6">{DURATIONS.map((v) => <Opt key={v} active={s.duration === v} onClick={() => setS({ ...s, duration: v })}>{v}</Opt>)}</div>
                <label className="block font-bold text-[15px] text-teal-deep mb-3">Any of these? (optional)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">{EXTRAS.map((v) => <Opt key={v} active={s.extras.includes(v)} onClick={() => toggleExtra(v)}>{v}</Opt>)}</div>
              </>
            )}

            {step === 4 && (
              <div className="text-center">
                <span className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full mb-5 ${result.badge}`}>
                  <AlertTriangle className="w-4 h-4" /> {result.label}
                </span>
                <h3 className="font-display font-bold text-[26px] text-ink2 mb-3">Your Preliminary Guidance</h3>
                <p className="text-muted2 max-w-md mx-auto mb-6">{result.rec}</p>
                <div className="bg-cream border border-neutral-soft rounded-2xl p-5 text-left max-w-md mx-auto mb-6">
                  {[["Concern", s.concern], ["Location", `${s.quad ?? "—"} · ${s.area ?? "—"}`], ["Severity", s.severity], ["Duration", s.duration], ["Other", s.extras.join(", ") || "None reported"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-1.5 text-sm border-b border-neutral-soft last:border-0">
                      <span className="text-muted2">{k}</span><b className="text-ink2 text-right">{v || "—"}</b>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2.5 bg-[#FFF7E8] border border-[#F3E1B8] rounded-xl p-3.5 text-sm text-[#7A5C1E] text-left max-w-md mx-auto mb-6">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#C99A2E]" />
                  <span>This tool offers preliminary guidance only. It does not provide a medical diagnosis and does not replace clinical examination or imaging.</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("wa_click", "smart_check_result")} className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-2xl bg-wa text-white font-semibold hover:bg-wa-dark transition-colors">
                    <WaGlyph /> Send My Concern on WhatsApp
                  </a>
                  <button onClick={() => { setStep(1); setS(EMPTY); }} className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-2xl bg-neutral-soft text-teal-deep font-semibold hover:bg-turq-50 transition-colors">
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 4 && (
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="inline-flex items-center gap-1.5 font-semibold text-muted2 px-3 py-2 rounded-lg hover:bg-neutral-soft disabled:opacity-0">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} disabled={!canNext} className="inline-flex items-center gap-2 min-h-[52px] px-7 rounded-2xl bg-teal-deep text-white font-semibold hover:bg-navy-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {step === 3 ? "See Guidance" : "Continue"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Opt: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`min-h-[52px] px-4 py-3 rounded-xl border text-[15px] font-semibold text-center transition-all flex items-center justify-center gap-2 ${
      active ? "border-turq-500 bg-turq-50 text-teal-deep shadow-[inset_0_0_0_1px_var(--color-turq-500)]" : "border-neutral-soft bg-cream text-ink2 hover:border-turq-400 hover:bg-turq-50/50"
    }`}
  >
    {active && <Check className="w-4 h-4 text-turq-600 shrink-0" />}
    {children}
  </button>
);

function computeResult(s: State) {
  let score = 0;
  if (s.severity === "Severe") score += 3; else if (s.severity === "Moderate") score += 2; else if (s.severity) score += 1;
  if (s.extras.includes("Swelling")) score += 2;
  if (s.extras.includes("Fever")) score += 2;
  if (s.extras.includes("Bleeding")) score += 1;
  if (s.extras.includes("Constant pain")) score += 1;
  if (s.concern === "Dental injury") score += 3;
  if (s.duration === "Today" && s.severity === "Severe") score += 1;

  if (score >= 6) return { level: "emergency", label: "Urgent — Please Contact Us Now", badge: "bg-[#FDE8E8] text-[#C0392B]", rec: "Your answers suggest a situation that may need prompt attention. Please call the clinic as soon as possible so we can advise you and arrange an early visit." };
  if (score >= 4) return { level: "high", label: "High Priority — Book Soon", badge: "bg-[#FDF0E3] text-[#C87F2E]", rec: "We recommend booking an appointment within the next day or two. Meanwhile, avoid very hot, cold or hard foods on the affected side." };
  if (score >= 2) return { level: "medium", label: "Moderate — Schedule a Visit", badge: "bg-[#FFF7E8] text-[#A9852B]", rec: "A dental consultation in the coming days is advisable to diagnose the cause and discuss suitable treatment options." };
  return { level: "routine", label: "Routine — Plan a Check-up", badge: "bg-[#E7F6EE] text-[#1E8A54]", rec: "This appears to be a routine concern. A scheduled check-up will help confirm the cause and keep your oral health on track." };
}
