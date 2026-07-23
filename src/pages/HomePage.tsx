import React from "react";
import { Hero } from "../components/home/Hero";
import { TrustStrip, ConcernCards, FeaturedTreatments } from "../components/home/SectionsTop";
import { MeetDoctor } from "../components/home/SectionsMid";
import { WhyChoose } from "../components/home/WhyChoose";
import { TechSafety } from "../components/home/SectionsBottom1";
import { AppointmentSteps, FAQ, LocationContact, FinalCTA } from "../components/home/SectionsBottom2";

// Premium teal homepage. Portrait appears ONLY in <MeetDoctor />.
// The full Smart Dental Check assessment lives on its own page (/smart-dental-check);
// the homepage promotes it via the <WhyChoose /> section CTA.
export const HomePage: React.FC = () => (
  <>
    <Hero />
    <TrustStrip />
    <ConcernCards />
    <FeaturedTreatments />
    <MeetDoctor />
    <WhyChoose />
    <TechSafety />
    <AppointmentSteps />
    <FAQ />
    <LocationContact />
    <FinalCTA />
  </>
);
