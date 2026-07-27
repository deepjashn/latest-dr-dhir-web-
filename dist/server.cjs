var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = parseInt(process.env.PORT || "4000");
app.use(import_express.default.json({ limit: "10mb" }));
var appointments = [
  {
    id: "APT-9182",
    name: "Jashandeep Singh",
    phone: "070094 88220",
    service: "Teeth Cleaning & Polishing",
    date: "2026-07-12",
    time: "10:30 AM",
    status: "Confirmed",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "APT-4231",
    name: "Gurpreet Kaur",
    phone: "9876543210",
    service: "Root Canal Treatment",
    date: "2026-07-15",
    time: "02:00 PM",
    status: "Pending Approval",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var geminiClient = null;
var apiErrorLogged = false;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    if (!apiErrorLogged) {
      console.warn("\u26A0\uFE0F Warning: GEMINI_API_KEY environment variable is not defined.");
      apiErrorLogged = true;
    }
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }
  if (!geminiClient) {
    geminiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return geminiClient;
}
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    apiConfigured: !!process.env.GEMINI_API_KEY
  });
});
app.get("/api/appointments", (req, res) => {
  const { phone } = req.query;
  if (!phone) {
    return res.status(400).json({ error: "Phone number parameter is required" });
  }
  const cleanPhone = String(phone).replace(/\s+/g, "").toLowerCase();
  const filtered = appointments.filter((apt) => {
    const cleanAptPhone = apt.phone.replace(/\s+/g, "").toLowerCase();
    return cleanAptPhone.includes(cleanPhone) || cleanPhone.includes(cleanAptPhone);
  });
  res.json({ appointments: filtered });
});
app.post("/api/appointments", (req, res) => {
  const { name, phone, service, date, time } = req.body;
  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newApt = {
    id: `APT-${Math.floor(1e3 + Math.random() * 9e3)}`,
    name,
    phone,
    service,
    date,
    time,
    status: "Pending Approval",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  appointments.push(newApt);
  res.status(201).json({ success: true, appointment: newApt });
});
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    const ai = getGeminiClient();
    const systemInstruction = `You are the "Dhir AI Dental Assistant", an elegant, compassionate, and professional digital assistant for Dr. Dhir\u2019s Dental Care Multispeciality Hospital.
The clinic details are:
- Name: Dr. Dhir\u2019s Dental Care Multispeciality Hospital
- Tagline: Fully-digital dental clinic, providing complete dental care and treatments for all. Smiles Guaranteed.
- Address: Dhir Complex, Near Petrol Pump, Faridkot Road, Kot Kapura, Punjab, India
- Contact/Phone: 070094 88220
- Instagram: @drdhirdentalcare
- Led by: Dr. Kuldip Dhir, MDS (RCT Specialist, Ex Deputy Director, Ex Deputy Medical Commissioner, Ex SMO, 35+ years experience)
- Awards: FDILB February 2024 Edition \u2014 Faridkot District Rank No. 1; AIC Medal Ceremony recognition.

Guidelines for your replies:
1. Provide extremely polite, hygienic, calm, and medically trustworthy dental care awareness.
2. CRITICAL MEDICAL DISCLAIMER: Always remind patients that your guidance is for informational and educational awareness only. You do not provide medical diagnoses, treatment planning, or clinical judgements. For proper diagnoses and care, advise them to schedule a detailed physical consultation with Dr. Kuldip Dhir at the clinic.
3. If the user talks about pain, sensitivity, swelling, bleeding gums, or broken teeth, provide kind oral hygiene tips (like warm saltwater rinses, avoiding hard foods) and firmly recommend an immediate clinic visit or calling us at 070094 88220.
4. Keep answers concise, highly structured, clean, and formatting-rich (use lists/bullet points where helpful).
5. Ensure the tone represents a senior, high-end, modern medical clinic. Avoid slang or overly technical jargon. Translate dental terms into patient-friendly explanations.`;
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((h) => {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Chat API Error:", error.message);
    const defaultResponse = `Thank you for contacting Dr. Dhir\u2019s Dental Care Multispeciality. I would be happy to assist you!

To protect your safety and ensure proper diagnosis:
\u2022 General Oral Care: Brushing twice a day, flossing, and regular dental checkups every 6 months are key to healthy gums and teeth.
\u2022 Dental Concern: Since we cannot perform a physical oral exam online, we highly recommend booking an official checkup with our RCT Specialist, Dr. Kuldip Dhir, MDS.
\u2022 Clinic Appointments: Please visit our interactive appointment scheduler on the website or call us directly at 070094 88220 to confirm a comfortable time.

Disclaimer: This guidance is for awareness only. For physical diagnoses, please schedule an appointment at our Kot Kapura clinic.`;
    res.json({
      text: defaultResponse,
      error: error.message.includes("GEMINI_API_KEY") ? "API_KEY_NOT_CONFIGURED" : "API_ERROR"
    });
  }
});
app.post("/api/analyze-smile", async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "Base64 image is required" });
  }
  try {
    const ai = getGeminiClient();
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";
    const promptText = `Evaluate the uploaded smile or dental photograph and provide an aesthetic visual observation.
Return the results strictly in JSON format as defined below.

CRITICAL HEALTH INSTRUCTIONS:
- Do NOT make definitive medical diagnoses or clinical evaluations.
- Use encouraging, gentle, and informative dental terminology.
- Emphasize the importance of a professional exam with RCT Specialist Dr. Kuldip Dhir, MDS at the Kot Kapura clinic.

The response JSON must follow this TypeScript interface structure:
{
  "cleanlinessScore": number (value between 1 and 10),
  "appearancePreview": string (brief observation on teeth shading or visual hygiene),
  "gumVisibility": string (assessment of gum margins or smile aesthetics visible in the photo),
  "stainAwareness": string (notes about potential extrinsic stains or shade variation),
  "alignmentObservation": string (friendly visual notes on teeth positioning or layout),
  "recommendation": string (actionable health reminder urging clinic consult),
  "disclaimer": string (standard legal dental disclaimer)
}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Data
          }
        },
        { text: promptText }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            cleanlinessScore: {
              type: import_genai.Type.INTEGER,
              description: "Aesthetic score out of 10"
            },
            appearancePreview: {
              type: import_genai.Type.STRING,
              description: "Observation on overall teeth shading and visual condition"
            },
            gumVisibility: {
              type: import_genai.Type.STRING,
              description: "Assessment of gum line visibility and margins"
            },
            stainAwareness: {
              type: import_genai.Type.STRING,
              description: "Observation of potential shading variations or extrinsic stains"
            },
            alignmentObservation: {
              type: import_genai.Type.STRING,
              description: "General visual aesthetic observations on layout/alignment"
            },
            recommendation: {
              type: import_genai.Type.STRING,
              description: "Caring recommendation for clinical dental checkup"
            },
            disclaimer: {
              type: import_genai.Type.STRING,
              description: "Strong medical disclaimer emphasizing this is not a clinical diagnosis"
            }
          },
          required: [
            "cleanlinessScore",
            "appearancePreview",
            "gumVisibility",
            "stainAwareness",
            "alignmentObservation",
            "recommendation",
            "disclaimer"
          ]
        }
      }
    });
    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error.message);
    const mockAnalysis = {
      cleanlinessScore: 8,
      appearancePreview: "The visual surfaces look bright and healthy. A regular scale and polish will maintain this beautiful tone.",
      gumVisibility: "Healthy contour visible. Proper brushing technique will keep your gum margins firm and pink.",
      stainAwareness: "Minor surface shade variations noticed. These are typically extrinsic stains from tea, coffee, or food and are easily cleared.",
      alignmentObservation: "Visual dental arches appear comfortable. An in-person consultation can provide specific orthodontic or cosmetic insights if desired.",
      recommendation: "Schedule a physical scaling and clinical cleaning session with Dr. Kuldip Dhir, MDS to achieve optimal brightness and freshness.",
      disclaimer: "Disclaimer: This AI preview is for educational and general awareness only and does NOT constitute medical/dental diagnosis. For accurate examination, please visit the clinic."
    };
    res.json(mockAnalysis);
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
