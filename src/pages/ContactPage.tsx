import React, { useState } from "react";
import { MapPin, Clock, Phone, Navigation, Check, Send } from "lucide-react";
import { Eyebrow, Button } from "../components/ui/Bits";
import { CLINIC, waLink, trackEvent } from "../content/site";
import { useAppointment } from "../components/layout/AppointmentModal";
import clinicExterior from "../assets/images/clinic-exterior.jpg";

export const ContactPage: React.FC = () => {
  const { open } = useAppointment();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; message?: boolean }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!form.name.trim()) err.name = true;
    if (form.phone.replace(/\D/g, "").length < 7) err.phone = true;
    if (!form.message.trim()) err.message = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    const msg = `Hello ${CLINIC.shortName},\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;
    trackEvent("form_submit_success", "contact_page");
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  };

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };
  const inputCls = (e?: boolean) =>
    `w-full font-sans text-[15px] px-3.5 py-3 rounded-xl border bg-mist text-ink focus:outline-none focus:border-brand-500 focus:bg-white ${e ? "border-red-400" : "border-hairline"}`;

  return (
    <>
      <section className="bg-mist border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <Eyebrow>Visit Us</Eyebrow>
          <h1 className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3rem)] text-ink mt-3.5 mb-4 text-balance">Find Us in Kotkapura</h1>
          <p className="text-[17px] text-body max-w-2xl">We're on Faridkot Road, near the petrol pump — easy to reach from across Kotkapura and Faridkot. Call, WhatsApp, or send us a message below.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          {/* Info + form */}
          <div>
            <div className="space-y-1 mb-8">
              <InfoRow icon={MapPin} title="Clinic Address">
                {CLINIC.addressLine}, {CLINIC.city}, {CLINIC.state} – {CLINIC.pin}
              </InfoRow>
              <InfoRow icon={Clock} title="Clinic Hours">{CLINIC.hours}</InfoRow>
              <InfoRow icon={Phone} title="Phone & WhatsApp">
                <a href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "contact")} className="text-brand-500 font-semibold">{CLINIC.phoneDisplay}</a>
              </InfoRow>
              <InfoRow icon={Navigation} title="Landmark">{CLINIC.landmark}</InfoRow>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button variant="outline" sm href={CLINIC.mapsUrl} onClick={() => trackEvent("directions_click", "contact")}><MapPin className="w-4 h-4" /> Get Directions</Button>
              <Button variant="outline" sm href={CLINIC.phoneTel} onClick={() => trackEvent("phone_click", "contact")}><Phone className="w-4 h-4" /> Call Clinic</Button>
              <Button sm onClick={() => open("contact_page")}>Book Appointment</Button>
            </div>

            {/* Enquiry form */}
            <div className="bg-white border border-hairline rounded-2xl p-6 sm:p-7">
              <h2 className="font-display font-bold text-xl text-ink mb-1">Send Us a Message</h2>
              <p className="text-sm text-body/70 mb-5">We'll reply on WhatsApp to coordinate your visit.</p>
              {sent ? (
                <div className="text-center py-8">
                  <span className="w-14 h-14 rounded-full bg-wa text-white grid place-items-center mx-auto mb-4"><Check className="w-7 h-7" strokeWidth={3} /></span>
                  <h3 className="font-display font-bold text-lg text-ink">Message Sent</h3>
                  <p className="text-sm text-body mt-2">We've opened WhatsApp so you can send your message. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-ink">Full Name <span className="text-red-500">*</span></label>
                      <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Gurpreet Singh" className={inputCls(errors.name)} />
                      {errors.name && <span className="text-xs text-red-500 font-semibold">Please enter your name</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-ink">Phone <span className="text-red-500">*</span></label>
                      <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="e.g. 70094 88220" className={inputCls(errors.phone)} />
                      {errors.phone && <span className="text-xs text-red-500 font-semibold">Enter a valid phone number</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-ink">Message or Treatment Query <span className="text-red-500">*</span></label>
                    <textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Briefly tell us what you're looking for" className={`${inputCls(errors.message)} resize-none`} />
                    {errors.message && <span className="text-xs text-red-500 font-semibold">Please enter a message</span>}
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-950 text-white font-semibold hover:bg-brand-900 transition-colors">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Clinic photo + map */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden shadow-sm mb-4">
              <img src={clinicExterior} alt="Dr. Dhir's Dental Care Multispeciality Hospital building, Dhir Complex, Faridkot Road, Kotkapura" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-hairline">
              <iframe
                title="Map to Dr. Dhir's Dental Care Multispeciality Hospital, Kotkapura"
                src={CLINIC.mapEmbedUrl}
                className="w-full aspect-[16/10] block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("directions_click", "contact_map")} className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-950 text-white font-semibold hover:bg-brand-900 transition-colors">
              <Navigation className="w-4 h-4" /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

const InfoRow: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 py-4 border-b border-hairline last:border-0">
    <span className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 grid place-items-center shrink-0"><Icon className="w-5 h-5" /></span>
    <div>
      <b className="block text-ink text-[15px] mb-0.5">{title}</b>
      <span className="text-sm text-body">{children}</span>
    </div>
  </div>
);
