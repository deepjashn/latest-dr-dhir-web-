// Central image map. Stock dental imagery used as tasteful, illustrative
// placeholders until the clinic supplies its own photographs.
import drDhirPatient from "../assets/images/dr-dhir-patient.jpg";
import patientCare from "../assets/images/stock/patient-care.jpg";
import clinicalPlanning from "../assets/images/stock/clinical-planning.jpg";
import operatory from "../assets/images/stock/operatory.jpg";
import dentalModels from "../assets/images/stock/dental-models.jpg";
import endodontics from "../assets/images/stock/endodontics.jpg";
import dentalExam from "../assets/images/stock/dental-exam.jpg";
import teethCleaning from "../assets/images/stock/teeth-cleaning.jpg";
import dentalTreatment from "../assets/images/stock/dental-treatment.jpg";
import smileAligner from "../assets/images/stock/smile-aligner.jpg";
import whitening from "../assets/images/stock/whitening.jpg";
import pediatric from "../assets/images/stock/pediatric.jpg";

export const IMG = {
  drDhirPatient,
  patientCare,
  clinicalPlanning,
  operatory,
  dentalModels,
  endodontics,
  dentalExam,
  teethCleaning,
  dentalTreatment,
  smileAligner,
  whitening,
  pediatric,
};

// Maps a service id (from data.ts) to a representative image.
export const TREATMENT_IMG: Record<string, string> = {
  implants: dentalModels,
  rct: endodontics,
  checkup: dentalExam,
  cleaning: teethCleaning,
  extraction: dentalTreatment,
  filling: teethCleaning,
  crowns: dentalModels,
  smile: smileAligner,
  whitening: whitening,
  gumcare: dentalExam,
  dentures: dentalModels,
  pediatric: pediatric,
  emergency: dentalTreatment,
};

export const treatmentImage = (id: string): string => TREATMENT_IMG[id] ?? clinicalPlanning;
