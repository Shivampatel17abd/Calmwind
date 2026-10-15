export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b border-blue-100">
      <div className="text-xl font-bold text-blue-600">CalmWind</div>
      <div className="flex gap-4 sm:gap-6 text-sm font-medium text-slate-600">
        <a href="#home" className="hover:text-blue-600">Home</a>
        <a href="#features" className="hover:text-blue-600">Features</a>
        <a href="#help" className="hover:text-blue-600">Help</a>
      </div>
      <button className="px-3 sm:px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200">
        Need help?
      </button>
    </nav>
  )
}
