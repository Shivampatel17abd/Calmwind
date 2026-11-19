import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MentalHealthTracker from "./pages/track_helth";
import Notes from "./pages/notes";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHome from "./pages/DashboardHome";
import JournalPage from "./pages/JournalPage";
import SupportPage from "./pages/SupportPage";
import AccountPage from "./pages/AccountPage";
import { AuthProvider } from "./context/AuthContext";

function PublicLanding() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [hash]);

  return (
    <div className="min-h-screen calm-bg text-[#243b32] selection:bg-[#cadcbd] selection:text-[#1a2c25]">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing */}
          <Route path="/" element={<PublicLanding />} />

          {/* Public Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-account" element={<Signup />} />

          {/* Public tools from main (local-first, no account needed) */}
          <Route path="/track-health" element={<MentalHealthTracker />} />
          <Route path="/track_helth" element={<MentalHealthTracker />} />
          <Route path="/notes" element={<Notes />} />

          {/* Authenticated Desktop App with Left Sidebar */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="journal" element={<JournalPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="account" element={<AccountPage />} />
            </Route>
          </Route>

          {/* Convenient Aliases */}
          <Route path="/journal" element={<Navigate to="/app/journal" replace />} />
          <Route path="/dashboard" element={<Navigate to="/app" replace />} />
          <Route path="/help" element={<Navigate to="/app/support" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
