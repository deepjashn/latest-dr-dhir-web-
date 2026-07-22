import React, { useState } from "react";
import { Hero } from "../components/home/Hero";
import { TrustStrip, ConcernCards, FeaturedTreatments } from "../components/home/SectionsTop";
import { MeetDoctor, SmartCheck } from "../components/home/SectionsMid";
import { TechSafety } from "../components/home/SectionsBottom1";
import { AppointmentSteps, FAQ, LocationContact, FinalCTA } from "../components/home/SectionsBottom2";

// Premium teal homepage. Portrait appears ONLY in <MeetDoctor />.
// Sections that would show public placeholders (Before/After, Walkthrough gallery,
// Reviews) are intentionally omitted until authentic content is available.
export const HomePage: React.FC = () => {
  // Concern picked in the hero selector jump-starts the Smart Dental Check.
  const [preset, setPreset] = useState<string | null>(null);

  return (
    <>
      <Hero onPickConcern={setPreset} />
      <TrustStrip />
      <ConcernCards />
      <FeaturedTreatments />
      <MeetDoctor />
      <SmartCheck preset={preset} />
      <TechSafety />
      <AppointmentSteps />
      <FAQ />
      <LocationContact />
      <FinalCTA />
    </>
  );
};
