import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SproutLogo } from "./BotanicalDecor";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
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
            className="w-8 h-8 rounded-xl bg-[#e3ebd9] grid place-items-center transition-transform duration-200 group-hover:scale-105"
            aria-hidden="true"
          >
            <SproutLogo className="w-5 h-5" color="#355b44" />
          </div>
          <span className="font-serif font-medium tracking-tight">CalmWind</span>
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
          <Link
            to="/app/journal"
            className="px-3.5 py-1.5 rounded-full text-[#355b44] hover:bg-[#dce8d5]/50 transition-colors font-medium"
          >
            My Journal
          </Link>
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

          {isAuthenticated ? (
            <Link
              to="/app/account"
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#355b44] hover:text-[#1a2c25] hover:bg-[#dce8d5]/50 rounded-xl transition-all"
            >
              {user?.name?.split(" ")[0] || "Account"}
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#355b44] hover:text-[#1a2c25] hover:bg-[#dce8d5]/50 rounded-xl transition-all"
            >
              Login
            </Link>
          )}

          <Link
            to="/app"
            className="px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#355b44] hover:bg-[#294b37] rounded-xl shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5"
          >
            <span>{isAuthenticated ? "Back to Sanctuary" : "Open Sanctuary"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
