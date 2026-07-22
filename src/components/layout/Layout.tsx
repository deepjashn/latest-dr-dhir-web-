import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UtilityBar } from "./UtilityBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileActionBar } from "./MobileActionBar";
import { Chatbot } from "../Chatbot";

// Scrolls to top on route change, or to the hash target when present.
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a tick for the target section to render, then scroll to it
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
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
