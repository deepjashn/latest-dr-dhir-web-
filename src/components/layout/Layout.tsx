import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UtilityBar } from "./UtilityBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileActionBar } from "./MobileActionBar";
import { Chatbot } from "../Chatbot";

// Scrolls to top on every route change.
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

export const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <ScrollToTop />
    <UtilityBar />
    <SiteHeader />
    <main className="flex-1">
      <Outlet />
    </main>
    <SiteFooter />
    <MobileActionBar />
    {/* Floating AI assistant preserved from original build */}
    <Chatbot />
    {/* Spacer so mobile action bar never covers footer content */}
    <div className="sm:hidden h-16" aria-hidden="true" />
  </div>
);
