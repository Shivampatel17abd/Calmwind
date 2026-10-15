import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-blue-50 text-slate-800">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}