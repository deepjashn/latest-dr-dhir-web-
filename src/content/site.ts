// Central clinic constants + navigation config for the multi-page site.
// Single source of truth for contact details, links, and routes.

export const CLINIC = {
  name: "Dr. Dhir's Dental Care Multispeciality Hospital",
  shortName: "Dr. Dhir's Dental Care",
  doctor: "Dr. Kuldip Dhir, MDS",
  phoneDisplay: "+91 70094 88220",
  phoneRaw: "+917009488220",
  phoneTel: "tel:+917009488220",
  whatsappRaw: "917009488220",
  whatsappBase: "https://wa.me/917009488220",
  instagram: "https://www.instagram.com/drdhirdentalcare/",
  hours: "Mon–Sat: 9:30 AM–2 PM & 4:30–7 PM · Sun: On appointment",
  addressLine: "Dhir Complex, Near Petrol Pump, Faridkot Road",
  city: "Kotkapura",
  state: "Punjab",
  pin: "151 204",
  landmark: "Near Petrol Pump, Faridkot Road",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Dhir+Complex+Near+Petrol+Pump+Faridkot+Road+Kotkapura+Punjab",
  // No-API-key embed (Google Maps "output=embed" mode)
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Dhir%20Complex%20Near%20Petrol%20Pump%20Faridkot%20Road%20Kotkapura%20Punjab%20151204&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

// Prebuilt WhatsApp deep-link with an optional message.
export function waLink(message?: string): string {
  return message
    ? `${CLINIC.whatsappBase}?text=${encodeURIComponent(message)}`
    : CLINIC.whatsappBase;
}

// Primary navigation used by the header + mobile drawer.
export const NAV: { label: string; to: string }[] = [
  { label: "Treatments", to: "/treatments" },
  { label: "Meet the Dentist", to: "/dentist" },
  { label: "Smile Gallery", to: "/gallery" },
  { label: "Patient Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

// Lightweight analytics stub — swap for GA/GTM later.
export function trackEvent(name: string, detail?: string) {
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: name, detail: detail ?? null });
  } catch {
    /* no-op */
  }
}
