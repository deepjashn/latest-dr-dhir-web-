import React from "react";
import { useParams } from "react-router-dom";
import { Hammer } from "lucide-react";
import { Button, Eyebrow } from "../components/ui/Bits";
import { useAppointment } from "../components/layout/AppointmentModal";

// Temporary placeholder for pages being built in the next milestone.
export const StubPage: React.FC<{ title: string; eyebrow?: string }> = ({ title, eyebrow }) => {
  const { slug } = useParams();
  const { open } = useAppointment();
  return (
    <section className="min-h-[60vh] grid place-items-center py-24">
      <div className="max-w-xl mx-auto px-6 text-center">
        <span className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 grid place-items-center mx-auto mb-6"><Hammer className="w-8 h-8" /></span>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="font-display font-bold text-[clamp(1.8rem,4vw,2.6rem)] text-ink mt-3 mb-3">
          {title}{slug ? `: ${slug}` : ""}
        </h1>
        <p className="text-body text-[17px] mb-8">
          This page is part of the full multi-page build. The layout, navigation and design system are live — page content lands in the next milestone.
        </p>
        <Button onClick={() => open("stub")}>Book an Appointment</Button>
      </div>
    </section>
  );
};
