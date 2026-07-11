export interface Service {
  id: string;
  name: string;
  description: string;
  iconName: string;
  details: {
    meaning: string;
    whenNeeded: string;
    procedure: string;
    importance: string;
  };
}

export interface Doctor {
  name: string;
  qualifications: string;
  role: string;
  credentials: string[];
  experienceHighlights: string[];
  aboutText: string;
  missionStatement: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  guidance: string;
  urgency: "Routine Visit" | "Urgent Visit" | "Immediate Emergency Care";
}

export interface CareTipsQuery {
  ageGroup: string;
  concern: string;
  eatingHabits: string;
  brushingRoutine: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "Pending Approval" | "Confirmed" | "Completed";
  createdAt: string;
}

export interface SmileAnalysisResult {
  cleanlinessScore: number;
  appearancePreview: string;
  gumVisibility: string;
  stainAwareness: string;
  alignmentObservation: string;
  recommendation: string;
  disclaimer: string;
}
