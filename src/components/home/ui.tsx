import React from "react";
import { Link } from "react-router-dom";

// Shared entrance animation. Translate-only (never opacity:0) so content is
// ALWAYS visible by default — animation enhances, it never controls visibility.
export const fadeUp = {
  initial: { y: 18 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export const Eyebrow: React.FC<{ children: React.ReactNode; invert?: boolean; className?: string }> = ({ children, invert, className = "" }) => (
  <span className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.12em] uppercase ${invert ? "text-turq-300" : "text-turq-600"} ${className}`}>
    <span className={`w-6 h-px ${invert ? "bg-turq-300" : "bg-turq-500"}`} />
    {children}
  </span>
);

export const SectionHead: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  invert?: boolean;
}> = ({ eyebrow, title, intro, center, invert }) => (
  <div className={`${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} mb-12 lg:mb-14`}>
    {eyebrow && <Eyebrow invert={invert}>{eyebrow}</Eyebrow>}
    <h2 className={`font-display font-extrabold tracking-tight text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] mt-4 mb-4 text-balance ${invert ? "text-white" : "text-teal-deep"}`}>
      {title}
    </h2>
    {intro && <p className={`text-[17px] lg:text-[18px] leading-relaxed ${invert ? "text-turq-50/75" : "text-muted2"}`}>{intro}</p>}
  </div>
);

// Teal-system button. Variants tuned for the premium palette.
type V = "primary" | "ghost" | "wa" | "light" | "outline-light";
const styles: Record<V, string> = {
  primary: "bg-turq-500 text-white hover:bg-turq-600 shadow-[0_10px_30px_-8px_rgba(18,184,176,0.6)]",
  ghost: "bg-white text-teal-deep border border-neutral-soft hover:border-turq-500",
  wa: "bg-wa text-white hover:bg-wa-dark shadow-[0_10px_30px_-10px_rgba(31,175,98,0.6)]",
  light: "bg-white text-teal-deep hover:shadow-xl",
  "outline-light": "border border-white/30 text-white hover:bg-white/10",
};
const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl min-h-[52px] px-6 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turq-400";

export const TButton: React.FC<{
  variant?: V;
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}> = ({ variant = "primary", to, href, onClick, children, className = "", type = "button" }) => {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (to) return <Link to={to} onClick={onClick} className={cls}>{children}</Link>;
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={onClick} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
};

// Small WhatsApp glyph reused across the homepage.
export const WaGlyph: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
  </svg>
);
