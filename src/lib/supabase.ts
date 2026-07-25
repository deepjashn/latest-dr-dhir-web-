// Lightweight Supabase integration via the REST API (no SDK dependency).
// Reads config from Vite env vars; when unset, calls no-op gracefully so the
// site keeps working (WhatsApp handoff still runs) until credentials are added.
//
// Set these in .env (local) and as Vercel env vars (production):
//   VITE_SUPABASE_URL       = https://xxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY  = eyJ...  (anon / public key — safe for the browser)

// The anon key is public by design (Supabase protects data via Row-Level
// Security), so it is safe in the browser bundle. Env vars override if set.
const DEFAULT_URL = "https://riydksoabzrsierpiluy.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeWRrc29hYnpyc2llcnBpbHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTYzMjYsImV4cCI6MjEwMDUzMjMyNn0.ZltOzdUR9W-CD9oQVpT1BniwXjfXt7mhji6NUykICvY";

const SUPABASE_URL = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) || DEFAULT_URL).replace(/\/$/, "");
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || DEFAULT_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

type Result = { ok: boolean; skipped?: boolean; status?: number; error?: string };

async function insertRow(table: string, row: object): Promise<Result> {
  if (!isSupabaseConfigured) return { ok: false, skipped: true };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    return { ok: res.ok, status: res.status, error: res.ok ? undefined : await res.text() };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "network error" };
  }
}

export interface AppointmentRow {
  patient_type: "new" | "existing";
  name: string;
  phone: string;
  concern?: string;
  preferred_date?: string;
  preferred_time?: string;
  source?: string;
}

export interface EnquiryRow {
  name: string;
  phone: string;
  message: string;
}

export const saveAppointment = (row: AppointmentRow) => insertRow("appointments", row);
export const saveEnquiry = (row: EnquiryRow) => insertRow("enquiries", row);

// Simple connectivity probe used by the health check / verification.
export async function checkSupabase(): Promise<Result> {
  if (!isSupabaseConfigured) return { ok: false, skipped: true };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: { apikey: SUPABASE_ANON_KEY as string },
    });
    return { ok: res.ok, status: res.status };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "network error" };
  }
}
