import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from "./components/layout/AppointmentModal";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { TreatmentsPage } from "./pages/TreatmentsPage";
import { TreatmentDetailPage } from "./pages/TreatmentDetailPage";
import { DentistPage } from "./pages/DentistPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ContactPage } from "./pages/ContactPage";
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
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<StubPage title="Page Not Found" />} />
          </Route>
        </Routes>
      </AppointmentProvider>
    </BrowserRouter>
  );
}
