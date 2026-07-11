import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Upload, Sparkles, AlertTriangle, Check, BookOpen, 
  HelpCircle, Calendar, CalendarRange, Clock, User, Phone, 
  ChevronRight, ArrowRight, Clipboard, Eye, RefreshCw, Printer, ArrowUpRight
} from "lucide-react";
import { SYMPTOMS, SERVICES } from "../data";
import { SmileAnalysisResult, Service } from "../types";

interface AIDentalAssistantProps {
  onNavigate: (sectionId: string) => void;
  onAppointmentBooked: (apt: any) => void;
}

export const AIDentalAssistant: React.FC<AIDentalAssistantProps> = ({ onNavigate, onAppointmentBooked }) => {
  const [activeTab, setActiveTab] = useState<"smile" | "symptoms" | "appointment" | "explainer" | "tips">("smile");

  // --- Feature A: AI Smile Preview State ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SmileAnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Preloaded demo smile templates for easy testing
  const demoSmiles = [
    {
      id: "demo-white",
      name: "Demo: Aesthetic Pearl Smile",
      url: "https://images.unsplash.com/photo-1595447132219-b2f1c499eac2?w=400&auto=format&fit=crop&q=60",
      description: "A clean, bright aesthetic arch"
    },
    {
      id: "demo-stain",
      name: "Demo: Surface Shading Arch",
      url: "https://images.unsplash.com/photo-1513415277900-a62401e50841?w=400&auto=format&fit=crop&q=60",
      description: "Moderate organic surface tea/coffee stains"
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setAnalysisResult(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const runSmileAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-smile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedImage }),
      });
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error("Error analyzing smile:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetSmileAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  // --- Feature B: Symptom Checker State ---
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomOutput, setSymptomOutput] = useState<{
    severity: string;
    guidance: string;
    urgency: string;
  } | null>(null);

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const evaluateSymptoms = () => {
    if (selectedSymptoms.length === 0) return;

    const matched = SYMPTOMS.filter((s) => selectedSymptoms.includes(s.id));
    
    let worstUrgency = "Routine Visit";
    let combinedGuidance = "";

    matched.forEach((m) => {
      if (m.urgency === "Immediate Emergency Care") {
        worstUrgency = "Immediate Emergency Care";
      } else if (m.urgency === "Urgent Visit" && worstUrgency !== "Immediate Emergency Care") {
        worstUrgency = "Urgent Visit";
      }
      combinedGuidance += `• **${m.name}**: ${m.guidance}\n\n`;
    });

    setSymptomOutput({
      severity: worstUrgency === "Immediate Emergency Care" ? "High Priority" : worstUrgency === "Urgent Visit" ? "Moderate Severity" : "Preventive Wellness",
      guidance: combinedGuidance,
      urgency: worstUrgency
    });
  };

  const resetSymptoms = () => {
    setSelectedSymptoms([]);
    setSymptomOutput(null);
  };

  // --- Feature C: Appointment Request State ---
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    service: SERVICES[0].name,
    date: "",
    time: "10:00 AM",
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });
      const data = await response.json();
      if (data.success) {
        setBookingResult(data.appointment);
        onAppointmentBooked(data.appointment);
      }
    } catch (err) {
      console.error("Booking failed:", err);
    } finally {
      setIsBooking(false);
    }
  };

  const resetBooking = () => {
    setBookingForm({
      name: "",
      phone: "",
      service: SERVICES[0].name,
      date: "",
      time: "10:00 AM",
    });
    setBookingResult(null);
  };

  // --- Feature D: Treatment Explainer State ---
  const [explainerService, setExplainerService] = useState<Service>(SERVICES[0]);

  // --- Feature E: Custom Tips State ---
  const [tipsQuery, setTipsQuery] = useState({
    ageGroup: "Adults (18-60)",
    concern: "Cavity Prevention",
    eatingHabit: "High tea/coffee intake",
    brushingRoutine: "Once a day",
  });
  const [generatedTips, setGeneratedTips] = useState<string[] | null>(null);

  const handleGenerateTips = () => {
    const tips: string[] = [];
    
    if (tipsQuery.ageGroup.includes("Kids")) {
      tips.push("Establish structural brushing: Brush with light pressure under parent supervision, utilizing a pea-sized amount of low-fluoride paste.");
      tips.push("Monitor molar fissures: Introduce early sealant therapy to protect deep grooves from sticky candies.");
    } else if (tipsQuery.ageGroup.includes("Seniors")) {
      tips.push("Focus on hydration: Older adults often face dry mouth (xerostomia) from medical prescriptions, which accelerates cavity decay. Drink plenty of water.");
      tips.push("Clean prosthetic appliances: Soak dentures nightly in medical antiseptic and clean the gums with a super soft flannel gauze.");
    } else {
      tips.push("Maintain standard interdental cleansing: Plaque hiding between tooth arches accounts for 80% of adult cavities. Floss daily before bed.");
    }

    if (tipsQuery.concern === "Gum bleeding") {
      tips.push("Reverse early gingivitis: Gently massage gums with a soft toothbrush in circular motions and introduce a chlorhexidine-based mouthwash for 1 week.");
      tips.push("Schedule Scaling: Plaque has hardened into dental tartar, which cannot be brushed away. An ultrasonic clean by Dr. Dhir is required.");
    } else if (tipsQuery.concern === "Sensitivity") {
      tips.push("Guard your enamel: Avoid highly acidic beverages like lemon waters or sodas which temporarily soften tooth structure. Switch to a desensitizing potassium-nitrate formula.");
      tips.push("Check for teeth grinding (Bruxism): Chronic jaw stiffness and sensitivity is often linked to grinding. Ask Dr. Dhir about TMJ nightguard stabilization.");
    } else if (tipsQuery.concern === "Stains") {
      tips.push("Follow the 'White Rule': Rinse your mouth with warm water immediately after consuming dark beverages, coffee, tea, or turmeric-heavy curries.");
    } else {
      tips.push("Optimize cavity shields: Use standard fluoride toothpastes to remineralize microscopic pre-cavity enamel lesions.");
    }

    if (tipsQuery.eatingHabit.includes("frequent sugar")) {
      tips.push("Neutralize sugar shocks: Rinse vigorously with plain water immediately after sugary snacks to disrupt bacterial acid production.");
    } else if (tipsQuery.eatingHabit.includes("High tea/coffee")) {
      tips.push("Counter acids: Sip dark drinks through a straw when possible, and wait 30 minutes before brushing to allow soft enamel to re-harden.");
    }

    if (tipsQuery.brushingRoutine === "Once a day") {
      tips.push("Critical adjustment: Upgrade to twice-a-day brushing. Going to sleep with accumulated food debris leads to rapid overnight decay because saliva flow drops during sleep.");
    } else if (tipsQuery.brushingRoutine === "Twice a day") {
      tips.push("Excellent routine! Ensure you brush for a full 2 minutes, using light circular strokes, sweeping away from the gums.");
    }

    tips.push("Twice-yearly clinic visual checkup: Visit Dr. Dhir’s Dental Care Multispeciality in Kot Kapura for advanced diagnostic monitoring.");

    setGeneratedTips(tips);
  };

  const menuTabs = [
    { id: "smile", label: "AI Dental Scan" },
    { id: "symptoms", label: "Symptom Checker" },
    { id: "appointment", label: "Smart Scheduler" },
    { id: "explainer", label: "Treatment Guide" },
    { id: "tips", label: "Personalized Routine" },
  ];

  return (
    <section id="technology-suite" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="text-left max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-powder-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Patient Suite</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl oversized-heading font-medium tracking-tight text-powder-950 leading-none">
          Understand Your Smile Better
        </h2>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans max-w-2xl">
          Upload or capture a clear photograph of your teeth to receive a preliminary AI-assisted visual screening, or explore symptom diagnostics instantly.
        </p>
      </div>

      {/* Modern Compact Floating Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 bg-powder-50/80 p-2 border border-powder-100 rounded-2xl max-w-4xl">
        {menuTabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                isSelected ? "text-white" : "text-gray-500 hover:text-powder-950"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeSuiteTab"
                  className="absolute inset-0 bg-powder-950 rounded-xl -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Board Container */}
      <div className="bg-white border border-powder-100 rounded-[2rem] p-6 sm:p-10 shadow-premium min-h-[480px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: AI SMILE PREVIEW / SCAN */}
          {activeTab === "smile" && (
            <motion.div
              key="smile-scan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-powder-600 block">Feature Alpha</span>
                <h3 className="font-display font-semibold text-xl text-powder-950 leading-tight">
                  Visual AI Screen & Aesthetics Indicator
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl font-sans">
                  Upload a photo or choose a demo teeth model. Our visual assistant provides a helpful shade check and clinical guidelines before your visit.
                </p>
              </div>

              {!analysisResult ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* File drop zone */}
                  <div className="lg:col-span-7">
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 transition-all text-center min-h-[240px] ${
                        dragActive 
                          ? "border-powder-500 bg-powder-50" 
                          : "border-powder-200 bg-powder-50/40 hover:bg-powder-50/80"
                      }`}
                    >
                      {selectedImage ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-powder-100">
                          <img 
                            src={selectedImage} 
                            alt="Selected tooth arch" 
                            className="w-full h-full object-contain"
                          />
                          <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-white text-powder-950 border border-powder-100 rounded-full flex items-center justify-center shadow-sm">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-powder-950 uppercase tracking-wider">Drag & drop your teeth photo here</p>
                            <p className="text-[10px] text-gray-400 font-sans">Supports PNG, JPG (Max 10MB)</p>
                          </div>
                          <label className="px-4 py-2 bg-white border border-powder-200 hover:border-powder-400 text-powder-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer">
                            Browse File
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleFileChange} 
                              className="hidden" 
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Demo Select */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block">Or run a demo check:</span>
                    <div className="space-y-3">
                      {demoSmiles.map((demo) => (
                        <button
                          key={demo.id}
                          onClick={() => {
                            setSelectedImage(demo.url);
                            setAnalysisResult(null);
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            selectedImage === demo.url
                              ? "border-powder-400 bg-powder-50/50 shadow-sm"
                              : "border-gray-100 bg-white hover:bg-powder-50/20"
                          }`}
                        >
                          <img 
                            src={demo.url} 
                            alt={demo.name} 
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100"
                          />
                          <div className="text-left space-y-0.5">
                            <h4 className="font-semibold text-xs text-powder-950">{demo.name}</h4>
                            <p className="text-[10px] text-gray-400 leading-none">{demo.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedImage && (
                    <div className="lg:col-span-12 flex justify-start pt-2">
                      <button
                        onClick={runSmileAnalysis}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 px-6 py-3.5 bg-powder-950 hover:bg-powder-800 text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Scanning Teeth and Shading...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Run AI Visual Screen</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Results card */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-powder-50 p-4 rounded-2xl border border-powder-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-powder-950 text-white font-black text-lg rounded-full flex items-center justify-center">
                        {analysisResult.cleanlinessScore}/10
                      </div>
                      <div className="text-left space-y-0.5">
                        <h4 className="font-bold text-sm text-powder-950">Visual Enamel Appearance Ratio</h4>
                        <p className="text-[10px] text-powder-600 font-mono font-semibold">Simulated Oral Diagnostic Observation</p>
                      </div>
                    </div>
                    <button
                      onClick={resetSmileAnalysis}
                      className="text-xs font-semibold text-powder-800 hover:text-powder-950 underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Scan Another Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-powder-100 p-5 rounded-2xl space-y-1 bg-white">
                      <span className="text-[9px] font-mono uppercase text-powder-700 font-bold block">Enamel Surface Tone</span>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{analysisResult.appearancePreview}</p>
                    </div>
                    <div className="border border-powder-100 p-5 rounded-2xl space-y-1 bg-white">
                      <span className="text-[9px] font-mono uppercase text-powder-700 font-bold block">Gum Line Margin</span>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{analysisResult.gumVisibility}</p>
                    </div>
                    <div className="border border-powder-100 p-5 rounded-2xl space-y-1 bg-white">
                      <span className="text-[9px] font-mono uppercase text-powder-700 font-bold block">Possible Extrinsic Stains</span>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{analysisResult.stainAwareness}</p>
                    </div>
                    <div className="border border-powder-100 p-5 rounded-2xl space-y-1 bg-white">
                      <span className="text-[9px] font-mono uppercase text-powder-700 font-bold block">Teeth Positioning Layout</span>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{analysisResult.alignmentObservation}</p>
                    </div>
                  </div>

                  <div className="bg-powder-50/50 border border-powder-100 p-5 rounded-2xl space-y-1">
                    <span className="text-xs text-powder-900 font-bold uppercase tracking-wider block font-mono">Specialist Care Guidance:</span>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{analysisResult.recommendation}</p>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 text-amber-900 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-relaxed text-amber-850">
                      <strong>Professional Medical Notice:</strong> {analysisResult.disclaimer}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      onClick={() => setActiveTab("appointment")}
                      className="px-6 py-3 rounded-xl bg-powder-950 text-white font-semibold text-xs tracking-wider uppercase hover:bg-powder-800 transition-all cursor-pointer shadow-sm"
                    >
                      Book Professional Exam
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: AI SYMPTOM GUIDANCE */}
          {activeTab === "symptoms" && (
            <motion.div
              key="symptoms-check"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-powder-600 block">Symptom Diagnostic Tool</span>
                <h3 className="font-display font-semibold text-xl text-powder-950 leading-tight">
                  Triage & Oral Health Assessment
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-2xl">
                  Select any symptoms or pain parameters you are feeling. Receive instant clinical priority guidelines and helpful warm saline rinses.
                </p>
              </div>

              {!symptomOutput ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SYMPTOMS.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom.id);
                      return (
                        <button
                          key={symptom.id}
                          onClick={() => toggleSymptom(symptom.id)}
                          className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-powder-400 bg-powder-50/50 text-powder-950"
                              : "border-gray-150 bg-white hover:bg-powder-50/10 text-gray-700"
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{symptom.name}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? "bg-powder-950 border-powder-950 text-white" 
                              : "border-gray-300 bg-white"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={evaluateSymptoms}
                      disabled={selectedSymptoms.length === 0}
                      className="flex items-center gap-1.5 px-6 py-3.5 bg-powder-950 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all disabled:opacity-40 cursor-pointer"
                    >
                      <span>Analyze Selected Symptoms</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-powder-50 p-4 rounded-2xl border border-powder-100">
                    <div className="text-left space-y-0.5">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-powder-600 font-bold block">Suggested Triage Level</span>
                      <h4 className="font-display font-semibold text-powder-950 text-sm flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          symptomOutput.urgency === "Immediate Emergency Care" ? "bg-red-500 animate-pulse" : "bg-amber-500"
                        }`} />
                        <span>{symptomOutput.urgency} Recommended</span>
                      </h4>
                    </div>
                    <button
                      onClick={resetSymptoms}
                      className="text-xs font-semibold text-powder-850 hover:text-powder-950 underline cursor-pointer"
                    >
                      Reset Symptom Selector
                    </button>
                  </div>

                  <div className="border border-powder-100 p-6 rounded-[2rem] bg-white text-left space-y-4 shadow-sm">
                    <h4 className="font-display font-semibold text-sm text-powder-950 border-b border-gray-100 pb-2.5">Self-Care and Diagnostic Guidelines</h4>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-4 whitespace-pre-line leading-relaxed font-sans">
                      {symptomOutput.guidance}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 text-amber-900 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-relaxed text-amber-850">
                      <strong>Important Notice:</strong> This symptom guidance module provides basic oral awareness only and should NOT be used as medical diagnosis. Please consult Dr. Kuldip Dhir, MDS at the clinic for professional diagnosis.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <a
                      href="tel:+917009488220"
                      className="w-full sm:w-auto text-center px-5 py-3 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider hover:bg-powder-50 cursor-pointer"
                    >
                      Call Reception Now
                    </a>
                    <button
                      onClick={() => setActiveTab("appointment")}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-powder-950 text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-powder-800 cursor-pointer"
                    >
                      Book Professional Visit
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: SMART SCHEDULER */}
          {activeTab === "appointment" && (
            <motion.div
              key="appointment-scheduler"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-powder-600 block">Seamless Scheduling</span>
                <h3 className="font-display font-semibold text-xl text-powder-950 leading-tight">
                  Request Your Custom Consultation
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-2xl">
                  Enter your credentials below. Your appointment will be recorded instantly on our in-memory server, and you can monitor approval status inside the Patient Portal.
                </p>
              </div>

              {!bookingResult ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-powder-600" />
                        <span>Patient Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-powder-600" />
                        <span>Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit number"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400"
                      />
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Clipboard className="w-3.5 h-3.5 text-powder-600" />
                        <span>Dental Treatment Service</span>
                      </label>
                      <select
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400 bg-white"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-powder-600" />
                        <span>Appointment Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400"
                      />
                    </div>

                    {/* Time slots */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-powder-600" />
                        <span>Preferred Time Slot</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {["09:30 AM", "10:30 AM", "11:30 AM", "01:30 PM", "03:00 PM", "05:00 PM"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, time: t })}
                            className={`py-2 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                              bookingForm.time === t
                                ? "bg-powder-950 border-powder-950 text-white shadow-sm"
                                : "bg-white border-powder-100 text-gray-600 hover:bg-powder-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-gray-400 text-left leading-normal font-sans">
                      * This serves as an official clinical scheduling request. Our team will verify slot availability and contact you via phone if any timing conflict arises.
                    </p>
                    <button
                      id="submit-booking-form-btn"
                      type="submit"
                      disabled={isBooking}
                      className="px-6 py-3.5 bg-powder-950 hover:bg-powder-800 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isBooking ? "Booking Request..." : "Request Appointment"}
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmation card */
                <div className="bg-powder-50/50 border border-powder-100 p-6 sm:p-8 rounded-[2rem] text-center space-y-6 max-w-lg mx-auto">
                  <div className="w-12 h-12 bg-powder-950 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-lg text-powder-950">Appointment Submitted Live</h4>
                    <p className="text-[10px] text-powder-600 font-mono font-bold">Record ID: {bookingResult.id}</p>
                  </div>

                  <div className="bg-white border border-powder-100 p-5 rounded-2xl text-left text-xs sm:text-sm space-y-2 max-w-sm mx-auto shadow-premium">
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-400">Patient:</span>
                      <strong className="text-gray-800">{bookingResult.name}</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-400">Treatment:</span>
                      <strong className="text-gray-800">{bookingResult.service}</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-400">Date/Time:</span>
                      <strong className="text-gray-800">{bookingResult.date} at {bookingResult.time}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded font-mono text-[10px]">{bookingResult.status}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans max-w-sm mx-auto">
                    To reschedule or cancel this visit, please contact the Kot Kapura clinical director desk directly at <strong>070094 88220</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={resetBooking}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-stone-50 text-xs font-semibold text-gray-600 cursor-pointer"
                    >
                      Request Another Visit
                    </button>
                    <button
                      onClick={() => onNavigate("patient-portal")}
                      className="px-6 py-2.5 rounded-xl bg-powder-950 text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-powder-800 cursor-pointer"
                    >
                      Go to Patient Portal
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: TREATMENT EXPLAINER */}
          {activeTab === "explainer" && (
            <motion.div
              key="treatment-explainer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-powder-600 block">Procedure Library</span>
                <h3 className="font-display font-semibold text-xl text-powder-950 leading-tight">
                  Understand Common Clinical Treatments
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-2xl">
                  Choose a dental treatment card on the left to review why saves are performed, and what happens at each stage of a root canal or scaling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Procedures list */}
                <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {SERVICES.slice(0, 6).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setExplainerService(s)}
                      className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        explainerService.id === s.id
                          ? "border-powder-400 bg-powder-50/50 text-powder-950 shadow-sm"
                          : "border-gray-100 bg-white hover:bg-powder-50/10 text-gray-600"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                {/* Explainer output */}
                <div className="md:col-span-7 bg-powder-50/40 border border-powder-100 p-6 rounded-[2rem] space-y-4 min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-powder-600 font-bold block">Patient Education</span>
                      <h4 className="font-display font-semibold text-base text-powder-950 leading-tight">{explainerService.name}</h4>
                    </div>

                    <div className="space-y-3 font-sans text-xs sm:text-sm">
                      <div>
                        <strong className="text-powder-950 block text-xs uppercase font-bold tracking-wide">What is it?</strong>
                        <p className="text-gray-600 leading-relaxed mt-0.5">{explainerService.details.meaning}</p>
                      </div>
                      <div>
                        <strong className="text-powder-950 block text-xs uppercase font-bold tracking-wide">When is it required?</strong>
                        <p className="text-gray-600 leading-relaxed mt-0.5">{explainerService.details.whenNeeded}</p>
                      </div>
                      <div>
                        <strong className="text-powder-950 block text-xs uppercase font-bold tracking-wide">Procedure steps</strong>
                        <p className="text-gray-600 leading-relaxed mt-0.5">{explainerService.details.procedure}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-powder-100/50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Dr. Dhir's Clinical Guides</span>
                    <button
                      onClick={() => setActiveTab("appointment")}
                      className="text-xs font-semibold text-powder-950 hover:text-powder-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Request Treatment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: PERSONALIZED ROUTINE */}
          {activeTab === "tips" && (
            <motion.div
              key="routine-tips"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-powder-600 block">Oral Hygiene Planner</span>
                <h3 className="font-display font-semibold text-xl text-powder-950 leading-tight">
                  Design Your Customized Hygiene Routine
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-2xl">
                  Adjust your parameters (age, concerns, brushing routine) to receive actionable clinical tips on flossing and brushing from our Resident Specialist.
                </p>
              </div>

              {!generatedTips ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Age Group */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider block">Age Group</label>
                      <select
                        value={tipsQuery.ageGroup}
                        onChange={(e) => setTipsQuery({ ...tipsQuery, ageGroup: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400 bg-white"
                      >
                        <option value="Kids (under 12)">Kids (under 12)</option>
                        <option value="Adults (18-60)">Adults (18-60)</option>
                        <option value="Seniors (60+)">Seniors (60+)</option>
                      </select>
                    </div>

                    {/* Primary Concern */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider block">Primary Concern</label>
                      <select
                        value={tipsQuery.concern}
                        onChange={(e) => setTipsQuery({ ...tipsQuery, concern: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400 bg-white"
                      >
                        <option value="Cavity Prevention">Cavity Prevention</option>
                        <option value="Gum bleeding">Gum Bleeding</option>
                        <option value="Sensitivity">Tooth Sensitivity</option>
                        <option value="Stains">Extrinsic Shading/Stains</option>
                      </select>
                    </div>

                    {/* Eating Habits */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider block">Eating Habits</label>
                      <select
                        value={tipsQuery.eatingHabit}
                        onChange={(e) => setTipsQuery({ ...tipsQuery, eatingHabit: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400 bg-white"
                      >
                        <option value="Normal balanced diet">Normal Balanced Diet</option>
                        <option value="frequent sugar/sweets">Frequent Sugar & Sweets</option>
                        <option value="High tea/coffee intake">High Tea / Coffee Intake</option>
                      </select>
                    </div>

                    {/* Current Brushing Routine */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-powder-900 uppercase tracking-wider block">Brushing Frequency</label>
                      <select
                        value={tipsQuery.brushingRoutine}
                        onChange={(e) => setTipsQuery({ ...tipsQuery, brushingRoutine: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-powder-100 text-xs sm:text-sm focus:outline-none focus:border-powder-400 bg-white"
                      >
                        <option value="Once a day">Once a day (morning)</option>
                        <option value="Twice a day">Twice a day (morning + night)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleGenerateTips}
                      className="px-6 py-3.5 bg-powder-950 hover:bg-powder-800 text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-sm cursor-pointer transition-all"
                    >
                      Generate Custom Planner
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h4 className="font-display font-semibold text-sm text-powder-950">Your Clinical Oral Care Guide</h4>
                    <button
                      onClick={() => setGeneratedTips(null)}
                      className="text-xs font-semibold text-powder-800 hover:text-powder-950 underline cursor-pointer"
                    >
                      Modify Parameters
                    </button>
                  </div>

                  <div className="space-y-4 text-left">
                    {generatedTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-powder-50/50 border border-powder-100/50 rounded-2xl">
                        <Check className="w-5 h-5 text-powder-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      onClick={() => window.print()}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Planner</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("appointment")}
                      className="px-6 py-3 rounded-xl bg-powder-950 text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer hover:bg-powder-800"
                    >
                      Book Free Examination
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};
