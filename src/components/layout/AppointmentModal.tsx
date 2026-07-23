import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Check, Phone } from "lucide-react";
import { CLINIC, waLink, trackEvent } from "../../content/site";

// ---- Context so any component can open the booking modal ----
interface ApptCtx {
  open: (source?: string) => void;
  close: () => void;
}
const AppointmentContext = createContext<ApptCtx>({ open: () => {}, close: () => {} });
export const useAppointment = () => useContext(AppointmentContext);

interface FormState {
  name: string;
  phone: string;
  patientType: "" | "new" | "existing";
  concern: string;
  date: string;
  time: string;
  consent: boolean;
}
const EMPTY: FormState = { patientType: "", name: "", phone: "", concern: "", date: "", time: "", consent: false };

const CONCERNS = [
  "Tooth pain",
  "Missing tooth",
  "Smile improvement",
  "Bleeding gums",
  "Child dental care",
  "Dental emergency",
  "Routine check-up",
  "Other",
];

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [success, setSuccess] = useState(false);

  const open = useCallback((source?: string) => {
    trackEvent("book_appointment_click", source);
    setSuccess(false);
    setForm(EMPTY);
    setErrors({});
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // lock scroll + escape to close
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, boolean>> = {};
    if (!form.patientType) e.patientType = true;
    if (!form.name.trim()) e.name = true;
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = true;
    if (!form.concern) e.concern = true;
    if (!form.consent) e.consent = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const patientLabel = form.patientType === "existing" ? "Existing patient" : "New patient";
    const msg =
      `Hello ${CLINIC.shortName}, I'd like to book an appointment.\n\n` +
      `Patient: ${patientLabel}\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nConcern: ${form.concern}\n` +
      `Preferred date: ${form.date || "Any"}\nPreferred time: ${form.time || "Any"}`;
    trackEvent("form_submit_success", "appointment_modal");
    window.open(waLink(msg), "_blank", "noopener");
    setSuccess(true);
  };

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  return (
    <AppointmentContext.Provider value={{ open, close }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-brand-950/55 backdrop-blur-[2px]" onClick={close} />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="appt-title"
                className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-[26px] shadow-2xl"
                initial={{ y: 26, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 20, scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between p-6 pb-0">
                  <div>
                    <h3 id="appt-title" className="font-display text-2xl font-bold text-ink">Book Your Appointment</h3>
                    <p className="text-sm text-body/70 mt-1">Share a few details and we'll confirm on WhatsApp.</p>
                  </div>
                  <button onClick={close} aria-label="Close" className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-ink hover:bg-brand-50">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  {success ? (
                    <div className="text-center py-6">
                      <span className="w-16 h-16 rounded-full bg-wa text-white flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8" strokeWidth={3} />
                      </span>
                      <h4 className="font-display text-xl font-bold text-ink">Request Received</h4>
                      <p className="text-sm text-body mt-2 max-w-sm mx-auto">
                        Thank you. We've opened WhatsApp so you can send your request — we'll confirm your slot shortly.
                        For anything urgent, call{" "}
                        <a href={CLINIC.phoneTel} className="text-brand-500 font-bold">{CLINIC.phoneDisplay}</a>.
                      </p>
                      <button onClick={close} className="mt-6 px-6 py-3 rounded-xl bg-brand-50 text-ink font-semibold text-sm hover:bg-brand-100">
                        Done
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate className="space-y-4">
                      <Field label="Are you a new or returning patient?" required error={errors.patientType} errorMsg="Please select one">
                        <div className="grid grid-cols-2 gap-3">
                          {([["new", "New Patient"], ["existing", "Existing Patient"]] as const).map(([val, lbl]) => {
                            const active = form.patientType === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => set("patientType", val)}
                                aria-pressed={active}
                                className={`min-h-[48px] px-4 rounded-xl border-2 text-[15px] font-bold transition-all inline-flex items-center justify-center gap-2 ${
                                  active
                                    ? "border-brand-950 bg-brand-950 text-white shadow-md"
                                    : "border-hairline bg-white text-body hover:border-brand-400 hover:text-brand-950"
                                }`}
                              >
                                {active && <Check className="w-4 h-4" strokeWidth={3} />}
                                {lbl}
                              </button>
                            );
                          })}
                        </div>
                      </Field>
                      <Field label="Full Name" required error={errors.name} errorMsg="Please enter your name">
                        <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Gurpreet Singh" className={inputCls(errors.name)} />
                      </Field>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Phone Number" required error={errors.phone} errorMsg="Enter a valid phone number">
                          <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="e.g. 70094 88220" className={inputCls(errors.phone)} />
                        </Field>
                        <Field label="Concern" required error={errors.concern} errorMsg="Choose a concern">
                          <select value={form.concern} onChange={(e) => set("concern", e.target.value)} className={inputCls(errors.concern)}>
                            <option value="">Select</option>
                            {CONCERNS.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </Field>
                        <Field label="Preferred Date">
                          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls(false)} />
                        </Field>
                        <Field label="Preferred Time">
                          <select value={form.time} onChange={(e) => set("time", e.target.value)} className={inputCls(false)}>
                            <option value="">Any time</option>
                            <option>Morning (9:30–12)</option>
                            <option>Afternoon (12–4)</option>
                            <option>Evening (4–7:30)</option>
                          </select>
                        </Field>
                      </div>
                      <label className="flex items-start gap-3 text-sm text-body">
                        <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className={`mt-1 w-[18px] h-[18px] shrink-0 accent-brand-500 ${errors.consent ? "outline outline-2 outline-red-400 rounded" : ""}`} />
                        <span>I agree to be contacted by the clinic regarding my appointment. <span className="text-red-500">*</span></span>
                      </label>
                      <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-950 text-white font-semibold hover:bg-brand-900 transition-colors">
                        <Calendar className="w-4 h-4" /> Request Appointment
                      </button>
                      <p className="text-center text-sm text-body/70">
                        Or call <a href={CLINIC.phoneTel} className="text-brand-500 font-semibold inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{CLINIC.phoneDisplay}</a>
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </AppointmentContext.Provider>
  );
};

const inputCls = (err?: boolean) =>
  `w-full font-sans text-[15px] px-3.5 py-3 rounded-xl border bg-mist text-ink transition-colors focus:outline-none focus:border-brand-500 focus:bg-white ${
    err ? "border-red-400" : "border-hairline"
  }`;

const Field: React.FC<{
  label: string;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  children: React.ReactNode;
}> = ({ label, required, error, errorMsg, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-bold text-ink">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && errorMsg && <span className="text-xs text-red-500 font-semibold">{errorMsg}</span>}
  </div>
);
