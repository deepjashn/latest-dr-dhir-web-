import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppointmentProvider } from "./components/layout/AppointmentModal";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { TreatmentsPage } from "./pages/TreatmentsPage";
import { TreatmentDetailPage } from "./pages/TreatmentDetailPage";
import { DentistPage } from "./pages/DentistPage";
import { ContactPage } from "./pages/ContactPage";
import { LegalPage } from "./pages/LegalPage";
import { StubPage } from "./pages/StubPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppointmentProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
            <Route path="/dentist" element={<DentistPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="/disclaimer" element={<LegalPage kind="disclaimer" />} />
            {/* Hidden until authentic content exists — redirect so no placeholder is crawlable */}
            <Route path="/gallery" element={<Navigate to="/" replace />} />
            <Route path="/reviews" element={<Navigate to="/" replace />} />
            <Route path="*" element={<StubPage title="Page Not Found" />} />
          </Route>
        </Routes>
      </AppointmentProvider>
    </BrowserRouter>
  );
}
