import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/signup";
import MentalHealthTracker from "./pages/track_helth";
import Notes from "./pages/notes";

function Home() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/track-health" element={<MentalHealthTracker />} />
        <Route path="/track_helth" element={<MentalHealthTracker />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}
