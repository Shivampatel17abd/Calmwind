import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHome from "./pages/DashboardHome";
import JournalPage from "./pages/JournalPage";
import SupportPage from "./pages/SupportPage";
import AccountPage from "./pages/AccountPage";
import { AuthProvider } from "./context/AuthContext";

function PublicLanding() {
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
