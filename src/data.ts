import { Service, Doctor, TrustBadge, Symptom } from "./types";

export const DOCTOR_PROFILE: Doctor = {
  name: "Dr. Kuldip Dhir, MDS",
  qualifications: "MDS — RCT Specialist",
  role: "Senior Dental Specialist & Hospital Director",
  credentials: [
    "Ex Deputy Director, Health Department",
    "Ex Deputy Medical Commissioner",
    "Ex Senior Medical Officer (SMO)",
    "RCT Specialist (MDS)",
    "FDILB 2024 — Recognised Dental Professional, Faridkot District",
    "AIC Medal Ceremony — Recognised Healthcare Excellence"
  ],
  experienceHighlights: [
    "Over 35+ years of clinical and administrative healthcare excellence",
    "Former highest-ranking state medical administrator (Deputy Director)",
    "Kot Kapura’s only fully-digital multispeciality dental hospital",
    "FDILB February 2024 Edition: Recognised in Faridkot District",
    "Leading pioneer in advanced Single-Visit Root Canal Treatments (RCT)",
    "Renowned for ethical practice, gentle care, and patient-first diagnostics"
  ],
  aboutText: "Dr. Dhir’s Dental Care Multispeciality Hospital is Kot Kapura’s fully-digital dental clinic, providing complete dental care and treatments for patients of all ages. Led by Dr. Kuldip Dhir, MDS, our hospital combines extensive clinical experience with modern, digitally supported dentistry.",
  missionStatement: "To provide trusted, ethical and digitally supported dental care for patients of all ages — because every patient deserves a healthy, confident smile."
};

export const TRUST_BADGES: TrustBadge[] = [
  {
    id: "badge-1",
    title: "RCT Specialist",
    subtitle: "MDS Specialization",
    iconName: "Stethoscope",
  },
  {
    id: "badge-2",
    title: "MDS Qualified",
    subtitle: "Highest Dental Credentials",
    iconName: "Award",
  },
  {
    id: "badge-3",
    title: "35+ Years Excellence",
    subtitle: "Senior Specialist Since 1990s",
    iconName: "CalendarRange",
  },
  {
    id: "badge-4",
    title: "Fully Digital Clinic",
    subtitle: "Advanced Digital Dentistry",
    iconName: "Activity",
  },
  {
    id: "badge-5",
    title: "FDILB 2024",
    subtitle: "Recognised · Faridkot",
    iconName: "ShieldCheck",
  }
];

export const SERVICES: Service[] = [
  {
    id: "implants",
    name: "Dental Implants",
    description: "Natural-looking tooth replacement using titanium implants fused to the jawbone — a stable, long-term option for missing teeth.",
    iconName: "Zap",
    details: {
      meaning: "A dental implant is a small titanium screw surgically placed into the jawbone to act as an artificial tooth root. A custom crown is then fixed on top, creating a permanent, fully functional replacement tooth.",
      whenNeeded: "When one or more teeth are missing due to decay, trauma, or extraction, and you want a permanent, stable solution that looks and functions exactly like a natural tooth.",
      procedure: "Dr. Dhir evaluates jawbone density with digital X-rays. The titanium implant is placed under local anaesthesia. After osseointegration (3–4 months), a precision-milled Zirconia crown is permanently fixed on the implant.",
      importance: "Implants help prevent bone loss, maintain facial structure, and restore chewing ability — and can last many years with proper care, unlike dentures or bridges."
    }
  },
  {
    id: "rct",
    name: "Root Canal Treatment (RCT)",
    description: "Comfort-focused treatment to save decayed or infected teeth, performed by our resident MDS specialist — often in one or more visits depending on the case.",
    iconName: "FlameKindling", // Custom representative icon
    details: {
      meaning: "A root canal treatment (RCT) is a dental procedure designed to remove infection from the center of a tooth (the root canal system), clean it thoroughly, and then seal it to prevent future bacterial invasion.",
      whenNeeded: "Needed when the inner pulp of your tooth becomes inflamed or infected due to deep decay, repeated dental procedures, cracks, or trauma. Symptoms include persistent pain, hot/cold sensitivity, swelling, or tenderness.",
      procedure: "Dr. Dhir performs advanced, microscopic single-visit RCTs. The infected pulp is gently removed, the root canals are sanitized using state-of-the-art rotary endodontic tools, and they are sealed with premium bio-compatible material.",
      importance: "An RCT saves your natural tooth, avoids the need for complete extraction, preserves chewing function, and prevents the infection from spreading into the jawbone."
    }
  },
  {
    id: "checkup",
    name: "Comprehensive Dental Checkup",
    description: "Thorough visual diagnostic examinations, screening, and digital imaging to identify issues before they progress.",
    iconName: "ClipboardCheck",
    details: {
      meaning: "A regular comprehensive checkup is a preventive assessment of your teeth, gums, tongue, bite, and overall oral soft tissues using digital visual aids.",
      whenNeeded: "Recommended once every 6 months for adults and children to monitor dental wellness, or immediately if you experience minor aches, discomfort, or clicking jaws.",
      procedure: "We conduct a meticulous visual audit, check for early cavities with tactile explorers, assess gum depth, and perform low-radiation digital radiography if deeper dental roots need inspection.",
      importance: "Identifies silent dental decay, gum problems, or oral lesions early, saving you from expensive, complex corrective treatments later."
    }
  },
  {
    id: "cleaning",
    name: "Teeth Cleaning & Polishing",
    description: "Ultrasonic scaling and polishing to remove plaque, calculus (tartar), and food stains, leaving teeth exceptionally fresh.",
    iconName: "Sparkles",
    details: {
      meaning: "Professional dental scaling (cleaning) is the safe mechanical removal of hard tartar deposits and soft bacterial plaque, followed by abrasive cup-polishing to smooth the enamel surfaces.",
      whenNeeded: "Crucial twice a year to reverse early gingivitis, remove tea/coffee/tobacco staining, and eliminate bad breath (halitosis).",
      procedure: "Using gentle ultrasonic micro-vibrations, we wash away hard calcium build-ups from behind and between teeth. A gentle polishing paste is then applied for a smooth, clean finish.",
      importance: "Prevents gum recession, bleeding, and bone loss. Professional scaling is a cornerstone of systemic wellness, linked to cardiovascular and diabetic health."
    }
  },
  {
    id: "extraction",
    name: "Tooth Extraction",
    description: "Surgical and simple extraction of severely damaged teeth or impacted wisdom teeth, carried out with utmost care.",
    iconName: "Scissors",
    details: {
      meaning: "The gentle, comfort-focused removal of a tooth from its socket in the bone, done under local anaesthesia.",
      whenNeeded: "Indicated for deep irreparable decay, severe trauma fracture, loose teeth from advanced gum disease, or wisdom teeth that are impacted and causing painful swelling.",
      procedure: "We apply deep local numbing. Using precision instruments, the tooth is atraumatically released. We place sterile collagen packs and provide exhaustive, warm post-care guidance.",
      importance: "Relieves chronic localized pain, stops systemic spread of dental abscesses, and prepares the space for custom bridges or dental implants."
    }
  },
  {
    id: "filling",
    name: "Dental Fillings & Restorations",
    description: "Premium, tooth-colored composite and glass ionomer restorations to rebuild decayed teeth seamlessly.",
    iconName: "Hammer",
    details: {
      meaning: "Dental restoration where decayed tooth matter is excavated and replaced with cosmetic, medical-grade materials that mimic natural tooth anatomy.",
      whenNeeded: "When cavities are detected early, or when existing older fillings crack, wear down, or leak.",
      procedure: "The decay is precisely cleaned. The cavity is shaped, conditioned, and filled with state-of-the-art light-cured composite resin matched to your exact tooth shade, then cured and sculpted.",
      importance: "Restores the structural integrity of the tooth, stops decay from reaching the pulp, and delivers natural aesthetics."
    }
  },
  {
    id: "crowns",
    name: "Dental Crowns & Bridges",
    description: "High-strength crowns (caps) and multi-unit bridges to restore fractured teeth, replace missing teeth, and correct bite alignment.",
    iconName: "Layers",
    details: {
      meaning: "A crown is a custom-fit 'cap' that fully covers a damaged tooth, while a bridge is a fixed series of crowns used to anchor and replace one or more missing teeth.",
      whenNeeded: "Recommended after root canal treatments, to cover large fillings, to restore cracked teeth, or to securely bridge gaps from missing teeth.",
      procedure: "The anchor teeth are gently reshaped. We take a high-precision digital or physical impression. A custom laboratory-crafted Zirconia or Ceramic restoration is then permanently bonded.",
      importance: "Prevents adjacent teeth from shifting, restores speech clarity, rebuilds your original chewing efficiency, and ensures facial muscle support."
    }
  },
  {
    id: "smile",
    name: "Smile Designing (Veneers)",
    description: "Aesthetic smile makeovers combining porcelain veneers, cosmetic bonding, and contouring for a balanced, natural-looking smile.",
    iconName: "Heart",
    details: {
      meaning: "A comprehensive aesthetic dental plan using custom porcelain veneers, laminates, or cosmetic bonding to correct tooth shapes, sizes, and spacing.",
      whenNeeded: "For chipped teeth, large gaps, dark permanent tetracycline stains, or minor crowding that ruins your confidence.",
      procedure: "We evaluate your smile balance and facial proportions. Extremely thin, custom porcelain shells (veneers) are bonded to the front of teeth, instantly transforming shade and alignment.",
      importance: "Provides a long-lasting, highly stain-resistant, natural-looking aesthetic boost that transforms self-esteem and social confidence."
    }
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    description: "Professionally supervised chairside and home whitening to reduce staining and improve your tooth shade safely.",
    iconName: "Sun",
    details: {
      meaning: "A cosmetic bleaching process using active hydrogen peroxide gels activated by specialized dental lights to break down deep organic stains in the enamel.",
      whenNeeded: "Before major life events like weddings or interviews, or to reverse yellowing caused by food dyes, age, tea, coffee, or smoking.",
      procedure: "Gums are protected with a rubber barrier. The whitening gel is carefully applied and activated in 15-minute cycles using an advanced medical dental light, achieving up to 6 shades of brightness.",
      importance: "Safe, rapid, and non-invasive cosmetic enhancement that delivers instant results under professional supervision without damaging enamel."
    }
  },
  {
    id: "gumcare",
    name: "Gum Care & Periodontics",
    description: "Deep scaling, root planing, and therapeutic care to manage bleeding gums and gum disease, and reduce further progression.",
    iconName: "TrendingUp",
    details: {
      meaning: "Therapeutic clinical procedures focusing on restoring health to the supporting structures of the teeth, primarily the gums and alveolar bone.",
      whenNeeded: "For swollen, tender, or bleeding gums, bad breath, loose teeth, or when teeth appear to be 'growing longer' due to gum recession.",
      procedure: "We perform deep scaling and root planing (cleaning beneath the gumline) under local anesthesia, sanitizing periodontal pockets and smoothing roots so gums can reattach.",
      importance: "Stops advanced pyorrhea and gum recession, prevents premature loose teeth, and eliminates the root cause of persistent chronic halitosis."
    }
  },
  {
    id: "dentures",
    name: "Complete & Partial Dentures",
    description: "Premium removable prosthetic solutions (flexible, cast metal, and acrylic) to restore full chewing ability.",
    iconName: "Smile",
    details: {
      meaning: "Removable artificial replacements for missing teeth and surrounding gum tissues, custom-fabricated to fit your unique jaw bone structure.",
      whenNeeded: "When a patient has lost multiple teeth (partial) or all teeth in an arch (complete), causing collapsed cheeks and chewing difficulty.",
      procedure: "A series of precise tissue-molded impressions are taken over multiple visits. We design balanced occlusion dentures using premium, impact-resistant flexible or anatomical acrylic teeth.",
      importance: "Restores facial fullness and youthful appearance, enables intake of solid nutritious food, and enhances speech clarity."
    }
  },
  {
    id: "pediatric",
    name: "Pediatric Dental Care",
    description: "Gentle, stress-free treatments designed specifically for children, including dental sealants and fluoride therapies.",
    iconName: "Baby",
    details: {
      meaning: "Specialized preventive and therapeutic dental procedures created for children, focused on primary teeth (milk teeth) development and comfort.",
      whenNeeded: "Children should have their first visit by age 1. Recommended for regular decay protection, dental sealants, habit-breaking appliances, or cavities.",
      procedure: "Using positive pediatric reinforcement, we treat decay gently, apply protective clear fissure sealants over deep grooves, and deliver topical fluoride to strengthen enamel.",
      importance: "Establishes a lifetime of positive dental attitudes, protects primary teeth which guide permanent teeth eruption, and intercepts early misalignment."
    }
  },
  {
    id: "emergency",
    name: "Emergency Dental Care",
    description: "Rapid relief from acute toothaches, swelling, dental trauma, knocked-out teeth, or fractured restorations.",
    iconName: "HeartPulse",
    details: {
      meaning: "Immediate dental attention dedicated to resolving severe pain, controlling bleeding, or managing traumatic physical injuries to the oral cavity.",
      whenNeeded: "During dental trauma (knocked-out tooth), severe face/jaw swelling, throbbing pain that keeps you awake, or heavy gum bleeding.",
      procedure: "We prioritize emergency walk-ins. We diagnose via rapid X-ray, administer fast local pain relief, perform emergency pulpotomy/drainage, or stabilize fractured teeth on the spot.",
      importance: "Relieves unbearable pain immediately, halts life-threatening bacterial infections, and increases the chance of saving a knocked-out tooth (if treated within 1 hour)."
    }
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Senior Experienced Specialist",
    description: "Led by Dr. Kuldip Dhir, MDS with over 35 years of clinical mastery, former state health official (Ex Deputy Director & Ex SMO).",
    icon: "Award"
  },
  {
    title: "Advanced Dental Treatments",
    description: "State-of-the-art endodontics, high-precision Zirconia prosthetics, and digital radiography for painless, fast treatments.",
    icon: "Cpu"
  },
  {
    title: "Hygienic & Safe Environment",
    description: "We follow international sterilization protocols. Autoclaved tools, disposable single-use items, and deep chemical air sanitization.",
    icon: "ShieldAlert"
  },
  {
    title: "Personalized Treatment Plans",
    description: "No rush. We listen to your concerns, explain diagnoses transparently using oral cameras, and design customized treatment plans.",
    icon: "Users"
  },
  {
    title: "Comfortable Patient Experience",
    description: "Anxiety-free dental setup. Ergonometric dental chairs, soothing music, extremely gentle hand techniques, and painless anesthesia.",
    icon: "Heart"
  },
  {
    title: "Trusted Care in Kot Kapura",
    description: "Over thousands of smiles restored across Punjab. The highest trusted name in Kot Kapura, Faridkot, and neighbouring areas.",
    icon: "MapPin"
  },
  {
    title: "Ethical & Fair Consultation",
    description: "We advise only what you genuinely need. No hidden fees, no over-treatment, and complete pricing transparency from day one.",
    icon: "Scale"
  },
  {
    title: "Patient-Focused Approach",
    description: "Generous follow-ups, direct access to the doctor for emergencies, and comprehensive dental care tracking.",
    icon: "Activity"
  }
];

export const SYMPTOMS: Symptom[] = [
  {
    id: "tooth-pain",
    name: "Tooth pain / Pulsating ache",
    severity: "severe",
    guidance: "A pulsating, deep ache often indicates that decay has reached the pulp inside your tooth root. Try rinsing with lukewarm saltwater, avoid chewing on that side, and avoid applying heat. This requires professional root canal treatment or a specialized filling.",
    urgency: "Urgent Visit"
  },
  {
    id: "sensitivity",
    name: "Sharp hot or cold sensitivity",
    severity: "mild",
    guidance: "Sharp twinges from cold/hot liquids often stem from enamel erosion, early cavities, or slight gum recession. Try using a soft-bristled brush with a desensitizing potassium-nitrate toothpaste. If sensitivity lasts more than 5 seconds, let Dr. Dhir examine it.",
    urgency: "Routine Visit"
  },
  {
    id: "swelling",
    name: "Swelling in gums or cheek",
    severity: "severe",
    guidance: "Swelling is a serious sign of an active dental abscess or infection in the bone. Apply a cold compress externally, do NOT prick the swelling, and do NOT delay. Swelling requires immediate clinical drainage and prescription antibiotics/treatment.",
    urgency: "Immediate Emergency Care"
  },
  {
    id: "bleeding-gums",
    name: "Bleeding gums during brushing",
    severity: "moderate",
    guidance: "Bleeding is a classic indicator of Gingivitis caused by hard tartar build-up. Brush gently twice a day with an ultra-soft brush, floss daily, and schedule an ultrasonic scaling (cleaning) and polishing to reverse the gum irritation.",
    urgency: "Routine Visit"
  },
  {
    id: "bad-breath",
    name: "Chronic bad breath (Halitosis)",
    severity: "mild",
    guidance: "Persistent bad breath is usually caused by plaque accumulation, hidden tooth decay, or bacteria on the back of the tongue. Maintain pristine tongue scraping, drink plenty of water, and get a professional oral prophylaxis/scaling.",
    urgency: "Routine Visit"
  },
  {
    id: "broken-tooth",
    name: "Broken, chipped, or cracked tooth",
    severity: "moderate",
    guidance: "A cracked tooth is vulnerable to deep decay and nerve injury. Save any broken fragments, rinse your mouth with water, and get it restored immediately with a tooth-colored composite filling or a protective Zirconia crown.",
    urgency: "Urgent Visit"
  },
  {
    id: "jaw-pain",
    name: "Jaw pain or joint clicking",
    severity: "moderate",
    guidance: "Pain around the ear or joint clicking usually indicates TMJ strain, grinding teeth at night (Bruxism), or stress. Dr. Dhir can design a custom-molded nightguard to cushion your teeth and alleviate joint pressure.",
    urgency: "Routine Visit"
  },
  {
    id: "pain-chewing",
    name: "Pain while chewing food",
    severity: "severe",
    guidance: "Sharp pain upon biting down could point to a micro-fracture inside the tooth root or localized ligament inflammation. Restrict your diet to soft foods and soups, and have Dr. Dhir perform a precise diagnostic bite test.",
    urgency: "Urgent Visit"
  }
];
