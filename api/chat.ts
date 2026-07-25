import { GoogleGenAI } from "@google/genai";

// Vercel serverless function: POST /api/chat  → { text }
// Powers the floating "Dhir Dental Guide" assistant. Requires GEMINI_API_KEY
// as a server-side environment variable (never exposed to the client).

const SYSTEM_INSTRUCTION = `You are the "Dhir Dental Guide", a warm, calm and professional assistant for Dr. Dhir's Dental Care Multispeciality Hospital in Kotkapura, Punjab.

Clinic details:
- Name: Dr. Dhir's Dental Care Multispeciality Hospital
- Led by: Dr. Kuldip Dhir, MDS (Endodontics / Root Canal specialist)
- Address: Dhir Complex, Near Petrol Pump, Faridkot Road, Kotkapura, Punjab – 151 204
- Phone / WhatsApp: 070094 88220
- Hours: Mon–Sat 9:30 AM–2 PM & 4:30–7 PM; Sunday on appointment
- Services: root canal, dental implants, crowns & bridges, smile design, teeth whitening, dentures, gum care, pediatric dentistry, extractions, fillings, emergency care.

Rules:
1. Be concise, kind and easy to understand. Use short paragraphs or bullet points.
2. You provide general awareness and guidance ONLY. You never diagnose a condition, never prescribe or recommend specific medication, and never promise a specific result or exact cost.
3. For pain, swelling, bleeding, or injury, give gentle self-care tips (e.g. warm salt-water rinse, avoid very hot/cold/hard foods) and recommend booking or calling the clinic. For severe swelling, fever, uncontrolled bleeding, a knocked-out tooth, or difficulty breathing/swallowing, advise contacting the clinic or seeking urgent care immediately.
4. Encourage booking an appointment (via the website or WhatsApp/phone 070094 88220) when a clinical opinion is needed.
5. Always keep a reassuring, senior-clinic tone. Do not invent facts, ratings, or credentials beyond those above.`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const { message, history } = body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(200).json({
      text: "I'm unable to reach the assistant right now. Please call or WhatsApp the clinic on 070094 88220 and our team will help you straight away.",
      error: "API_KEY_NOT_CONFIGURED",
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-10).forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: String(h.text ?? "") }],
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
    });

    res.status(200).json({ text: response.text });
  } catch (error: any) {
    res.status(200).json({
      text: "Thank you for your message. I had a brief connection issue — for anything urgent please call the clinic on 070094 88220, or send us a message on WhatsApp and our team will assist you.",
      error: "API_ERROR",
    });
  }
}
