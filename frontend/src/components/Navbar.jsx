import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isTracker = pathname === "/track-health" || pathname === "/track_helth";
  const isNotes = pathname === "/notes";

  const linkBase =
    "px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap";
  const inactiveLink =
    "text-[#7b827a] hover:text-[#243b32] hover:bg-[#dce8d5]/50";
  const activeLink = "bg-[#dce8d5] text-[#243b32] font-semibold";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fffefa]/90 border-b border-[#e7e9df] transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3.5">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#243b32] no-underline"
        >
          <div
            className="grid h-8 w-8 place-items-center rounded-xl bg-[#dce8d5] text-lg text-[#355b44] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105"
            aria-hidden="true"
          >
            ✿
          </div>
          <span className="font-medium tracking-tight">CalmWind</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            className={`${linkBase} ${isHome ? activeLink : inactiveLink}`}
          >
            Home
          </Link>

          {isHome ? (
            <a href="#features" className={`${linkBase} ${inactiveLink}`}>
              Features
            </a>
          ) : (
            <Link to="/#features" className={`${linkBase} ${inactiveLink}`}>
              Features
            </Link>
          )}

          <Link
            to="/track-health"
            className={`${linkBase} ${isTracker ? activeLink : inactiveLink}`}
          >
            Health Tracker
          </Link>

          <Link
            to="/notes"
            className={`${linkBase} ${isNotes ? activeLink : inactiveLink}`}
          >
            Notepad
          </Link>

          <a href="#help" className={`${linkBase} ${inactiveLink}`}>
            Help
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#help"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#7a4c28] bg-[#fbf2e3] border border-[#f0debe] rounded-full hover:bg-[#f6e5c8] transition-all duration-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Need help?
          </a>

          <Link
            to="/login"
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#355b44] hover:text-[#1a2c25] hover:bg-[#dce8d5]/50 rounded-xl transition-all"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#355b44] hover:bg-[#294b37] rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Mobile navigation strip */}
      <div className="md:hidden border-t border-[#eceee7] px-3 py-2 flex items-center justify-center gap-1.5 text-xs font-medium overflow-x-auto">
        <Link
          to="/"
          className={`px-3 py-1 rounded-full ${isHome ? activeLink : inactiveLink}`}
        >
          Home
        </Link>
        <Link
          to="/track-health"
          className={`px-3 py-1 rounded-full ${isTracker ? activeLink : inactiveLink}`}
        >
          Health Tracker
        </Link>
        <Link
          to="/notes"
          className={`px-3 py-1 rounded-full ${isNotes ? activeLink : inactiveLink}`}
        >
          Notepad
        </Link>
        {isHome ? (
          <a href="#features" className={`px-3 py-1 rounded-full ${inactiveLink}`}>
            Features
          </a>
        ) : (
          <Link to="/#features" className={`px-3 py-1 rounded-full ${inactiveLink}`}>
            Features
          </Link>
        )}
      </div>
    </header>
  );
}
