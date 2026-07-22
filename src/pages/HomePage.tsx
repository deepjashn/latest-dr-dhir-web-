import React from "react";
import { Hero } from "../components/home/Hero";
import { TrustStrip, ConcernCards, FeaturedTreatments } from "../components/home/SectionsTop";
import { MeetDoctor, SmartCheck } from "../components/home/SectionsMid";
import { TechSafety } from "../components/home/SectionsBottom1";
import { AppointmentSteps, FAQ, LocationContact, FinalCTA } from "../components/home/SectionsBottom2";

// Premium teal homepage. Portrait appears ONLY in <MeetDoctor />.
// Concern entry lives in <ConcernCards /> (editorial) and the interactive
// <SmartCheck /> assessment — the redundant hero concern-chip panel was removed.
export const HomePage: React.FC = () => (
  <>
    <Hero />
    <TrustStrip />
    <ConcernCards />
    <FeaturedTreatments />
    <MeetDoctor />
    <SmartCheck preset={null} />
    <TechSafety />
    <AppointmentSteps />
    <FAQ />
    <LocationContact />
    <FinalCTA />
  </>
);
