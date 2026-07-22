import React, { useState } from "react";
import { Hero } from "../components/home/Hero";
import { TrustStrip, ConcernCards, FeaturedTreatments } from "../components/home/SectionsTop";
import { MeetDoctor, SmartCheck, Outcomes } from "../components/home/SectionsMid";
import { TechSafety, Walkthrough, Reviews } from "../components/home/SectionsBottom1";
import { AppointmentSteps, FAQ, LocationContact, FinalCTA } from "../components/home/SectionsBottom2";

// Premium teal/navy homepage. Portrait appears ONLY in <MeetDoctor />.
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
      <Outcomes />
      <TechSafety />
      <Walkthrough />
      <Reviews />
      <AppointmentSteps />
      <FAQ />
      <LocationContact />
      <FinalCTA />
    </>
  );
};
