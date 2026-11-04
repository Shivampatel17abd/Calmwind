import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Login from "./login";
import CreateAccount from "./createacc";
import Movie_Music from "./Movie_music";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/movie-music" element={<Movie_Music />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
=======

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/signup";

function Home() {
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
      </Routes>
    </BrowserRouter>
  );
}
>>>>>>> 704d70a30c6a3b278b3c3bdd0c390974410d4c9d
