import React from "react";
import { Link } from "react-router-dom";

// ---- Placeholder image block (labelled, correct aspect ratio) ----
export const Placeholder: React.FC<{
  label: string;
  className?: string;
  gradient?: string;
  tag?: string;
}> = ({ label, className = "", gradient = "linear-gradient(135deg,#E6F2EF,#CFE7E0)", tag }) => (
  <div
    className={`relative grid place-items-center text-center overflow-hidden rounded-2xl text-[13px] font-semibold text-brand-950/50 p-5 ${className}`}
    style={{ background: gradient }}
  >
    <div
      className="absolute inset-0 opacity-[0.22]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.4) 50%, rgba(255,255,255,.4) 75%, transparent 75%)",
        backgroundSize: "18px 18px",
      }}
    />
    <span className="relative z-10 max-w-[80%]" dangerouslySetInnerHTML={{ __html: label }} />
    {tag && (
      <span className="absolute z-20 bottom-3 left-3 bg-brand-950/70 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold">
        {tag}
      </span>
    )}
  </div>
);

// ---- Eyebrow label ----
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-block text-[13px] font-bold tracking-[0.1em] uppercase text-brand-500 ${className}`}>
    {children}
  </span>
);

// ---- Section heading block ----
export const SectionHead: React.FC<{
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  invert?: boolean;
}> = ({ eyebrow, title, intro, center, invert }) => (
  <div className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
    {eyebrow && <Eyebrow className={invert ? "!text-brand-300" : ""}>{eyebrow}</Eyebrow>}
    <h2 className={`font-display font-bold tracking-tight text-[clamp(1.7rem,3.5vw,2.6rem)] mt-3.5 mb-4 text-balance ${invert ? "text-white" : "text-ink"}`}>
      {title}
    </h2>
    {intro && <p className={`text-[17px] leading-relaxed ${invert ? "text-brand-100/80" : "text-body"} ${center ? "mx-auto" : ""}`}>{intro}</p>}
  </div>
);

// ---- Button (link, external, or button) ----
type BtnVariant = "primary" | "outline" | "wa" | "light";
const variants: Record<BtnVariant, string> = {
  primary: "bg-brand-950 text-white hover:bg-brand-900 shadow-md",
  outline: "bg-white text-brand-950 border border-hairline hover:border-brand-500",
  wa: "bg-wa text-white hover:bg-wa-dark shadow-md",
  light: "bg-white text-brand-950 hover:shadow-lg",
};
const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400";

export const Button: React.FC<{
  variant?: BtnVariant;
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  sm?: boolean;
  type?: "button" | "submit";
}> = ({ variant = "primary", to, href, onClick, children, className = "", sm, type = "button" }) => {
  const cls = `${base} ${variants[variant]} ${sm ? "px-4.5 py-2.5 text-[15px]" : "px-6 py-3.5 text-base"} ${className}`;
  if (to) return <Link to={to} onClick={onClick} className={cls}>{children}</Link>;
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={onClick} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
};
