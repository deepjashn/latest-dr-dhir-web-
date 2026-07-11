import React from "react";
import * as Icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = "w-6 h-6" }) => {
  // Safe mapping of our custom iconName descriptors to official Lucide component names
  const iconMapping: { [key: string]: keyof typeof Icons } = {
    // Services
    FlameKindling: "Flame", // Flame for RCT (Root Canal)
    ClipboardCheck: "ClipboardCheck", // Checkup
    Sparkles: "Sparkles", // Cleaning & Polishing
    Scissors: "Scissors", // Extraction
    Hammer: "Hammer", // Fillings
    Layers: "Layers", // Crowns & Bridges
    Heart: "Heart", // Smile Designing
    Sun: "Sun", // Whitening
    TrendingUp: "TrendingUp", // Gum Care
    Smile: "Smile", // Dentures
    Baby: "Baby", // Pediatric
    HeartPulse: "HeartPulse", // Emergency

    // Badges / Why Choose Us
    Stethoscope: "Stethoscope",
    Award: "Award",
    CalendarRange: "CalendarRange",
    Activity: "Activity",
    ShieldCheck: "ShieldCheck",
    Cpu: "Cpu",
    ShieldAlert: "ShieldAlert",
    Users: "Users",
    MapPin: "MapPin",
    Scale: "Scale",
    
    // Core UI
    Phone: "Phone",
    Clock: "Clock",
    User: "User",
    Check: "Check",
    Send: "Send",
    Upload: "Upload",
    AlertTriangle: "AlertTriangle",
    Lock: "Lock",
    FileText: "FileText",
    Camera: "Camera"
  };

  const officialName = iconMapping[name] || "Activity";
  const IconComponent = Icons[officialName] as React.ComponentType<{ className?: string }>;

  if (!IconComponent) {
    return <Icons.Activity className={className} />;
  }

  return <IconComponent className={className} />;
};
